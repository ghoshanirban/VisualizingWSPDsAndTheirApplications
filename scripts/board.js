/**
 * Contains all board functionality and animation.
 * 
 * David Wisnosky
 */

// Board object parent for all other geometric objects.
var board = JXG.JSXGraph.initBoard('jxgbox', boardParams);
board.create('grid', []); // Add the grid.

// Bounding box data for use in other functions.
var boundingBox = board.getBoundingBox();

// Board control bar for navigating the boards plane.
let boardControl = document.getElementById('jxgbox_navigator');

board.on('down', pointClick); // Event listener for a click on the board.

// Helper function to get mouse coordinates on a board click.
function getMouseCoords(e, i) {
    let position = board.getCoordsTopLeftCorner(e, i);
    let absolutePosition = JXG.getPosition(e, i);
    let dx = absolutePosition[0] - position[0];
    let dy = absolutePosition[1] - position[1];
    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
}

// Stores board points for ID visual.
var boardPoints = new Map();

// Set to true when animating.
var isAnimating = false;

// Event queue for animation.
var eventQueue = [];
var undoQueue = [];
var removeQueue = [];
var wspdStaticRemoveQueue = []; // Uses to remove the non animated WSPD when needed.

// General object for animation objects, contains data for JSXGraph board objects and their status.
class AnimationObject {

    constructor(type, data, style, text, isTemporary) {
        this.type = type;
        this.data = data;
        this.style = style;
        this.text = text;
        this.isTemporary = isTemporary;
    }
}

// Event loop for animation steps.
var drawInterval;

// Animates the board by drawing or removing objects.
function animate(direction, speed, algorithm) {

    // Compute animation speed, based on user selection.    
    let animationSpeed = 750 / parseFloat(speed);

    // Disables animation if selected, all steps will occur instantaneously.
    if (!animationSelection.checked) {

        drawFinalOutput(algorithm);

        eventQueue = [];
    }

    else if (!wspdAnimationSelection.checked && algorithm == 'WSPD') {

        drawFinalOutput(algorithm);

        eventQueue = [];
    }

    else if (pointSet.length > 100) {
        alert('Animation is disabled for point sets larger than 100.');
        return;
    }

    else if (direction) {
        disableAllControls();
        drawInterval = setInterval(draw, animationSpeed);
    }
}

// Checks for special animation operation actions.
function specialAnimationOPCheck(animationObject) {

    if (animationObject == 'WSPD')
        displaySteps('WSPD');
    else if (animationObject == 'tSpanner')
        displaySteps('tSpanner');
    else if (animationObject == 'closestPair')
        displaySteps('closestPair');
    else if (animationObject == 'kClosestPairs')
        displaySteps('kClosestPairs');
    else if (animationObject == 'ANN')
        displaySteps('ANN');
    else if (animationObject == 'tApproxMST')
        displaySteps('tApproxMST');
    
    else if (animationObject == 'pointPartitionStart') {

        animationObject = eventQueue.shift();

        if (traceStepsSelection.checked)
            displaySteps(animationObject.text);

        while (animationObject != 'pointPartitionEnd') {

            let boardObject = board.create(animationObject.type, animationObject.data, animationObject.style);

            undoQueue.push([animationObject, boardObject]);

            if (animationObject.isTemporary) {
                removeQueue.push([animationObject, boardObject]);
            }

            animationObject = eventQueue.shift();
        }
    }

    else if (animationObject == 'RemoveNonWellSeparated') {

        var notWellSeparated = [];
        var newRemoveQueue = [];

        for (var i = 0; i < removeQueue.length; i++) {

            if (removeQueue[i][0].text == 'wellSeparatedCheck') {
                notWellSeparated.push(removeQueue[i][1]);
            }
            else {
                newRemoveQueue.push(removeQueue[i]);
            }
        }

        while (notWellSeparated.length > 0) {
            remove(notWellSeparated.shift());
        }

        removeQueue = newRemoveQueue;
    }

    else if (animationObject == 'ClearWSPD') {

        if (!wspdAnimationSelection.checked) {
            removeStaticWSPD();
            return true;
        }

        var wspdRemoveQueue = [];

        for (var i = 0; i < undoQueue.length; i++) {

            if (undoQueue[i][0].text == 'wellSeparatedCheck') {
                wspdRemoveQueue.push(undoQueue[i]);
            }
        }

        while (wspdRemoveQueue.length > 0) {
            remove(wspdRemoveQueue.shift()[1]);
        }
    }

    else if (animationObject == 'RemovePreviousWSPDHighlight') {

        var wspdHighlightRemoveQueue = [];

        for (var i = 0; i < undoQueue.length; i++) {

            if (undoQueue[i][0].text == 'wellSeparatedHighlight') {
                wspdHighlightRemoveQueue.push(undoQueue[i]);
            }
        }

        while (wspdHighlightRemoveQueue.length > 0) {
            remove(wspdHighlightRemoveQueue.shift()[1]);
        }
    }

    else if (animationObject == 'ClearOldClosest') {

        var oldClosestRemoveQueue = [];

        for (var i = 0; i < undoQueue.length; i++) {

            if (undoQueue[i][0].text == 'currentPossibleClosestPair') {
                oldClosestRemoveQueue.push(undoQueue[i]);
            }
        }

        while (oldClosestRemoveQueue.length > 0) {
            remove(oldClosestRemoveQueue.shift()[1]);
        }
    }

    else if (animationObject == 'ClearKClosestSelectedWSPD') {

        var kClosestWSPDRemoveQueue = [];

        for (var i = 0; i < undoQueue.length; i++) {

            if (undoQueue[i][0].text == 'kClosestWSPDPairSelection2') {
                kClosestWSPDRemoveQueue.push(undoQueue[i]);
            }
        }

        while (kClosestWSPDRemoveQueue.length > 0) {
            remove(kClosestWSPDRemoveQueue.shift()[1]);
        }
    }

    else if (animationObject == 'ClearTemps') {
        while (removeQueue.length > 0) {
            remove(removeQueue.shift()[1]);
        }
    }

    else if (animationObject == 'ClearANN') {

        var ANNRemoveQueue = [];

        for (var i = 0; i < undoQueue.length; i++) {

            if (undoQueue[i][0].text == 'ANNConstructionSteps') {
                ANNRemoveQueue.push(undoQueue[i]);
            }
        }

        while (ANNRemoveQueue.length > 0) {
            remove(ANNRemoveQueue.shift()[1]);
        }
    }

    else
        return false;

    return true;
}

