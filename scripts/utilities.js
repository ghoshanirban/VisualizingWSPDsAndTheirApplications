/**
 * Miscellaneous functions.
 * 
 * David Wisnosky
 */

/* Global constants */

const EPSILON = 0.00001;

/*Point generation functions. */

// Generates a random point with in an x and y bound.
function generateRandomPoint(xBound, yBound){

    var xSign = Math.floor(Math.random() * 2);
    var ySign = Math.floor(Math.random() * 2);

    xSign = (xSign == 0) ? 1 : -1;
    ySign = (ySign == 0) ? 1 : -1;

    return[xSign * Math.random() * xBound, ySign * Math.random() * yBound];
}

// Creates a point set of size n and stores it in the pointSet global.
function generateRandomPointSet() {

    // Check if point set editing is on.
    if (!editPointsSelection.checked)
        return;
    
    // Get number of points to create.
    let n = parseInt(numPointsEntry.value);

    // Restricted to 100 points.
    if (pointSet.length + n > 100){
        n = 100 - pointSet.length;
        alert('100 points maximum, points will be truncated.');
    }

    boundsCheck(); // Check the bounds are valid before generation.
    let bounds = board.getBoundingBox();
    // Takes the absolute max of the x and y axis on the board minus some buffer.
    let xBound = Math.max(Math.abs(bounds[0]), Math.abs(bounds[2])) - 0.5; 
    let yBound = Math.max(Math.abs(bounds[1]), Math.abs(bounds[3])) - 0.5;

    var newPointSet = [];

    for (let i = 0; i < n; i++) {
        
        newPointSet.push(generateRandomPoint(xBound, yBound));
    }

    // Add new points to current point set.
    updatePointTextBox(newPointSet);
} 

/* Text box functions point set creation */

// Adds generated points to the point text box for use to see.
function updatePointTextBox(newPoints) {

    var newPointsText = '';
    
    for(var point of newPoints){
        newPointsText += point[0].toFixed(2).toString() + ' ' + 
        point[1].toFixed(2).toString() + '\n';
    }
    
    pointTextBox.value = pointTextBox.value + newPointsText;
}

// Parses points entered in the text box so they can be plotted if valid.
function parseTextPoints() {

    pointSet = [];

    let textBoxInput = pointTextBox.value;
    var text = textBoxInput.split(/\s|\t|\n/);
    
    // Remove whitespace.
    var textPoints = [];
    for(let i = 0; i < text.length; i++) {
        var element = parseFloat(text[i]);

        if(isFinite(element)) 
            textPoints.push(element);
    }

    for (let i = 0; i < textPoints.length; i+=2) {
        var xCord = Math.round(textPoints[i] * 100) / 100;
        var yCord = Math.round(textPoints[i + 1] * 100) / 100;

        var point = [xCord, yCord]
        pointSet.push(point);
        pointSetMap.set(i, point);
    }

    // Clean up text box, of bad points and whitespace.
    pointTextBox.value = '';
    updatePointTextBox(pointSet);

}

/* Geometric helper functions */

// Computes the euclidean 2D distance.
function distance2D(p1, p2) {
    return JXG.Math.Geometry.distance(p1, p2, 2);
}

// Computes the midpoint on a line.
function midpoint(p1, p2) {
    return [(p1[0] + p2[0]) /2, (p1[1] + p2[1]) /2];
}

// Compute the bounding box of a point set.
function computeBoundingBox(S) {
    
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < S.length; i++) {
        
        minX = Math.min(minX, S[i][0]);
        maxX = Math.max(maxX, S[i][0]);
        minY = Math.min(minY, S[i][1]);
        maxY = Math.max(maxY, S[i][1]);
        
    }

    return new Rectangle([[minX, maxY], [maxX, maxY], [maxX, minY], [minX, minY]]);
}

// Splits a given bounding box into two by its longest side.
function splitBoundingBox(R) {

    // Find the first point clockwise of the longest side.
    let anchorPoint = (R.longestSide()[0] == 'l') ? 0 : 1;

    // Calculates the points that split the two longest sides clockwise.
    let splitPoint1 = midpoint(R.vertices[anchorPoint], R.vertices[anchorPoint + 1]);
    let splitPoint2 = midpoint(R.vertices[anchorPoint + 2], R.vertices[(anchorPoint + 3) % 4]);

    if(anchorPoint == 0) {
        return [new Rectangle([R.vertices[0], splitPoint1, splitPoint2, R.vertices[3]]),
                new Rectangle([splitPoint1, R.vertices[1], R.vertices[2], splitPoint2]),
                [splitPoint1, splitPoint2]];
    }
    else {
        // Return the two rectangles and the line that splits them.
        return [new Rectangle([R.vertices[0], R.vertices[1], splitPoint1, splitPoint2]),
                new Rectangle([splitPoint2, splitPoint1, R.vertices[2], R.vertices[3]]),
                [splitPoint1, splitPoint2]];
    }
}

