/**
 * Step display function and data.
 * 
 * David Wisnosky
 */

function displaySteps(selection) {

    var steps = '';

    if (selection == 'WSPD') {

        steps += '<p> Split Tree: <br>' +
            '1) Compute bounding box for the point set. <br>' +
            '2) Divide the bounding box by the longest edge. <br>' +
            '3) Partition thr point set with respect to the splitting line. <br>' +
            '4) Let v = the recursive call on the first subset. <br>' +
            '5) Let w = the recursive call on the first subset. <br>' + 
            '6) Create a new node with v and w as the left and right children respectively. <br>' +
            '7) |S| = 1 create a leaf node in the split tree.'
            '8) Return the split tree.' +
        '</p>';
    }

    stepsField.innerHTML = steps;
    
}