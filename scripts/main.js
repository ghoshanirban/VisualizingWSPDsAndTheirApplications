/**
 * Contains all global variables for the WSPD and its application algorithms,
 * along with all controls and output generation.
 */


// Globals
var pointSet = []; // List of points.
var splitTree = null; // Object defined in SplitTree.js
var wspd = null; // Object defined in WSPD.js
var graph = new Set(); // Edge set.
var closestPair = []; // Pair of points in R^2.
var approxMST = new Set(); // Edge set.
var kClosestPairs = [] // List of size k of closest pairs.

// Controls

// Pointset, controls.
let editPointsSelection = document.getElementsByName('editPoints');
let numPointsEntry = document.getElementById('numPoints');
let pointTextBox = document.getElementById('points');
let generatePointsButton = document.getElementById('generatePoints');
generatePointsButton.addEventListener('click', generateRandomPointSet);
let plotPointsButton = document.getElementById('plotPoints');
plotPointsButton.addEventListener('click', plot);


// WSPD controls.
let wspdComplexitySelection = document.getElementsByName('WSPDComplexity');
let separationFactorEntry = document.getElementById('separationFactor');
let wspdButton = document.getElementById('WSPD');
wspdButton.addEventListener('click', generateWSPD);
function generateWSPD() {
    splitTree = new SplitTree(pointSet, computeBoundingBox(pointSet));
    wspd = new WSPD(splitTree, parseInt(separationFactorEntry.value));
    animate(1);
}


// Algorithm controls.
let tSpannerButton = document.getElementById('tSpanner');
tSpannerButton.addEventListener('click', generateTSpanner);
function generateTSpanner() {
    if (wspd == null) {
        alert('Please construct a WSPD with a s > 4.');
    }
    else if (wspd.s <= 4) {
        alert('The separation ratio of the WSPD is too low for a t-spanner to' +
            'be constructed, select an s > 4.');
    }
    else
        graph = constructTSpanner();
    
}

let closestPairButton = document.getElementById('closestPair');
closestPairButton.addEventListener('click', findClosestPair);
function findClosestPair() {
    if(graph.size == 0){
        graph = constructTSpanner();
    }

    closestPair = computeClosestPair();
}


let mstButton = document.getElementById('MST');
mstButton.addEventListener('click', generateApproxMST);
function generateApproxMST() {
    if (graph.size == 0) {
        graph = constructTSpanner();
    }

    approxMST = computeApproxMST();
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
allNearestNeighborsButton.addEventListener('click', computeAllNearestNeighbors);

// Board controls.
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', reset);

//Animation controls.
let animationSlider = document.getElementById('animationSlider');
let rewindButton = document.getElementById('rewind');
let playbackButton = document.getElementById('playback');
let forwardButton = document.getElementById('forward');

// Resets the entire state, all containers and the entire board.
function reset() {
    pointSet = [];
    splitTree = null;
    wspd = null;
    graph.clear();
    closestPair = [];
    approxMST.clear();
    kClosestPairs = [];
    clear();
}
