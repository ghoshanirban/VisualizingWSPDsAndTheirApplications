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
var tValue = null; // The t value used by the current algorithm.
var graph = new Map(); // Adjacency list representation for the graph.
var graphEdges = new Set(); // Edge set.
var closestPair = []; // Pair of points in R^2.
var tApproxMST = new Set(); // Edge set.
var kClosestPairs = []; // List of size k of closest pairs.
var ANNList = []; // List of all nearest neighbors.
var algorithm = ''; // The algorithm currently being computed/animated.

// Data fields.
let stepsField = document.getElementById('stepsBox');
let metricsBox = document.getElementById('metricsBox');

// Controls

// Board controls.
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetAll);

//Animation controls.
let animationSelection = document.getElementById('animationSelection');
let wspdAnimationSelection = document.getElementById('WSPDanimationSelection');
let animationSpeedSelection = document.getElementById('animationSpeed');
animationSelection.addEventListener('change', function () {
    if (!animationSelection.checked) {
        wspdAnimationSelection.setAttribute('disabled', '');
        animationSpeedSelection.setAttribute('disabled', '');
    }
    else {
        wspdAnimationSelection.removeAttribute('disabled');
        animationSpeedSelection.removeAttribute('disabled');
    }
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
    resetTextBoxes();
    reset();
}

// Pointset, controls.
let editPointsSelection = document.getElementById('editPoints');
editPointsSelection.addEventListener('change', lockPoints);
let pointIDSelection = document.getElementById('pointIDs');
pointIDSelection.addEventListener('change', changePointIDStatus);
let numPointsEntry = document.getElementById('numPoints');
let generatePointsButton = document.getElementById('generatePoints');
generatePointsButton.addEventListener('click', generateRandomPointSet);
let pointTextBox = document.getElementById('points');
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

    if (!wspdAnimationSelection.checked)
        animate(1, animationSpeedSelection.value, false);
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
        alert('Please enter a valid value for the separation factor of the WSPD (s > 0).');
        return;
    }

    // Reset the objects on the board and re-plot the points to prepare animation.
    reset();
    plot();

    // Set the algorithm name and display its steps.
    algorithm = 'WSPD'
    displaySteps(algorithm);
    processAlgorithm(algorithm, s, true);
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
        alert('Please enter a valid value for t (t > 1).');
        return;
    }

    tValue = t;

    // Reset the objects on the board and re-plot the points to prepare animation.
    reset();
    plot();

    // Generates the WSPD with separation factor based on t.
    let s = tToSeparationFactor(t)
    processAlgorithm('WSPD', s);

    algorithm = 'tSpanner';
    displaySteps(algorithm);
    processAlgorithm(algorithm, t, true);
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

    processAlgorithm('WSPD', s);
    processAlgorithm('tSpanner', t);
    tValue = t;

    algorithm = 'closestPair';
    displaySteps(algorithm)
    closestPair = processAlgorithm(algorithm, null, true);
}

let kClosestPairsButton = document.getElementById('kClosestPairs');
let kPairsEntry = document.getElementById('kPairs');
let sKPairsEntry = document.getElementById('sKPairs');
kClosestPairsButton.addEventListener('click', generateKClosestPairs);
function generateKClosestPairs() {

    // Confirm S > 1.
    if (pointCheck())
        return;

    let k = parseInt(kPairsEntry.value);
    let s = parseFloat(sKPairsEntry.value);

    // Check k is valid ( 1 <= k <= C(n,2)).
    if (!isFinite(k) || k < 1 || k > combination(pointSet.length, 2)) {
        alert('Please enter a valid value for k (0 < k <= C(n,2)).');
        return;
    }

    // Check that s is valid (s >= 0).
    if (!isFinite(s) || s < 0) {
        alert('Please enter a valid value for the separation factor of the WSPD (s > 0).');
        return;
    }

    // Reset the objects on the board and re-plot the points to prepare animation.
    reset();
    plot();

    processAlgorithm('WSPD', s);

    algorithm = 'kClosestPairs';
    displaySteps(algorithm)
    kClosestPairs = processAlgorithm(algorithm, k, true)
}

let allNearestNeighborsButton = document.getElementById('allNearestNeighbors');
let sANNEntry = document.getElementById('sANN');
allNearestNeighborsButton.addEventListener('click', AllNearestNeighborConstruction);


function AllNearestNeighborConstruction() {

    // Confirm S > 1.
    if (pointCheck())
        return;
    
    s = parseFloat(sANNEntry.value);

    // Check that s is valid (s > 2).
    if (!isFinite(s) || s <= 2) {
        alert('Please enter a valid value for the separation factor of the WSPD (s > 2).');
        return;
    }

    // Reset the objects on the board and re-plot the points to prepare animation.
    reset();
    plot();

    generateWSPD(s);
    processAlgorithm('WSPD', s);

    let singletonWSPD = getSingletonWSPD(wspd);

    algorithm = 'ANN';
    displaySteps(algorithm);
    processAlgorithm(algorithm, singletonWSPD, true);
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
        alert('Please enter a valid value for t (t > 1).');
        return;
    }

    // Reset the objects on the board and re-plot the points to prepare animation.
    reset();
    plot();

    // Generates the WSPD with separation factor based on t.
    let s = tToSeparationFactor(t)

    processAlgorithm('WSPD', s);
    processAlgorithm('tSpanner', t);
    tValue = t;

    // Run prims on the t-spanner.
    algorithm = 'tApproxMST';
    displaySteps(algorithm);
    tApproxMST = processAlgorithm(algorithm, null, true)
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
