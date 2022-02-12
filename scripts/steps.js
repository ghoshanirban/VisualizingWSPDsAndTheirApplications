/**
 * Step display function and data.
 * 
 * David Wisnosky
 */

// Base step box text.
var baseStepBoxInnerHTML = stepsBox.innerHTML;

// Resets the step box text for new steps.
function resetStepsBox() {
    stepsBox.innerHTML = baseStepBoxInnerHTML;
}

// A dictionary that holds all the step html data.
var steps = new Map();

steps.set('WSPD', 
        '<p> <strong> \\(SpitTree(S)\\) </strong> </p>' +
        '<p> <strong> \\(ComputeWSPD(T)\\) </strong> </p>');

steps.set('boundingBox',
        '<p> <strong> \\(SpitTree(S):\\) </strong> </p>' +
        '<p> 1) If $S is singleton create a leaf node.$ <p>' +
        '<p> <strong> \\(2) Compute bounding box, R(S), for the point set.\\) </strong> </p>' +
        '<p> \\(3) Split the bounding box along the longest edge.\\) </p>' +
        '<p> \\(4) Partition the point set S into two subsets S_1 and S_2 with respect to the splitting line.\\)</p>' +
        '<p> \\(5) Recursively call SplitTree(S_1) and Split Tree(S_2) and create a tree node with both calls as its left and right children respectively.\\)' +
        '<p> \\(6) Return the split tree T\\) </p>' +
        '<p> \\(Compute WSPD(T)\\) </p>');




/*steps += '<p> Split Tree: <br>' +
    '1) Compute bounding box for the point set. <br>' +
    '2) Divide the bounding box by the longest edge. <br>' +
    '3) Partition thr point set with respect to the splitting line. <br>' +
    '4) Let v = the recursive call on the first subset. <br>' +
    '5) Let w = the recursive call on the first subset. <br>' +
    '6) Create a new node with v and w as the left and right children respectively. <br>' +
    '7) |S| = 1 create a leaf node in the split tree.'
'8) Return the split tree.' +
    '</p>';*/


function displaySteps(selection) {

    resetStepsBox();

    stepsBox.innerHTML += steps.get(selection)

    MathJax.typeset();
}

