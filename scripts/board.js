/**
 * Contains all board functionality and animation.
 */

// Board object parent for all other geometric objects.
var board = JXG.JSXGraph.initBoard('jxgbox', boardParams);

// Bounding box data for use in other functions.
var boundingBox = board.getBoundingBox();

// Board control bar for navigating the boards plane.
let boardControl = document.getElementById('jxgbox_navigator');


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

var drawInterval;

// Animates the board by drawing or removing objects.
function animate(direction) {

    if(direction) {
        drawInterval = setInterval(draw, 500);
    }
}

// Draws an object onto the board.
function draw() {   

    board.suspendUpdate();

    let animationObject = eventQueue.shift();

    if (animationObject == 'RemoveSplitBoxes') {

        var splitBoxes = [];
        var newRemoveQueue = [];

        for(var i = 0; i < removeQueue.length; i++) {
            
            if (removeQueue[i][0].text == 'split') {
                splitBoxes.push(removeQueue[i][1]);
            }
            else {
                newRemoveQueue.push(removeQueue[i]);
            }
        }

        while (splitBoxes.length > 0) {
            remove(splitBoxes.shift());
        }

        removeQueue = newRemoveQueue;
    }

    else if (animationObject == 'RemoveNonWellSeparated'){
        
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

    else if (animationObject == 'ClearTemps') {
        while(removeQueue.length > 0) {
            remove(removeQueue.shift()[1]);
        }
    }
    
    else {

        undoQueue.push(animationObject);

        let boardObject = board.create(animationObject.type, animationObject.data, animationObject.style);

        if (animationObject.isTemporary) {
            removeQueue.push([animationObject, boardObject]);
        }

        board.unsuspendUpdate();

    }

    if (eventQueue.length <= 0) {
        clearInterval(drawInterval);
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
}

// Places all generated or entered points on the board, no animation instant plotting.
function plot(){

    if (!editPointsSelection.value)
        return;

    clear();

    parseTextPoints();

    board.suspendUpdate()

    for(let i = 0; i < pointSet.length; i++){

        var boardPoint = board.create('point', pointSet[i], pointSetStyle);

        boardPoints.set(i.toString(), boardPoint);
    }

    board.unsuspendUpdate()
}