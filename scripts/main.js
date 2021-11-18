/**
 * Contains all global variables for the WSPD and its application algorithms,
 * along with all controls and output generation.
 */


// Globals
var pointSet = [];
var splitTree = null;
var wspd = null;
var graph = new Set();

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
}


// Algorithm controls.
let tSpannerButton = document.getElementById('tSpanner');
tSpannerButton.addEventListener('click', generateTSpanner);
function generateTSpanner() {
    if (wspd.s <= 4) {
        alert('The separation ratio of the WSPD is too low for a t-spanner to' +
            'be constructed, select an s > 4.');
    }
    else
        graph = constructTSpanner();
    
}
let closestPairButton = document.getElementById('closestPair');
closestPairButton.addEventListener('click', computeClosestPair);
let mstButton = document.getElementById('MST');
mstButton.addEventListener('click', computeApproxMST);
let kClosestPairsButton = document.getElementById('kClosestPairs');
kClosestPairsButton.addEventListener('click', computeKClosestPairs);
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
    clear();
}