// Draws an object onto the board.
function draw() {

    try {

        if (eventQueue.length > 0) {

            board.suspendUpdate();

            let animationObject = eventQueue.shift();

            if (specialAnimationOPCheck(animationObject)) {
                board.unsuspendUpdate();
                return;
            }

            else if (traceStepsSelection.checked && typeof animationObject == 'string') {
                displaySteps(animationObject);
            }

            else {

                if (traceStepsSelection.checked)
                    displaySteps(animationObject.text);

                let boardObject = board.create(animationObject.type, animationObject.data, animationObject.style);

                undoQueue.push([animationObject, boardObject]);

                if (animationObject.isTemporary) {
                    removeQueue.push([animationObject, boardObject]);
                }
            }

            board.unsuspendUpdate();
        }

        // Exit the draw, set board zoom, and set static state.
        else {
            clearInterval(drawInterval);
            displaySteps(algorithm);
            enableAllControls();
            return;
        }
    } catch (error) {
        return;
    }
}

// Removes an object from the board.
function remove(boardObject) {

    board.removeObject(boardObject);
}

// Immediately draws a final product to the board.
function drawFinalOutput(algorithm) {

    board.suspendUpdate()

    if (algorithm == 'WSPD') {

        for (var pair of wspd.pairs) {

            C1 = new Circle(pair[0].R.getCenter(), distance2D(pair[0].R.getCenter(), pair[0].R.vertices[0]));
            C2 = new Circle(pair[1].R.getCenter(), distance2D(pair[1].R.getCenter(), pair[1].R.vertices[0]));

            // Set the color of the animation objects.
            wspdCircleStyle.color = getColor();
            var style1 = {};
            Object.assign(style1, wspdCircleStyle);

            wspdConnectionLineStyle.color = wspdCircleStyle.color;
            var style2 = {};
            Object.assign(style2, wspdConnectionLineStyle);

            wspdStaticRemoveQueue.push(board.create('circle', [C1.center, pair[0].R.vertices[0]], style1));
            wspdStaticRemoveQueue.push(board.create('circle', [C2.center, pair[1].R.vertices[0]], style1));
            wspdStaticRemoveQueue.push(board.create('line', calculateCircleConnectionLine(C1, C2), style2));
        }
    }

    else if (algorithm == 'tSpanner') {

        for (var edge of graphEdges) {
            board.create('line', edge, tSpannerLineStyle);
        }
    }

    else if (algorithm == 'closestPair') {

        for (var edge of graphEdges) {
            board.create('line', edge, tSpannerLineStyle);
        }

        board.create('point', closestPair[0], closestPairStyle);
        board.create('point', closestPair[1], closestPairStyle);
        board.create('line', [closestPair[0], closestPair[1]], closestPairLineStyle);
    }

    else if (algorithm == 'kClosestPairs') {

        drawFinalOutput('WSPD');

        for (pair of kClosestPairs) {

            board.create('point', pair[0], kClosestPairStyle);
            board.create('point', pair[1], kClosestPairStyle);
            board.create('line', pair, kClosestPairLineStyle);
        }
    }

    else if (algorithm == 'ANN') {

        drawFinalOutput('WSPD');

        for (var i = 0; i < ANNList.length; i += 2) {

            let point = pointSet[ANNList[i]];
            let nearestNeighbor = pointSet[ANNList[i + 1]];

            board.create('point', point, pointSetStyleANNFinal);
            board.create('point', nearestNeighbor, pointSetStyleANNFinal);
            board.create('arrow', [point, nearestNeighbor], ANNSeparationLineStyle);
        }
    }

    else if (algorithm == 'tApproxMST') {

        drawFinalOutput('tSpanner');

        var finishedPoints = new Set();

        for (edge of tApproxMST) {

            let p1 = edge[0];
            let p2 = edge[1];

            if (!finishedPoints.has(p1)) {
                finishedPoints.add(p1);
                board.create('point', p1, tApproxMSTSelectedPointStyle);
            }

            if (!finishedPoints.has(p2)) {
                finishedPoints.add(p2);
                board.create('point', p2, tApproxMSTSelectedPointStyle);
            }

            board.create('line', [p1, p2], tApproxMSTSelectedLineStyle);

        }
    }

    board.unsuspendUpdate()
}

