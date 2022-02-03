/**
 * Contains all board functionality and animation.
 * 
 * David Wisnosky
 */

// Board object parent for all other geometric objects.
var board = JXG.JSXGraph.initBoard('jxgbox', boardParams);

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

// Board object global containers.
var boardPoints = new Map();
var boardEdges = new Map();
var boardCircles = new Map();

// Event queue for animation.
var eventQueue = [];
var undoQueue = [];
var removeQueue = [];

// General object for animation objects, contains data for JSXGraph board objects and their status.
class AnimationObject{

    constructor(type, data, style, text, isTemporary){
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
function animate(direction, speed) {

    // Compute animation speed, based on user selection.
    let animationSpeed = 500 / parseFloat(speed);

    // Disables animation if selected, all steps will occur instantaneously.
    if (!animationSelection.checked)
        animationSpeed = 0

    if(direction) {
        drawInterval = setInterval(draw, animationSpeed);
    }
}

// Draws an object onto the board.
function draw() {   

    if (eventQueue.length == 0) {
        clearInterval(drawInterval);
        return;
    }

    board.suspendUpdate();

    let animationObject = eventQueue.shift();

    if (animationObject == 'RemoveNonWellSeparated'){
        
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

    else if (animationObject == 'ClearWSPD'){
        
        var wspdRemoveQueue = [];

        for (var i = 0; i < undoQueue.length; i++) {

            if (undoQueue[i][0].text == 'wellSeparatedCheck') {
                wspdRemoveQueue.push(undoQueue[i]);
            }
        }

        while(wspdRemoveQueue.length > 0) {
            remove(wspdRemoveQueue.shift()[1]);
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
        while(removeQueue.length > 0) {
            remove(removeQueue.shift()[1]);
        }
    }
    
    else {

        let boardObject = board.create(animationObject.type, animationObject.data, animationObject.style);

        undoQueue.push([animationObject, boardObject]);

        if (animationObject.isTemporary) {
            removeQueue.push([animationObject, boardObject]);
        }

        board.unsuspendUpdate();

    }
}

// Removes an object from the board.
function remove(boardObject) {

    board.removeObject(boardObject);
}

// Checks board boundingbox is valid.
function boundsCheck() {

    let bounds = board.getBoundingBox();
    
    if(isFinite(bounds[0]) && isFinite(bounds[1]) && isFinite(bounds[2]) && isFinite(bounds[3]))
        return;
    else
        board.setBoundingBox(boundingboxStandard, true);
}

// Clears the board and deletes all its child objects.
function clear(){
    boardPoints.clear();
    boardEdges.clear();
    boardCircles.clear();
    JXG.JSXGraph.freeBoard(board);
    JXG.Options.text.display = 'internal';
    board = JXG.JSXGraph.initBoard('jxgbox', boardParams);
    boardControl = document.getElementById('jxgbox_navigator');
    board.on('down', pointClick);
}

// Places all generated or entered points on the board, no animation instant plotting.
function plot(){

    // If the board edit is locked return.
    if (!editPointsSelection.value)
        return;

    reset(); // Set board to start state (blank).

    parseTextPoints(); // Creates the point set from points in the text box.

    // Adds a label if selected.
    pointSetStyle.withLabel = pointIDSelection.checked;

    board.suspendUpdate()

    // Plot point set points on the board.
    for(let i = 0; i < pointSet.length; i++){

        pointSetStyle.name = i.toString();

        var boardPoint = board.create('point', pointSet[i], pointSetStyle);

        boardPoints.set(i.toString(), boardPoint);
    }

    board.unsuspendUpdate()
}

// Changes the visibility of the point IDs to match the user's selection.
function changePointIDStatus() {

    plot();
}

// Adds a point to the point set upon left click on board, or removes a point on right click on board.
function pointClick(e) {

    // if the board is locked, return
    if (!editPointsSelection.checked)
        return;

    if (pointSet.length + 1 > 100)
        alert('100 points maximum.');

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