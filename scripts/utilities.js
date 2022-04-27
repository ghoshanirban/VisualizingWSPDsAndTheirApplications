/**
 * Miscellaneous functions.
 * 
 * David Wisnosky
 */

/* Global constants */

const EPSILON = 0.00001;

/*Point functions. */

// Locks the point generation features.
function lockPoints() {

    if (!editPointsSelection.checked) {
        generatePointsButton.setAttribute('disabled', '');
        pointTextBox.setAttribute('readonly', '');
    }
    else {
        generatePointsButton.removeAttribute('disabled');
        pointTextBox.removeAttribute('readonly');
    }
}

// Generates a random point with in an x and y bound.
function generateRandomPoint(xBound, yBound) {

    var xSign = Math.floor(Math.random() * 2);
    var ySign = Math.floor(Math.random() * 2);

    xSign = (xSign == 0) ? 1 : -1;
    ySign = (ySign == 0) ? 1 : -1;

    return [xSign * Math.random() * xBound, ySign * Math.random() * yBound];
}

// Creates a point set of size n and stores it in the pointSet global.
function generateRandomPointSet() {

    // Check if point set editing is on.
    if (!editPointsSelection.checked)
        return;

    // Get number of points to create.
    let n = parseInt(numPointsEntry.value);

    // Restricted to 100 points.
    if (pointSet.length + n > 100) {
        n = 100 - pointSet.length;
        alert('100 points maximum, points will be truncated.');
    }

    boundsCheck(); // Check the bounds are valid before generation.
    let bounds = board.getBoundingBox();
    // Takes the absolute max of the x and y axis on the board minus some buffer.
    let xBound = Math.max(Math.abs(bounds[0]), Math.abs(bounds[2])) - 1;
    let yBound = Math.max(Math.abs(bounds[1]), Math.abs(bounds[3])) - 1;

    var newPointSet = [];

    for (let i = 0; i < n; i++) {

        newPointSet.push(generateRandomPoint(xBound, yBound));
    }

    // Add new points to current point set.
    updatePointTextBox(newPointSet);

    plot();
}

// Scales a point set to conform to a grid with min x,y -10 and max x,y 10.
function scalePointSet(S, maxCoord) {

    // Don't scale for 1 point.
    if (S.length < 3) {
        return S
    }

    let scaledPoints = [...S]; // Copy for edits.

    // To get the highest individual coordinate.
    var absMax = 0;

    // Find the highest individual coordinate.
    for (p of scaledPoints) {
        let absX = Math.abs(p[0]);
        let absY = Math.abs(p[1]);
        if (absX > absMax)
            absMax = absX;
        if (absY > absMax) {
            absMax = absY;
        }
    }

    // Find the scale factor from maxCoord allowed.
    let scaleFactor = absMax / maxCoord;

    // Scale all points.
    for (let i = 0; i < scaledPoints.length; i++) {
        scaledPoints[i][0] /= scaleFactor;
        scaledPoints[i][1] /= scaleFactor;
    }

    return scaledPoints;
}

/* Text box functions point set creation */

