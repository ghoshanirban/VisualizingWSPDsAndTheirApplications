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

/**
 * WSPD Steps (Contains Split Tree)
*/
steps.set('WSPD',
    '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
    '<p> 1) \\(SpitTree(P):\\) </p>' +
    '<p> 1.1) If \\(|P| = 1\\) create a node that stores only that point. <p>' +
    '<p> 1.2) Otherwise, compute the bounding box, \\(R(P)\\), for \\(P\\). </p>' +
    '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
    '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
    'with respect to the new rectangles. </p>' +
    '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
    'defined on \\(P_1\\) and \\(P_2\\) </p>' +
    '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
    'on its children \\(u\\) and \\(v\\).</p>' +
    '<p> 3) \\(FindPairs(v,w,s)\\) </p>' +
    '<p> 3.1) If \\(S_v\\) and \\(S_w\\) are well-separated with respect to ' +
    '\\(s\\) return a pair \\({u,v}\\) </p>' +
    '<p> 3.2) Otherwise, compute the node with the shorter longest bounding box ' +
    'side and call \\(FindPairs()\\) on that node and the others children. </p>'
);

/**
 * Split Tree Steps.
*/

steps.set('leafPoint',
    '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
    '<p> 1) \\(SpitTree(P):\\) </p>' +
    '<p> 1.1) If \\(|P| = 1\\) create a node that stores only that point. <p>' +
    '<p> 1.2) Otherwise, compute the bounding box, \\(R(P)\\), for \\(P\\). </p>' +
    '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
    '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
    'with respect to the new rectangles. </p>' +
    '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
    'defined on \\(P_1\\) and \\(P_2\\) </p>' +
    '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
    'on its children \\(u\\) and \\(v\\).</p>' +
    '<p> 3) \\(FindPairs(v,w,s)\\) </p>');

steps.set('boundingBox',
    '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
    '<p> 1) \\(SpitTree(P):\\) </p>' +
    '<p> 1.1) If \\(|P| = 1\\) create a node that stores only that point. <p>' +
    '<p> 1.2) Otherwise, compute the bounding box, \\(R(P)\\), for \\(P\\). </p>' +
    '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
    '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
    'with respect to the new rectangles. </p>' +
    '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
    'defined on \\(P_1\\) and \\(P_2\\) </p>' +
    '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
    'on its children \\(u\\) and \\(v\\).</p>' +
    '<p> 3) \\(FindPairs(v,w,s)\\) </p>');

steps.set('splitBoundingBox',
    '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
    '<p> 1) \\(SpitTree(P):\\) </p>' +
    '<p> 1.1) If \\(|P| = 1\\) create a node that stores only that point. <p>' +
    '<p> 1.2) Otherwise, compute the bounding box, \\(R(P)\\), for \\(P\\). </p>' +
    '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
    '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
    'with respect to the new rectangles. </p>' +
    '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
    'defined on \\(P_1\\) and \\(P_2\\) </p>' +
    '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
    'on its children \\(u\\) and \\(v\\).</p>' +
    '<p> 3) \\(FindPairs(v,w,s)\\) </p>');

steps.set('partitionHighlight',
    '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
    '<p> 1) \\(SpitTree(P):\\) </p>' +
    '<p> 1.1) If \\(|P| = 1\\) create a node that stores only that point. <p>' +
    '<p> 1.2) Otherwise, compute the bounding box, \\(R(P)\\), for \\(P\\). </p>' +
    '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
    '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
    'with respect to the new rectangles. </p>' +
    '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
    'defined on \\(P_1\\) and \\(P_2\\) </p>' +
    '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
    'on its children \\(u\\) and \\(v\\).</p>' +
    '<p> 3) \\(FindPairs(v,w,s)\\) </p>');

steps.set('splitTreeRecur',
    '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
    '<p> 1) \\(SpitTree(P):\\) </p>' +
    '<p> 1.1) If \\(|P| = 1\\) create a node that stores only that point. <p>' +
    '<p> 1.2) Otherwise, compute the bounding box, \\(R(P)\\), for \\(P\\). </p>' +
    '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
    '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
    'with respect to the new rectangles. </p>' +
    '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
    'defined on \\(P_1\\) and \\(P_2\\) </p>' +
    '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
    'on its children \\(u\\) and \\(v\\).</p>' +
    '<p> 3) \\(FindPairs(v,w,s)\\) </p>');