// Removes the WSPD for the non-WSPD animations.
function removeStaticWSPD() {

    for (var item of wspdStaticRemoveQueue) {
        remove(item);
    }
}

// Checks board boundingbox is valid.
function boundsCheck() {

    let bounds = board.getBoundingBox();

    if (isFinite(bounds[0]) && isFinite(bounds[1]) && isFinite(bounds[2]) && isFinite(bounds[3]))
        return;
    else
        board.setBoundingBox(boundingboxStandard, true);
}

// Clears the board and deletes all its child objects.
function clear() {
    clearInterval(drawInterval);
    enableAllControls();
    boardPoints = new Map();
    eventQueue = [];
    undoQueue = [];
    removeQueue = [];
    wspdStaticRemoveQueue = [];
    JXG.JSXGraph.freeBoard(board);
    JXG.Options.text.display = 'internal';
    board = JXG.JSXGraph.initBoard('jxgbox', boardParams);
    boardControl = document.getElementById('jxgbox_navigator');
    board.on('down', pointClick);
    board.create('grid', []);
}

// Places all generated or entered points on the board, no animation instant plotting.
function plot() {

    // If the board edit is locked return.
    if (!editPointsSelection.value)
        return;

    reset(); // Set board to start state (blank).

    parseTextPoints(); // Creates the point set from points in the text box.

    board.suspendUpdate();

    // Plot point set points on the board.
    for (let i = 0; i < pointSet.length; i++) {

        if (pointIDSelection.checked)
            pointSetStyle.name = pointSetMap.get(pointSet[i]).toString();

        var boardPoint = board.create('point', pointSet[i], pointSetStyle);

        boardPoints.set(boardPoint, pointSetMap.get(pointSet[i]).toString());
    }

    board.unsuspendUpdate();
}

// Changes the visibility of the point IDs to match the user's selection.
function changePointIDStatus() {

    board.suspendUpdate();

    for (var boardPoint of boardPoints.keys()) {

        if (pointIDSelection.checked)
            boardPoint.name = boardPoints.get(boardPoint).toString(); // Show point ID.
        else
            boardPoint.name = ""; // Clear point ID.
    }

    board.unsuspendUpdate();
}

// Adds a point to the point set upon left click on board, or removes a point on right click on board.
function pointClick(e) {

    // if the board is locked, return
    if (!editPointsSelection.checked || isAnimating)
        return;

    if (pointSet.length + 1 > 100) {
        alert('100 points maximum.');
        return;
    }

    // Prevents a point from being located on the control bar.
    if (e.composedPath().includes(boardControl))
        return;

    var i = e.which;
    let coordinates = getMouseCoords(e, i);

    for (var el in board.objects) {
        // Check the point already exists
        if (JXG.isPoint(board.objects[el]) &&
            board.objects[el].hasPoint(coordinates.scrCoords[1], coordinates.scrCoords[2])) {
            switch (i) {
                case 1: // Left click = do nothing, point already exists.
                    return;
                case 3: // Right click = remove existing point.

                    // Copy all points but the one clicked.
                    var newPointSet = [];
                    var selectedPoint = [
                        board.objects[el].coords.usrCoords[1],
                        board.objects[el].coords.usrCoords[2]];

                    for (var j = 0; j < pointSet.length; j++) {

                        if (Math.abs(selectedPoint[0] - pointSet[j][0]) > EPSILON
                            || Math.abs(selectedPoint[1] - pointSet[j][1]) > EPSILON) {

                            newPointSet.push(pointSet[j]);
                        }
                    }

                    // New point set without removed point.
                    pointSet = []
                    pointSet = pointSet.concat(newPointSet);

                    // Reset text box without removed point.
                    pointTextBox.value = '';
                    updatePointTextBox(pointSet);

                    plot();
                    return;
            }
        }
    }

    // Left click and point does not exits, add it.
    if (i == 1) {
        pointSet = pointSet.concat([[coordinates.usrCoords[1], coordinates.usrCoords[2]]]);

        // Update the text box with the new point.
        pointTextBox.value = '';
        updatePointTextBox(pointSet);

        plot();
    }
}