// Adds generated points to the point text box for use to see.
function updatePointTextBox(newPoints) {

    var newPointsText = '';

    for (var point of newPoints) {
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
    for (let i = 0; i < text.length; i++) {
        var element = parseFloat(text[i]);

        if (isFinite(element))
            textPoints.push(element);
    }

    // Add the parsed points to the pointset and assign IDs to each.
    for (let i = 0; i < textPoints.length; i += 2) {
        var xCord = Math.round(textPoints[i] * 100) / 100;
        var yCord = Math.round(textPoints[i + 1] * 100) / 100;

        var point = [xCord, yCord];

        // Checks to see if a point is a duplicate.
        var isNew = true;

        // Checks all points to see if current considered point is a duplicate.
        for (var p of pointSet) {

            if (p[0] == point[0] && p[1] == point[1]) {
                alert('Point (' + point +
                    ') already exists, the duplicate has been deleted.');
                isNew = false;
                break;
            }
        }

        // Adds the point if it is not a duplicate.
        if (isNew)
            pointSet.push(point);
    }

    // Takes only the first 100 points.
    pointSet = pointSet.slice(0, 100);

    // Scales the point set to a -10 to 10 range.
    pointSet = scalePointSet(pointSet, Math.abs(board.getBoundingBox()[0]) - 1);

    var pointID = 0; // Used to map point IDs.
    for (var point of pointSet) {
        pointSetMap.set(point, pointID++);
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
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
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

    if (anchorPoint == 0) {
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
        straightFirst: false,
        straightLast: false
    });

    // Compute all 4 intersection points of the centerline and the 2 circles.
    var i1 = board.create('intersection', [circle1, centerLine, 0], { color: '#FFFFFF' });
    var j1 = board.create('intersection', [circle2, centerLine, 0], { color: '#FFFFFF' });
    var i2 = board.create('intersection', [circle1, centerLine, 1], { color: '#FFFFFF' });
    var j2 = board.create('intersection', [circle2, centerLine, 1], { color: '#FFFFFF' });

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
function distanceBetweenBoundingBoxes(R1, R2, distance = true) {

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
    else {
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

    // The left box is entirely below the right.
    if (leftBB.vertices[1][1] <= rightBB.vertices[3][1]) {
        var possibleConnectionLine = [leftBB.vertices[1], [leftBB.vertices[1][0], leftBB.vertices[0][1] +
            (rightBB.vertices[3][1] - leftBB.vertices[1][1])]]; // Directly below.
        shortestDistanceLine = rightBB.containsPoint(possibleConnectionLine[1]) ?
            possibleConnectionLine : [leftBB.vertices[1], rightBB.vertices[3]]; // Slightly offset.
    }
    // The left box is entirely above the right.
    else if (leftBB.vertices[2][1] >= rightBB.vertices[0][1]) {
        var possibleConnectionLine = [rightBB.vertices[0], [rightBB.vertices[0][0], rightBB.vertices[0][1] +
            (leftBB.vertices[2][1] - rightBB.vertices[0][1])]]; // Directly below.
        shortestDistanceLine = leftBB.containsPoint(possibleConnectionLine[1]) ?
            possibleConnectionLine : [leftBB.vertices[2], rightBB.vertices[0]]; // Slightly offset.
    }
    // Left bounding box upper right is between the right's left side.
    else if (leftBB.vertices[1][1] <= rightBB.vertices[0][1] && leftBB.vertices[1][1] >= rightBB.vertices[3][1]) {

        var connectionPoint = [leftBB.vertices[1][0] + (rightBB.vertices[0][0] - leftBB.vertices[0][0]),
        leftBB.vertices[1][1]];
        shortestDistanceLine = [leftBB.vertices[1], connectionPoint];
    }
    // Left bounding box lower right is between the right's left side.
    else if (leftBB.vertices[2][1] <= rightBB.vertices[0][1] && leftBB.vertices[2][1] >= rightBB.vertices[3][1]) {
        var connectionPoint = [leftBB.vertices[2][0] + (rightBB.vertices[0][0] - leftBB.vertices[0][0]),
        leftBB.vertices[2][1]];
        shortestDistanceLine = [leftBB.vertices[2], connectionPoint];
    }
    // Right bounding box is in-between the y max and min of the left.
    else {
        shortestDistanceLine = [[rightBB.vertices[0][0] - (rightBB.vertices[0][0] - leftBB.vertices[0][0]),
        rightBB.vertices[0][1]], rightBB.vertices[0]];
    }

    // Return the distance.
    if (distance)
        return (distance2D(shortestDistanceLine[0], shortestDistanceLine[1]));

    return shortestDistanceLine; // Return the shortest line.
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

    return (factorial(n) / (factorial(k) * factorial(n - k)));
}

// Equation for separation factor given a value for t.
function tToSeparationFactor(t) {
    return 4 * ((t + 1) / (t - 1));
}

//Equation for t given a value for separation factor.
function separationFactorToT(s) {
    return (s + 4) / (s - 4);
}

// finding WSPD pair with at least one set is singleton
function getSingletonWSPD() {
    let wspdSingleton = [];
    for (let i = 0; i < wspd.pairs.length; i++) {
        let wspdPair = wspd.pairs[i];
        if (wspdPair[0].S.length == 1 || wspdPair[1].S.length == 1) {
            wspdSingleton.push(wspdPair);
        }
    }
    return wspdSingleton;
}

// Download function.
//Screen shot button to capture board image, saves the board as an SVG tree.
function downloadBoardImage(type) {

    //Converts to SVG tag.
    var svg = board.renderer.svgRoot;

    // Prepares SVG as a string for export to file as an image.
    var xml = new XMLSerializer().serializeToString(svg);
    var svg64 = btoa(xml);
    var b64start = 'data:image/svg+xml;base64,';
    var img = b64start + svg64;

    // Creates populates a HTML tag to be the downloaded file.
    var imgT = document.getElementById('screenShot');
    imgT.setAttribute('src', img);
    imgT.setAttribute('width', svg.getAttribute('width'));
    imgT.setAttribute('height', svg.getAttribute('height'));

    //Saves svg tag to an svg file for viewing.
    let mySVG = svg;  // Inline SVG element.
    let tgtImage = document.getElementById('screenShot'); // Draws the SVG to the image tag.
    let can = document.createElement('canvas'); // Creates a canvas to draw the SVG to for PNG format. 
    let ctx = can.getContext('2d'); // 2D canvas.

    // Create a image with same dimensions as the canvas.
    let loader = new Image();
    loader.width = can.width = tgtImage.width;
    loader.height = can.height = tgtImage.height;

    // Draws the image to the canvas on load, for PNG download.
    loader.onload = function () {
        ctx.drawImage(loader, 0, 0, loader.width, loader.height);
        tgtImage.src = can.toDataURL();
    };

    // Encodes SVG for download.
    var svgAsXML = (new XMLSerializer).serializeToString(mySVG);
    loader.src = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);

    // Pass the XML encoding for SVG format download.
    if (type == "SVG") {
        setTimeout(function () { downloadScreenShot("img", xml, "SVG") }, 1000);
    }
    // Pass the PNG image string for PNG download.
    else if (type == "PNG") {
        setTimeout(function () { downloadScreenShot("img", tgtImage.src, "PNG") }, 1000);
    }
}

//Creates a hidden link tag for automatic download upon screen shot.
function downloadScreenShot(filename, text, type) {

    // Hidden download link tag.
    var element = document.createElement('a');

    // Set tag for SVG encoding.
    if (type == "SVG") {
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    }
    // Set tag for SVG encoding.
    else if (type == "PNG") {
        element.setAttribute('href', text);
    }
    else {
        return;
    }

    // Prepare element to download the file.
    element.setAttribute('download', filename + "." + type);

    // Hide the element.
    element.style.display = 'none';
    document.body.appendChild(element);

    // Download the image file.
    element.click();

    // Remove the tag.
    document.body.removeChild(element);
}

// Control utility functions.

// Resets entry boxes on reset button click.
function resetTextBoxes() {
    separationFactorEntry.value = '';
    tEntry.value = '';
    kPairsEntry.value = '';
    sKPairsEntry.value = '';
    sANNEntry.value = '';
    mstTEntry.value = '';
}

// Disables all controls during animation.
function disableAllControls() {
    isAnimating = true;
    editPointsSelection.setAttribute('disabled', '');
    //pointIDSelection.setAttribute('disabled', '');
    generatePointsButton.setAttribute('disabled', '');
    preGenPointSetsSelection.setAttribute('disabled', '');
    pointTextBox.setAttribute('readonly', '');
    plotPointsButton.setAttribute('disabled', '');
    animationSelection.setAttribute('disabled', '');
    animationSpeedSelection.setAttribute('disabled', '');
    wspdAnimationSelection.setAttribute('disabled', '');
    wspdButton.setAttribute('disabled', '');
    separationFactorEntry.setAttribute('disabled', '');
    tSpannerButton.setAttribute('disabled', '');
    tEntry.setAttribute('disabled', '');
    closestPairButton.setAttribute('disabled', '');
    kClosestPairsButton.setAttribute('disabled', '');
    kPairsEntry.setAttribute('disabled', '');
    sKPairsEntry.setAttribute('disabled', '');
    allNearestNeighborsButton.setAttribute('disabled', '');
    sANNEntry.setAttribute('disabled', '');
    mstButton.setAttribute('disabled', '');
    mstTEntry.setAttribute('disabled', '');
    boardDownloadButtonPNG.setAttribute('disabled', '');
    boardDownloadButtonSVG.setAttribute('disabled', '');
    resetButton.setAttribute('disabled', '');
}

// Enables all controls after animation.
function enableAllControls() {
    isAnimating = false;
    editPointsSelection.removeAttribute('disabled');
    //pointIDSelection.removeAttribute('disabled');
    generatePointsButton.removeAttribute('disabled');
    preGenPointSetsSelection.removeAttribute('disabled');
    pointTextBox.removeAttribute('readonly');
    plotPointsButton.removeAttribute('disabled');
    animationSelection.removeAttribute('disabled');
    wspdAnimationSelection.removeAttribute('disabled');
    animationSpeedSelection.removeAttribute('disabled');
    wspdButton.removeAttribute('disabled');
    separationFactorEntry.removeAttribute('disabled');
    tSpannerButton.removeAttribute('disabled');
    tEntry.removeAttribute('disabled');
    closestPairButton.removeAttribute('disabled');
    kClosestPairsButton.removeAttribute('disabled');
    kPairsEntry.removeAttribute('disabled');
    sKPairsEntry.removeAttribute('disabled');
    allNearestNeighborsButton.removeAttribute('disabled');
    sANNEntry.removeAttribute('disabled');
    mstButton.removeAttribute('disabled');
    mstTEntry.removeAttribute('disabled');
    boardDownloadButtonPNG.removeAttribute('disabled');
    boardDownloadButtonSVG.removeAttribute('disabled');
    resetButton.removeAttribute('disabled');
}
