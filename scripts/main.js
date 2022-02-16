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
var graph = new Map(); // Adjacency list representation for the graph.
var graphEdges = new Set(); // Edge set.
var closestPair = []; // Pair of points in R^2.
var tApproxMST = new Set(); // Edge set.
var kClosestPairs = []; // List of size k of closest pairs.
var algorithm = ''; // The algorithm currently being computed/animated.

// Data fields.
let stepsField = document.getElementById('stepsBox');
let metricsBox = document.getElementById('metricsBox');

// Controls

// Board controls.
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetAll);

//Animation controls.
let animationSpeedSelection = document.getElementById('animationSpeed');
let animationSelection = document.getElementById('animationSelection');
animationSelection.addEventListener('change', function () {
    if (!animationSelection.checked)
        animationSpeedSelection.setAttribute('disabled', '');
    else
        animationSpeedSelection.removeAttribute('disabled');
 });


// Resets all containers and the entire board.
function reset() {
    pointSet = [];
    pointSetMap = new Map();
    splitTree = null;
    wspd = null;
    graph = new Map();
    graphEdges = new Set();
    closestPair = [];
    tApproxMST = new Set();
    kClosestPairs = [];
    clear();
}

// Resets the entire state.
function resetAll() {
    pointTextBox.value = '';
    reset();
}

// Pointset, controls.
let editPointsSelection = document.getElementById('editPoints');
editPointsSelection.addEventListener('change', lockPoints);
let pointIDSelection = document.getElementById('pointIDs');
pointIDSelection.addEventListener('change', changePointIDStatus);
let numPointsEntry = document.getElementById('numPoints');
let pointTextBox = document.getElementById('points');
let generatePointsButton = document.getElementById('generatePoints');
generatePointsButton.addEventListener('click', generateRandomPointSet);
let plotPointsButton = document.getElementById('plotPoints');
plotPointsButton.addEventListener('click', plot);

// Checks that there are at least 2 points on the board.
function pointCheck() {
    
    if (pointSet.length > 1)
        return false;
    
    alert('Please create at least 2 points first.');
    return true;
}

// Calls to create a WSPD used by every application/algorithm.
function generateWSPD(s) {

    // Construct the WSPD.
    splitTree = new SplitTree(pointSet, computeBoundingBox(pointSet));
    wspd = new WSPD(splitTree, s);
}

// Call to create a t-spanner used by t-spanner, closest pair, and t-approx MST.
function generateTSpanner(t) {
    
    // Construct the t-spanner.
    var tSpannerReturn = constructTSpanner(t);
    graph = tSpannerReturn[0];
    graphEdges = tSpannerReturn[1];
}

// WSPD controls.
let wspdButton = document.getElementById('WSPD');
let separationFactorEntry = document.getElementById('separationFactor');
wspdButton.addEventListener('click', computeWSPD);
function computeWSPD() {

    // Confirm S > 1.
    if (pointCheck())
        return;

    // Get s.
    let s = parseFloat(separationFactorEntry.value)

    // Check that s is valid (s >= 0).
    if (!isFinite(s) || s < 0) {
        alert('Please select a valid value for the separation factor of the WSPD (s > 0).');
        return;
    }

    // Reset the objects on the board and re-plot the points to prepare animation.
    reset();
    plot();

    // Set the algorithm name and display its steps.
    algorithm = 'WSPD'
    displaySteps(algorithm);
    generateWSPD(s);
    populateMetrics(algorithm);

    animate(1, animationSpeedSelection.value);
}

// Algorithm controls.
let tSpannerButton = document.getElementById('tSpanner');
let tEntry = document.getElementById('t');
tSpannerButton.addEventListener('click', computeTSpanner);
function computeTSpanner() {

    // Confirm S > 1.
    if (pointCheck())
        return;

    let t = parseFloat(tEntry.value);

    // Check that t is valid (t > 1).
    if (!isFinite(t) || t <= 1) {
        alert('Please select a valid value for t (t > 1).');
        return;
    }

    // Reset the objects on the board and re-plot the points to prepare animation.
    reset();
    plot();

    // Generates the WSPD with separation factor based on t.
    let s = tToSeparationFactor(t)
    generateWSPD(s);

    algorithm = 'tSpanner';
    displaySteps(algorithm);
    generateTSpanner(t);
    populateMetrics(algorithm);

    animate(1, animationSpeedSelection.value);
}