/**
 * WSPD Steps
 */

steps.set('findPairsInternalNodes',
    '<p> \\(\\text{1)}\\) \\(SpitTree(S)\\) </p>' +
    '<p> \\(\\textbf{2)}\\) \\(ConstructWSPD(T):\\) </p>' +
    '<p> \\(\\textbf{2.1) For each internal node \\(u\\) of \\(T\\) call}\\) <br>' +
    '\\(\\textbf{\\(FindPairs(v,w,s)\\) on its children.}\\)</p>' +
    '<p> \\(\\text{2.2.1) If \\(v\\) and \\(w\\) are well-separated}\\) <br>' +
    '\\(\\text{with respect to \\(s\\) create a pair}\\) </p>' +
    '<p>\\(\\text{2.2.2) \\(v\\) and \\(w\\) are NOT well-separated, call}\\) <br>' +
    '\\(\\text{ \\(FindPairs()\\) recursively on each node and}\\) <br>' +
    '\\(\\text{the others children.}\\) </p>'
);

steps.set('wellSeparatedCheck',
    '<p> \\(\\text{1)}\\) \\(SpitTree(S)\\) </p>' +
    '<p> \\(\\textbf{2)}\\) \\(ConstructWSPD(T):\\) </p>' +
    '<p> \\(\\text{2.1) For each internal node \\(u\\) of \\(T\\) call}\\) <br>' +
    '\\(\\text{\\(FindPairs(v,w,s)\\) on its children.}\\)</p>' +
    '<p> \\(\\textbf{2.2.1) If \\(v\\) and \\(w\\) are well-separated}\\) <br>' +
    '\\(\\textbf{with respect to \\(s\\) create a pair}\\) </p>' +
    '<p>\\(\\text{2.2.2) \\(v\\) and \\(w\\) are NOT well-separated, call}\\) <br>' +
    '\\(\\text{ \\(FindPairs()\\) recursively on each node and}\\) <br>' +
    '\\(\\text{the others children.}\\) </p>'
);

steps.set('findPairsRecur',
    '<p> \\(\\text{1)}\\) \\(SpitTree(S)\\) </p>' +
    '<p> \\(\\textbf{2)}\\) \\(ConstructWSPD(T):\\) </p>' +
    '<p> \\(\\text{2.1) For each internal node \\(u\\) of \\(T\\) call}\\) <br>' +
    '\\(\\text{\\(FindPairs(v,w,s)\\) on its children.}\\)</p>' +
    '<p> \\(\\text{2.2.1) If \\(v\\) and \\(w\\) are well-separated}\\) <br>' +
    '\\(\\text{with respect to \\(s\\) create a pair}\\) </p>' +
    '<p>\\(\\textbf{2.2.2) \\(v\\) and \\(w\\) are NOT well-separated, call}\\) <br>' +
    '\\(\\textbf{\\(FindPairs()\\) recursively on each node and}\\) <br>' +
    '\\(\\textbf{the others children.}\\) </p>'
);


/**
 * t-Approx MST steps.
 */

steps.set('tApproxMST',
        '<p style="text-align: center;"> \\(t\\)\\(-\\)ApproximateMinimumSpanningTree(P,t>1)\\) </p>' +
        '<p> 1) Construct a t-spanner \\(G\\) via (\\(Construct\\)(-\\)t\\(-\\)Spanner(P,t)\\)). </p>' +
        '<p> 2) Prims(G) </p>' +
        '<p> 2.1) Select an arbitrary starting point. <p>' +
        '<p> 2.2) While the \\(|T_v| < |P|\\) select the shortest edge \\(e_min\\) of ' +
        '\\(G\\) with at least one vertex in \\(T\\). </p> ' +
        '<p> 2.3) If the selected edge \\(e_min\\) would create a cycle do not add it to \\(T\\). </p>' +
        '<p> 2.4) Otherwise add \\(e_min\\) to \\(T\\). </p>');

