/**
 * Contains all board functionality and animation.
 */

// Board object parent for all other geometric objects.
var board = JXG.JSXGraph.initBoard('jxgbox', boardParams);

// Board control bar for navigating the boards plane.
let boardControl = document.getElementById("jxgbox_navigator");
boardControl.remove();


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

// Clears the board and deletes all its child objects.
function clear(){
    boardPoints.clear();
    boardEdges.clear();
    boardCircles.clear();
    JXG.JSXGraph.freeBoard(board);
    JXG.Options.text.display = 'internal';
    board = JXG.JSXGraph.initBoard("jxgbox", boardParams);
    boardControl = document.getElementById("jxgbox_navigator");
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