// Finds the shortest distance between bounding boxes.
function distanceBetweenBoundingBoxes(R1, R2) {

    let R1Radius = distance2D(R1.vertices[0], R1.getCenter());
    let R2Radius = distance2D(R2.vertices[0], R2.getCenter());
    let centerDistance = distance2D(R1.getCenter(), R2.getCenter());

    return (centerDistance - R1Radius - R2Radius);

}

// Computes the shortest line between circles. Uses the JSXBoard objects for geometric computations.
// Note all objects are invisible on the board.
function calculateCircleConnectionLine(C1Center, C1Point, C2Center, C2Point) {

    board.suspendUpdate();

    // Create the circles.
    var circle1 = board.create('circle', [C1Center, C1Point], {
        color: '#FFFFFF',
    });

    var circle2 = board.create('circle', [C2Center, C2Point], {
        color: '#FFFFFF',
    });

    // Compute line from center of circle 1 to center of circle 2.
    var centerLine = board.create('line', [C1Center, C2Center], {
        color: '#FFFFFF', 
        straightFirst:false, 
        straightLast:false
    });

    // Compute all 4 intersection points of the centerline and the 2 circles.
    var i1 = board.create('intersection', [circle1, centerLine, 0], {color: '#FFFFFF',});
    var j1 = board.create('intersection', [circle2, centerLine, 0], {color: '#FFFFFF',});
    var i2 = board.create('intersection', [circle1, centerLine, 1], {color: '#FFFFFF',});
    var j2 = board.create('intersection', [circle2, centerLine, 1], {color: '#FFFFFF',});

    // Calculate and compute the closest two intersection points to draw the proper connection line.
    var i = distance2D([i1.X(), i1.Y()], [j1.X(), j1.Y()]) < distance2D([i2.X(), i2.Y()], [j1.X(), j1.Y()]) ? i1 : i2;
    var j = distance2D([i.X(), i.Y()], [j1.X(), j1.Y()]) < distance2D([i.X(), i.Y()], [j2.X(), j2.Y()]) ? j1 : j2;

    let connectionLine = [[i.X(), i.Y()], [j.X(), j.Y()]];

    // Remove all temporary objects used for computation.
    board.removeObject(circle1);
    board.removeObject(circle2);
    board.removeObject(centerLine);
    board.removeObject(i1);
    board.removeObject(j1);
    board.removeObject(i2);
    board.removeObject(j2);
    board.removeObject(i);
    board.removeObject(j);

    board.unsuspendUpdate();

    return connectionLine;
}

// Computes the shortest line between rectangles. Uses the JSXBoard objects for geometric computations.
// Note all objects are invisible on the board.
function calculateRectangleConnectionLine(R1, R2) {
    
    board.suspendUpdate();

    // Create the rectangles.
    var rectangle1 = board.create('polygon', R1.vertices, {
        color: '#FF0000',
    });

    var rectangle2 = board.create('polygon', R2.vertices, {
        color: '#FF0000',
    });

    // Compute line from center of rectangle 1 to center of rectangle 2.
    var centerLine = board.create('line', [R1.getCenter(), R2.getCenter()], {
        color: '#FF0000',
        straightFirst: false,
        straightLast: false
    });

    // Compute all 4 intersection points of the centerline and the 2 rectangles.
    var i1 = board.create('intersection', [rectangle1.borders[1], centerLine, 0], { color: '#00FF00', size: 10});
    var j1 = board.create('intersection', [rectangle2.borders[0], centerLine, 0], { color: '#00FF00', size: 10 });
    var i2 = board.create('intersection', [rectangle1.borders[1], centerLine, 1], { color: '#00FF00', size: 10});
    var j2 = board.create('intersection', [rectangle2.borders[0], centerLine, 1], { color: '#00FF00', size: 10 });

    // Calculate and compute the closest two intersection points to draw the proper connection line.
    var i = distance2D([i1.X(), i1.Y()], [j1.X(), j1.Y()]) < distance2D([i2.X(), i2.Y()], [j1.X(), j1.Y()]) ? i1 : i2;
    var j = distance2D([i.X(), i.Y()], [j1.X(), j1.Y()]) < distance2D([i.X(), i.Y()], [j2.X(), j2.Y()]) ? j1 : j2;

    let connectionLine = [[i.X(), i.Y()], [j.X(), j.Y()]];

    board.unsuspendUpdate();

    // Remove all temporary objects used for computation.
    board.removeObject(rectangle1);
    board.removeObject(rectangle2);
    board.removeObject(centerLine);
    board.removeObject(i1);
    board.removeObject(j1);
    board.removeObject(i2);
    board.removeObject(j2);
    board.removeObject(i);
    board.removeObject(j);

    board.unsuspendUpdate();

    return connectionLine;
}