let closestPairButton = document.getElementById('closestPair');
closestPairButton.addEventListener('click', findClosestPair);
function findClosestPair() {

    // Confirm S > 1.
    if (pointCheck())
        return;

    let t = 2;
    let s = tToSeparationFactor(t);

    // Reset the objects on the board and re-plot the points to prepare animation.
    reset();
    plot();

    generateWSPD(s);
    generateTSpanner(t);

    algorithm = 'closestPair';
    displaySteps(algorithm)
    closestPair = computeClosestPair();
    populateMetrics(algorithm);

    animate(1, animationSpeedSelection.value);
}

let mstButton = document.getElementById('MST');
let mstTEntry = document.getElementById('tMST');
mstButton.addEventListener('click', generateApproxMST);
function generateApproxMST() {

    // Confirm S > 1.
    if (pointCheck())
        return;

    let t = parseFloat(mstTEntry.value);

    // Check that t is valid (t > 1).
    if (!isFinite(t) || t <= 1) {
        alert('Please select a valid value for t (t > 1).');
        return;
    }

    // Reset the objects on the board and re-plot the points to prepare animation.
    reset();
    plot();

    // Generates the WSPD with separation factor based on t.
    let s = tToSeparationFactor(t)
    generateWSPD(s);

    generateTSpanner(t);

    // Run prims on the t-spanner.
    algorithm = 'tApproxMST';
    displaySteps(algorithm);
    tApproxMST = computeTApproxMST();
    populateMetrics(algorithm);

    animate(1, animationSpeedSelection.value);
}

let kClosestPairsButton = document.getElementById('kClosestPairs');
let kPairsEntry = document.getElementById('kPairs');
kClosestPairsButton.addEventListener('click', generateKClosestPairs);
function generateKClosestPairs() {

    // Confirm S > 1.
    if (pointCheck())
        return;

    let k = parseInt(kPairsEntry.value);

    // Check k is valid ( 1 <= k <= C(n,2)).
    if (k < 1 || k > combination(pointSet.length, 2)) {
        alert('Please select a valid value for k (0 < k <= C(n,2)).');
    }

    // Reset the objects on the board and re-plot the points to prepare animation.
    reset();
    plot();

    let s = 2;
    generateWSPD(s);

    algorithm = 'kClosestPairs';
    displaySteps(algorithm)
    kClosestPairs = computeKClosestPairs(k);
    populateMetrics(algorithm);

    animate(1, animationSpeedSelection.value);
}

let allNearestNeighborsButton = document.getElementById('allNearestNeighbors');
allNearestNeighborsButton.addEventListener('click', AllNearestNeighborConstruction);


function AllNearestNeighborConstruction() {    
    if (wspd == null) {
        alert('Please construct a WSPD.');
    }

    s = parseFloat(separationFactorEntry.value);

    // Check that s is valid (s > 2).
    if (wspd != null)
        if (!isFinite(s) || s <= 2) {
            alert('Please select a value for s > 2 and construct WSPD');
            reset();
            plot();
            return;
        }

    //splitTree = new SplitTree(pointSet, computeBoundingBox(pointSet));
    //wspd = new WSPD(splitTree, s);

    let treeArray;
    let singletonWSPD = getSingletonWSPD(wspd);

    
    eventQueue = [];
    undoQueue = [];
    removeQueue = [];
    
    NaiveAllNN(pointSet, pointSetMap, treeArray, singletonWSPD);
    animate(1, animationSpeedSelection.value);
}

// Download controls.

// Download board as a PNG image.
let boardDownloadButtonPNG = document.getElementById('boardDownloadPNG');
boardDownloadButtonPNG.addEventListener('click', downloadPNG);
function downloadPNG() {
    downloadBoardImage('PNG');
}

// Download board as an SVG image.
let boardDownloadButtonSVG = document.getElementById('boardDownloadSVG');
boardDownloadButtonSVG.addEventListener('click', downloadSVG);
function downloadSVG() {
    downloadBoardImage('SVG');
}
