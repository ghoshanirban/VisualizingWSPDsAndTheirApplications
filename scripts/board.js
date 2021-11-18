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
var eventUndoQueue = [];

// General object for JSXGraph board objects, used for animation ease.
class BoardObject{

    constructor(type, data, style){
        this.type = type;
        this.data = data;
        this.style = style;
    }
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

    clear();

    parseTextPoints();

    board.suspendUpdate()

    for(let i = 0; i < pointSet.length; i++){

        var boardPoint = board.create('point', pointSet[i], pointSetStyle);

        boardPoints.set(i.toString(), boardPoint);
    }

    board.unsuspendUpdate()
}

// Full animation function shows all construction/computation steps.
function animate(direction, steps=Infinity){

    var counter = 0;

    if(direction){
        for(el of eventQueue){
            setTimeout(draw(el), 1000);
            eventUndoQueue.unshift(el);
            counter++;

            if(counter == steps)
                break;
        }
    }
    else{
        for (el of eventUndoQueue) {
            setTimeout(unDraw(el), 1000);
            eventQueue.unshift(el);

        counter++;

        if (counter == steps)
            break;
        }
    }
}

// Animation to draw a single object on the board.
function draw(bObject) {
    
    board.create(bObject.type, bObject.data, bObject.style);

}

// Animation to remove a single object on the board.
function unDraw(bObject) {
    
    board.removeObject(bObject);
}