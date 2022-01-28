/**
 * Contains all global variables for the WSPD and its application algorithms,
 * along with all controls and output generation.
 * 
 * David Wisnosky
 */


// Globals
var pointSet = []; // List of points.
var pointSetMap = new Map(); // Maps point index to the points (x,y) value.
var splitTree = null; // Object defined in SplitTree.js
var wspd = null; // Object defined in WSPD.js
var graph = new Set(); // Edge set.
var closestPair = []; // Pair of points in R^2.
var tApproxMST = new Set(); // Edge set.
var kClosestPairs = [] // List of size k of closest pairs.

// Data fields.
let dataField = document.getElementById('dataField');

// Controls

// Board controls.
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', reset);

//Animation controls.
let animationSpeedSelection = document.getElementById('animationSpeed');

/*let animationSlider = document.getElementById('animationSlider');
animationSlider.min = 0;
animationSlider.value = 0;

let rewindButton = document.getElementById('rewind');
let playbackButton = document.getElementById('playback');
let forwardButton = document.getElementById('forward');*/

//var plot;

// Resets the entire state, all containers and the entire board.
function reset() {
    pointSet = [];
    splitTree = null;
    wspd = null;
    graph.clear();
    closestPair = [];
    tApproxMST.clear();
    kClosestPairs = [];
    clear();
}

// Pointset, controls.
let editPointsSelection = document.getElementById('editPoints');
let numPointsEntry = document.getElementById('numPoints');
let pointTextBox = document.getElementById('points');
let generatePointsButton = document.getElementById('generatePoints');
generatePointsButton.addEventListener('click', generateRandomPointSet);
let plotPointsButton = document.getElementById('plotPoints');
plotPointsButton.addEventListener('click', plot);
let clearPointTextBoxButton = document.getElementById('clearPoints');
clearPointTextBoxButton.addEventListener('click', clearTextBox);

// Clears the point text box.
function clearTextBox() {

    if(editPointsSelection.checked)
        pointTextBox.value = '';

}

// WSPD controls.
let wspdComplexitySelection = document.getElementById('wspdComplexity');
let separationFactorEntry = document.getElementById('separationFactor');
let wspdButton = document.getElementById('WSPD');
wspdButton.addEventListener('click', generateWSPD);
function generateWSPD(s=2, tSpanner=false) {

    // Check that s is valid.
    if (!isFinite(separationFactorEntry.value)){
        alert('Please select a value for the separation factor of the WSPD.');
        return;
    }

    // If the WSPD is not created for a t-spanner get the input value for separation factor.
    if(!tSpanner) {
        s = parseFloat(separationFactorEntry.value);
    }

    // Reset the objects on the board and re-plot the points to prepare for WSPD construction.
    reset(); 
    plot();

    if(wspdComplexitySelection.value == 'n2')
        splitTree = new SplitTree(pointSet, computeBoundingBox(pointSet));
    else if (wspdComplexitySelection.value == 'nlogn')
        splitTree = new SplitTree(pointSet, computeBoundingBox(pointSet));

    wspd = new WSPD(splitTree, s);
    animate(1, animationSpeedSelection.value);
}

// Algorithm controls.
let tEntry = document.getElementById('t');
let tSpannerButton = document.getElementById('tSpanner');
tSpannerButton.addEventListener('click', generateTSpanner);
function generateTSpanner() {

    // Check that t is valid
    if (!isFinite(tEntry.value) || tEntry.value <= 1) {
        alert('Please select a value for t > 1.');
        return;
    }

    // Reset the objects on the board and re-plot the points to prepare for t-Spanner construction.
    reset();
    plot();

    // Generates the WSPD with separation factor based on t.
    generateWSPD(tToSeparationFactor(parseFloat(tEntry.value)), true);

    graph = constructTSpanner(parseFloat(tEntry.value));
    animate(1, animationSpeedSelection.value);
}

let closestPairButton = document.getElementById('closestPair');
closestPairButton.addEventListener('click', findClosestPair);
function findClosestPair() {
    if(graph.size == 0){
        graph = generateTSpanner();
    }

    closestPair = computeClosestPair();
    animate(1, animationSpeedSelection.value);

}

let mstButton = document.getElementById('MST');
mstButton.addEventListener('click', generateApproxMST);
function generateApproxMST() {
    if (graph.size == 0) {
        graph = constructTSpanner();
    }

    tApproxMST = computeTApproxMST();
    animate(1, animationSpeedSelection.value);

    dataField.innerHTML = computeGraphWeight(tApproxMST) + " " +
        computeGraphWeight(prim(generateCompleteGraph(pointSet), pointSet.length));
}

let kPairsEntry = document.getElementById('kPairs');
let kClosestPairsButton = document.getElementById('kClosestPairs');
kClosestPairsButton.addEventListener('click', generateKClosestPairs);
let kEntry = document.getElementById('kPairs');
function generateKClosestPairs(params) {
    if(wspd == null){
        alert('Please construct a WSPD.');
    }

    let k = parseInt(kEntry.value);

    if(k > combination(pointSet.length, 2)){
        alert('k must be less than C(n,2).');
    }

    computeKClosestPairs();
}

let allNearestNeighborsButton = document.getElementById('allNearestNeighbors');
//allNearestNeighborsButton.addEventListener('click', computeAllNearestNeighbors);

//Reuse current WSPD button.
/*unction reUseWSPD() {
    if (wspd == null)
        return;

    if (confirm('')){
        continue;
    }
}*/