// Creates a complete graph from a point set.
function generateCompleteGraph(S) {

    var G = new Set();

    for (let i = 0; i < S.length; i++) {
        u = S[i];
        for (let j = i + 1; j < S.length; j++) {
            v = S[j];
            G.add([u,v]);
        }
    }

    return G;
}

// Prim's MST algorithm.
function prim(G, n) {

    // Convert the set to an array for sorting by edge weight.
    let GPrime = Array.from(G);

    // Sort the graph by edge weight.
    GPrime.sort(function (a, b) { return distance2D(a[0], a[1]) - distance2D(b[0], b[1]) });
    
    // Select the first vertex in the sorted set to be the arbitrary start.
    let r = GPrime[0][0];

    // Prims algorithm iterations.
    var A = new Set();
    A.add(r);
    T = new Set();
    let index = 0;

    // While all vertices have not been connected, find the shortest edge such that a new vertex is added to A.
    while (A.size != n) {
        
        let v = GPrime[index][0];
        let w = GPrime[index][1];
        if (A.has(v) && !A.has(w)) {
            A.add(w); // Add the vertex.
            T.add(GPrime[index]); // Add the edge to the MST.
            GPrime.splice(index, 1); // Remove the edge, from the sorted set.
            index = 0;
        }
        else if(A.has(w) && !A.has(v)) {
            A.add(v); // Add the vertex.
            T.add(GPrime[index]); // Add the edge to the MST.
            GPrime.splice(index, 1); // Remove the edge, from the sorted set.
            index = 0;
        }
        else {
            index++; // Minimum edge is not yet valid check the next edge.
        }
    }

    return T;
}

/*// FloydWarshall algorithm.
function floydWarshall(S, G) {
    
    var dis = [];

    for (let i = 0; i < G.size; i++) {
       dis.push([]);
       for (let j = 0; j < G.size; j++) {

            if(i == j)
                dis[i].push(0);
            else if(G.get())
       } 
    }

}*/

// Iterate over all edges in a graph and compute their total weight.
function computeGraphWeight(G) {
    
    var weight = 0;

    for (var edge of G) { 
        weight += distance2D(edge[0], edge[1]);
    }

    return weight;
}

/* Math helper functions. */

// Iterative factorial.
function factorial(n) {

    var nFactorial = 1;

    for (var i = 1; i <= n; i++) {
        nFactorial = nFactorial * i;
    }

    return nFactorial;
}

// Combination formula.
function combination(n, k) {

    return (factorial(n) / (factorial(k) * factorial(n-k)));
}

// Equation for separation factor given a value for t.
function tToSeparationFactor(t) {
    return 4 * ((t+1) / (t-1));
}

//Equation for t given a value for separation factor.
function separationFactorToT(s) {
    return (s+4)/(s-4);
}

// maping all points into unique number
function mappingPointSet(pointSet)
{
    let pointSetMap = new Map();
    let indx = 0;
   for( let i=0; i<pointSet.length; i++ )
   {
      if( !pointSetMap.has(pointSet[i]) )
      {
          pointSetMap.set(pointSet[i],indx++);
      }
   }
   return pointSetMap;
}

// finding WSPD pair with at least one set is singleton
function getSingletonWSPD(wspd)
{
    let wspdSingleton = [];
    for( let i=0; i<wspd.pairs.length; i++ )
    {
        let wspdPair = wspd.pairs[i];
        if( wspdPair[0].S.length == 1 || wspdPair[1].S.length == 1 )
        {
           wspdSingleton.push(wspdPair);  
        }
    }
    //console.log("wspdSingleTon");
    //console.log(wspdSingleton);
    return wspdSingleton;
}