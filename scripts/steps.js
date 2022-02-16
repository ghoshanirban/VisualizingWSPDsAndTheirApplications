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
 * WSPD Steps (Contains Split Tree).
*/
steps.set('WSPD', 
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> 1) \\(SpitTree(P):\\) </p>' +
        '<p> 1.1) If \\(|P| = 1\\) create a node that stores only that point. <p>' +
        '<p> 1.2) Otherwise, compute the bounding box, \\(R(P)\\), for \\(P\\). </p>' +
        '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
        '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
            'with respect to the new rectangles. </p>' +
        '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively '  +
            'defined on \\(P_1\\) and \\(P_2\\) </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) '+
            'on its children \\(u\\) and \\(v\\).</p>' +
        '<p> 3) \\(FindPairs(v,w,s)\\) </p>' +     
        '<p> 3.1) If \\(S_v\\) and \\(S_w\\) are well-separated with respect to ' +
            '\\(s\\) return a pair \\({u,v}\\) </p>' +
        '<p> 3.2) Otherwise, compute the node with the shorter longest bounding box ' +
            'side and call \\(FindPairs()\\) on that node and the others children. </p>'
        );

// Split Tree.

steps.set('leafPoint',
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> <strong> 1) \\(SpitTree(P):\\) </strong> </p>' +
        '<p> <strong> 1.1) If \\(|P| = 1\\) create a node that stores only that point. </strong> <p>' +
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
        '<p> <strong> 1) \\(SpitTree(P):\\) </strong> </p>' +
        '<p> 1.1) If \\(|P| = 1\\) create a node that stores only that point. <p>' +
        '<p> <strong> 1.2) Otherwise, compute the bounding box, \\(R(P)\\), for \\(P\\). </strong> </p>' +
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
        '<p> <strong> 1) \\(SpitTree(P):\\) </strong> </p>' +
        '<p> 1.1) If \\(|P| = 1\\) create a node that stores only that point. <p>' +
        '<p> 1.2) Otherwise, compute the bounding box, \\(R(P)\\), for \\(P\\). </p>' +
        '<p> <strong> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. <strong> </p>' +
        '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
        'with respect to the new rectangles. </p>' +
        '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
        'defined on \\(P_1\\) and \\(P_2\\) </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
        'on its children \\(u\\) and \\(v\\).</p>' +
        '<p> 3) \\(FindPairs(v,w,s)\\) </p>');

steps.set('partitionHighlight',
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> <strong> 1) \\(SpitTree(P):\\) </strong> </p>' +
        '<p> 1.1) If \\(|P| = 1\\) create a node that stores only that point. <p>' +
        '<p> 1.2) Otherwise, compute the bounding box, \\(R(P)\\), for \\(P\\). </p>' +
        '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
        '<p> <strong> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
        'with respect to the new rectangles. </strong> </p>' +
        '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
        'defined on \\(P_1\\) and \\(P_2\\) </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
        'on its children \\(u\\) and \\(v\\).</p>' +
        '<p> 3) \\(FindPairs(v,w,s)\\) </p>');
    
steps.set('splitTreeRecur',
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> <strong> 1) \\(SpitTree(P):\\) </strong> </p>' +
        '<p> 1.1) If \\(|P| = 1\\) create a node that stores only that point. <p>' +
        '<p> 1.2) Otherwise, compute the bounding box, \\(R(P)\\), for \\(P\\). </p>' +
        '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
        '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
        'with respect to the new rectangles. </p>' +
        '<p> <strong> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
        'defined on \\(P_1\\) and \\(P_2\\) </strong> </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
        'on its children \\(u\\) and \\(v\\).</p>' +
        '<p> 3) \\(FindPairs(v,w,s)\\) </p>');

// WSPD.

steps.set('findPairsInternalNodes', 
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> 1) \\(SpitTree(P):\\) </p>' +
        '<p> <strong> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
        'on its children \\(u\\) and \\(v\\). </strong> </p>' +
        '<p> 3) \\(FindPairs(v,w,s)\\) </p>' +
        '<p> 3.1) If \\(S_v\\) and \\(S_w\\) are well-separated with respect to ' +
        '\\(s\\) return a pair \\({u,v}\\) </p>' +
        '<p> 3.2) Otherwise, compute the node with the shorter longest bounding box ' +
        'side and call \\(FindPairs()\\) on that node and the others children. </p>');

steps.set('wellSeparatedCheck', 
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> 1) \\(SpitTree(P):\\) </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
        'on its children \\(u\\) and \\(v\\).</p>' +
        '<p> <strong> 3) \\(FindPairs(v,w,s)\\) </strong> </p>' +
        '<p> <strong> 3.1) If \\(S_v\\) and \\(S_w\\) are well-separated with respect to ' +
        '\\(s\\) return a pair \\({u,v}\\) </strong> </p>' +
        '<p> 3.2) Otherwise, compute the node with the shorter longest bounding box ' +
        'side and call \\(FindPairs()\\) on that node and the others children. </p>');

