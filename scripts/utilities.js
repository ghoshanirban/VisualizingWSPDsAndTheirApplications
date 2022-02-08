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

    var pointID = 0; // Used to map point IDs.

    // Add the parsed points to the pointset and assign IDs to each.
    for (let i = 0; i < textPoints.length; i+=2) {
        var xCord = Math.round(textPoints[i] * 100) / 100;
        var yCord = Math.round(textPoints[i + 1] * 100) / 100;

        var point = [xCord, yCord];

        // Checks to see if a point is a duplicate.
        var isNew = true;

        // Checks all points to see if current considered point is a duplicate.
        for (var p of pointSet) {
            
            if (p[0] == point[0] && p[1] == point[1]){
                alert('Point (' + point + 
                    ') already exists, the duplicate has been deleted.');
                isNew = false;
                break;
            }
        }

        // Adds the point if it is not a duplicate.
        if (isNew) {
            pointSet.push(point);
            pointSetMap.set(point, pointID++);
        }
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
    var i1 = board.create('intersection', [circle1, centerLine, 0], {color: '#FFFFFF'});
    var j1 = board.create('intersection', [circle2, centerLine, 0], {color: '#FFFFFF'});
    var i2 = board.create('intersection', [circle1, centerLine, 1], {color: '#FFFFFF'});
    var j2 = board.create('intersection', [circle2, centerLine, 1], {color: '#FFFFFF'});

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

// Finds the shortest distance between bounding boxes.
function distanceBetweenBoundingBoxes(R1, R2) {

    var shortestDistanceLine;
    var leftBB; // Bounding box that is oriented to the left of the other.
    var rightBB; // Bounding box that is oriented to the right of the other.
    var boundingBoxMap = new Map();

    // Get the orientation of the two boxes with respect to each other.

    // R1 is on the left of R2.
    if (R1.vertices[0][0] <= R2.vertices[0][0]) {
        leftBB = R1;
        rightBB = R2;
    }

    // R1 is on the right of R2.
    else if (R1.vertices[0][0] > R2.vertices[0][0]) {
        leftBB = R2;
        rightBB = R1;
    }

    /*// R1 and R2 are 
    else {
        shortestDistanceLine = distance2D(R1.vertices[3], R2.vertices[0]) <=
                                 distance2D(R1.vertices[0], R2.vertices[3]) ? 
                                [R1.vertices[3], R2.vertices[0]] : R1.vertices[0], R2.vertices[3];
        return (distance2D(shortestDistanceLine[0], shortestDistanceLine[1]));
    }*/

    if (leftBB.vertices[1][1] <= rightBB.vertices[3][1]){
        var possibleConnectionLine = [leftBB.vertices[1],[leftBB.vertices[1][0], leftBB.vertices[0][1] + 
                                    (rightBB.vertices[3][1] - leftBB.vertices[1][1])]];
        shortestDistanceLine = rightBB.containsPoint(possibleConnectionLine[1]) ? 
                                possibleConnectionLine : [leftBB.vertices[1], rightBB.vertices[3]];
    }
    else if (leftBB.vertices[2][1] >= rightBB.vertices[0][1]) {
        var possibleConnectionLine = [rightBB.vertices[0], [rightBB.vertices[0][0], rightBB.vertices[0][1] +
                                     (leftBB.vertices[2][1] - rightBB.vertices[0][1])]];
        shortestDistanceLine = leftBB.containsPoint(possibleConnectionLine[1]) ?
                                 possibleConnectionLine : [leftBB.vertices[2], rightBB.vertices[0]];
    }
    else if (leftBB.vertices[1][1] <= rightBB.vertices[0][1] && leftBB.vertices[1][1] >= rightBB.vertices[3][1]) {

        var connectionPoint = [leftBB.vertices[1][0] + (rightBB.vertices[0][0] - leftBB.vertices[0][0]),
                                 leftBB.vertices[1][1]];
        shortestDistanceLine = [leftBB.vertices[1], connectionPoint];
    }
    else if (leftBB.vertices[2][1] <= rightBB.vertices[0][1] && leftBB.vertices[2][1] >= rightBB.vertices[3][1]) {
        var connectionPoint = [leftBB.vertices[2][0] + (rightBB.vertices[0][0] - leftBB.vertices[0][0]),
                                leftBB.vertices[2][1]];
        shortestDistanceLine = [leftBB.vertices[2], connectionPoint];
    }
    else {
        shortestDistanceLine = [[rightBB.vertices[0][0] - (rightBB.vertices[0][0] - leftBB.vertices[0][0]),
        rightBB.vertices[0][1]], rightBB.vertices[0]];
    }

    return (distance2D(shortestDistanceLine[0], shortestDistanceLine[1]));

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





// Unused functions.

/*// Computes the shortest line between rectangles. Uses the JSXBoard objects for geometric computations.
// Note all objects are invisible on the board.
function calculateRectangleConnectionLine(R1, R2) {

    board.suspendUpdate();

    var tempObjects = []; // Used to remove objects used for calculation.

    var geometricObject1;
    var geometricObject2;

    // Checks if a rectangle is made from a set of point or a single point. 
    if (R1.vertices[0][0] == R1.vertices[2][0] && R1.vertices[0][1] == R1.vertices[2][1])
         // If single point create a circle object for intersecting.
        geometricObject1 = board.create('circle', [R1.getCenter(), R1.vertices[0]], {color: 'FF0000'});
    else // Create a rectangle for intersecting.
        geometricObject1 = board.create('polygon', R1.vertices, {color: '#FF0000'});
    
    if (R2.vertices[0][0] == R2.vertices[2][0] && R2.vertices[0][1] == R2.vertices[2][1])
        // If single point create a circle object for intersecting.
        geometricObject2 = board.create('circle', [R2.getCenter(), R2.vertices[0]], { color: 'FF0000'});
    else // Create a rectangle for intersecting.
        geometricObject2 = board.create('polygon', R2.vertices, { color: '#FF0000'});

    // Compute line from center of object 1 to center of object 2.
    var centerLine = board.create('line', [R1.getCenter(), R2.getCenter()], {
        color: '#FF0000',
        straightFirst: false,
        straightLast: false
    });

    // Add for removal.
    tempObjects.push(geometricObject1);
    tempObjects.push(geometricObject2);
    tempObjects.push(centerLine);

    // Compute all possible rectangle intersections for R1.
    var R1BorderIntersections = [];

    // Compute the intersection point. For a single point it will be the point itself.
    if (geometricObject1.elType == 'circle'){
        var p = board.create('intersection', [geometricObject1, centerLine, 0], { color: '#00FF00', size:10 });
        R1BorderIntersections.push(p);
        tempObjects.push(p); // Add for removal.
    }
    // Compute all possible intersections for each 4 sides.
    else {
        // Check both possible intersection calculations.
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < geometricObject1.borders.length; j++) {

                var p = board.create('intersection', [geometricObject1.borders[j], centerLine, i], { color: '#00FF00', size: 10 });
                pCoords = [p.X().toFixed(2), p.Y().toFixed(2)];

                if (p.isReal && R1.containsPoint(pCoords))
                    R1BorderIntersections.push(p); 

                tempObjects.push(p); // Add for removal.
            }
        }
    }

    // Compute all possible rectangle intersections for R2.
    var R2BorderIntersections = [];

    // Compute the intersection point. For a  single point it will be the point itself.
    if (geometricObject2.elType == 'circle') {
        var p = board.create('intersection', [geometricObject2, centerLine, 0], { color: '#00FF00', size: 10 });
        R2BorderIntersections.push(p);
        tempObjects.push(p); // Add for removal.
    }

    // Compute all possible intersections for each 4 sides.
    else {
        // Check both possible intersection calculations.
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < geometricObject2.borders.length; j++) {

                var p = board.create('intersection', [geometricObject2.borders[j], centerLine, i], { color: '#00FF00', size: 10 });
                pCoords = [p.X().toFixed(2), p.Y().toFixed(2)];

                if (p.isReal && R2.containsPoint(pCoords))
                    R2BorderIntersections.push(p);
                
                tempObjects.push(p); // Add for removal.
            }
        }
    }

    // Calculate and compute the closest two intersection points to draw the proper connection line.
    var i;
    var j;
    var min = Infinity;

    for (var R1Point of R1BorderIntersections) {
        for (var R2Point of R2BorderIntersections) {

            var p1 = [R1Point.X(), R1Point.Y()];
            var p2 = [R2Point.X(), R2Point.Y()];

            var dist = distance2D(p1,p2)

            if (dist < min){
                min = dist;
                i = p1;
                j = p2;
            }
        }
    }

    let connectionLine = [i,j];

    board.unsuspendUpdate();

    // Remove all temporary objects used for computation.
    for (var o  of tempObjects) {
        board.removeObject(o);
    }

    board.unsuspendUpdate();

    return connectionLine;
} */