steps.set('tApproxMSTStartPoint',
        '<p style="text-align: center;"> \\(t\\)\\(-\\)ApproximateMinimumSpanningTree(P,t>1)\\) </p>' +
        '<p> 1) Construct a t-spanner \\(G\\) via (\\(Construct\\)(-\\)t\\(-\\)Spanner(P,t)\\)). </p>' +
        '<p> <strong> 2) Prims(G) </strong> </p>' +
        '<p> <strong> 2.1) Select an arbitrary starting point. </strong> <p>' +
        '<p> 2.2) While the \\(|T_v| < |P|\\) select the shortest edge \\(e_min\\) of ' +
        '\\(G\\) with at least one vertex in \\(T\\). </p> ' +
        '<p> 2.3) If the selected edge \\(e_min\\) would create a cycle do not add it to \\(T\\). </p>' +
        '<p> 2.4) Otherwise add \\(e_min\\) to \\(T\\). </p>');

steps.set('tApproxMSTConsidered',
        '<p style="text-align: center;"> \\(t\\)\\(-\\)ApproximateMinimumSpanningTree(P,t>1)\\) </p>' +
        '<p> 1) Construct a t-spanner \\(G\\) via (\\(Construct\\)(-\\)t\\(-\\)Spanner(P,t)\\)). </p>' +
        '<p> 2) <strong> Prims(G) </strong> </p>' +
        '<p> 2.1) Select an arbitrary starting point. <p>' +
        '<p> <strong> 2.2) While the \\(|T_v| < |P|\\) select the shortest edge \\(e_min\\) of ' +
        '\\(G\\) with at least one vertex in \\(T\\). </strong> </p> ' +
        '<p> 2.3) If the selected edge \\(e_min\\) would create a cycle do not add it to \\(T\\). </p>' +
        '<p> 2.4) Otherwise add \\(e_min\\) to \\(T\\). </p>');

steps.set('cycleEdge',
        '<p style="text-align: center;"> \\(t\\)\\(-\\)ApproximateMinimumSpanningTree(P,t>1)\\) </p>' +
        '<p> 1) Construct a t-spanner \\(G\\) via (\\(Construct\\)(-\\)t\\(-\\)Spanner(P,t)\\)). </p>' +
        '<p> <strong> 2) Prims(G) </strong> </p>' +
        '<p> 2.1) Select an arbitrary starting point. <p>' +
        '<p> 2.2) While the \\(|T_v| < |P|\\) select the shortest edge \\(e_min\\) of ' +
        '\\(G\\) with at least one vertex in \\(T\\). </p> ' +
        '<p> <strong> 2.3) If the selected edge \\(e_min\\) would create a cycle do not add it to \\(T\\). </strong> </p>' +
        '<p> 2.4) Otherwise add \\(e_min\\) to \\(T\\). </p>');

steps.set('tApproxMSTAdd',
        '<p style="text-align: center;"> \\(t\\)\\(-\\)ApproximateMinimumSpanningTree(P,t>1)\\) </p>' +
        '<p> 1) Construct a t-spanner \\(G\\) via (\\(Construct\\)(-\\)t\\(-\\)Spanner(P,t)\\)). </p>' +
        '<p> <strong> 2) Prims(G) </strong> </p>' +
        '<p> 2.1) Select an arbitrary starting point. <p>' +
        '<p> 2.2) While the \\(|T_v| < |P|\\) select the shortest edge \\(e_min\\) of ' +
        '\\(G\\) with at least one vertex in \\(T\\). </p> ' +
        '<p> 2.3) If the selected edge \\(e_min\\) would create a cycle do not add it to \\(T\\). </p>' +
        '<p> <strong> 2.4) Otherwise add \\(e_min\\) to \\(T\\). </strong> </p>');


// Called during animation to display the steps for the current algorithm
// and bold the current step of the algorithm.
function displaySteps(selection) {

    resetStepsBox(); // Set the header.

    stepsBox.innerHTML += steps.get(selection) // Set the steps.

    MathJax.typeset(); // Latex typeset.
}