steps.set('findPairsRecur', 
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> 1) \\(SpitTree(P):\\) </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
        'on its children \\(u\\) and \\(v\\).</p>' +
        '<p> 3) \\(FindPairs(v,w,s)\\) </p>' +
        '<p> 3.1) If \\(S_v\\) and \\(S_w\\) are well-separated with respect to ' +
        '\\(s\\) return a pair \\({u,v}\\) </p>' +
        '<p> <strong> 3.2) Otherwise, compute the node with the shorter longest bounding box ' +
        'side and call \\(FindPairs()\\) on that node and the others children.</strong> </p>');

/**
 * t-Spanner Steps.
*/

steps.set('tSpanner',
    '<p style="text-align: center;"> \\(Construct-t-Spanner(P,t>1)\\) </p>' +
    '<p> 1) Let \\(s = 4(t+1)/(t-1)\\). Construct a WSPD of \\(p\\) with \\(s\\).</p>' +
    '<p> 2) For each pair \\({A_i, B_i}\\) select an arbitrary point \\(a_i\\) in \\(A_i\\)' +
    'and \\(b_i\\) in \\(B_i\\), then add the edge \\({a_i,b_i}\\). </p>');

steps.set('tSpannerWSPD',
        '<p style="text-align: center;"> \\(Construct-t-Spanner(P,t>1)\\) </p>' +
        '<p> <strong> 1) Let \\(s = 4(t+1)/(t-1)\\). Construct a WSPD of \\(p\\) with \\(s\\). </strong> </p>' +
        '<p> 2) For each pair \\({A_i, B_i}\\) select an arbitrary point \\(a_i\\) in \\(A_i\\)' +
        'and \\(b_i\\) in \\(B_i\\), then add the edge \\({a_i,b_i}\\). </p>');

steps.set('tSpannerStep', 
        '<p style="text-align: center;"> \\(Construct-t-Spanner(P,t>1)\\) </p>' +
        '<p> 1) Let \\(s = 4(t+1)/(t-1)\\). Construct a WSPD of \\(p\\) with \\(s\\).</p>' +
        '<p> <strong> 2) For each pair \\({A_i, B_i}\\) select an arbitrary point \\(a_i\\) in \\(A_i\\)' +
        'and \\(b_i\\) in \\(B_i\\), then add the edge \\({a_i,b_i}\\). </strong> </p>');

/**
 * Closest Pair Steps.
 */

steps.set('closestPair',
        '<p style="text-align: center;"> \\(ClosestPair(P)\\) </p>' +
        '<p> 1) Construct a 2-spanner \\((Construct-t-Spanner(P,2))\\). </p>' +
        '<p> 2) For each edge in the spanner compute the distance weight of the edge. </p>' +
        '<p> 2.1) If the weight of the edge is less than the current shortest edge distance replace' +
        'the current shortest pair. </p>' +
        '<p> 3) Return the closest pair. </p>');

steps.set('possibleClosestPair',
        '<p style="text-align: center;"> \\(ClosestPair(P)\\) </p>' +
        '<p> 1) Construct a 2-spanner \\((Construct-t-Spanner(P,2))\\). </p>' +
        '<p> <strong> 2) For each edge in the spanner compute the distance weight of the edge. </strong> </p>' +
        '<p> 2.1) If the weight of the edge is less than the current shortest edge distance replace' +
        'the current shortest pair. </p>' +
        '<p> 3) Return the closest pair. </p>');

steps.set('currentPossibleClosestPair',
        '<p style="text-align: center;"> \\(ClosestPair(P)\\) </p>' +
        '<p> 1) Construct a 2-spanner \\((Construct-t-Spanner(P,2))\\). </p>' +
        '<p> 2) For each edge in the spanner compute the distance weight of the edge. </p>' +
        '<p> <strong> 2.1) If the weight of the edge is less than the current shortest edge distance replace ' +
        'the current shortest pair. </strong></p>' +
        '<p> 3) Return the closest pair. </p>');

steps.set('closestPairReturn',
        '<p style="text-align: center;"> \\(ClosestPair(P)\\) </p>' +
        '<p> 1) Construct a 2-spanner \\((Construct-t-Spanner(P,2))\\). </p>' +
        '<p> 2) For each edge in the spanner compute the distance weight of the edge. </p>' +
        '<p> 2.1) If the weight of the edge is less than the current shortest edge distance replace ' +
        'the current shortest pair. </p>' +
        '<p> <strong> 3) Return the closest pair. </strong> </p>');


// Called during animation to display the steps for the current algorithm
// and bold the current step of the algorithm.
function displaySteps(selection) {

    resetStepsBox(); // Set the header.

    stepsBox.innerHTML += steps.get(selection) // Set the steps.
    console.log(selection, steps.get(selection));

    MathJax.typeset(); // Latex typeset.
}

