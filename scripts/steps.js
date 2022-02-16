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
        '<p> \\(\\text{1)}\\) \\(SpitTree(S):\\) </p>' +
        '<p> \\(\\text{1.1) If \\(S\\) is singleton create a leaf node.}\\) <p>' +
        '<p> \\(\\text{1.2) Compute the bounding box, \\(R(S)\\), for \\(S\\).}\\) </p>' +
        '<p> \\(\\text{1.3) Split \\(R(S)\\) along its longest edge.}\\) </p>' +
        '<p> \\(\\text{1.4) Partition \\(S\\) into subsets \\(S_1\\) and \\(S_2\\)}\\) <br>' +
            '\\(\\text{with respect to the splitting line.}\\)</p>' +
        '<p> \\(\\text{1.5) Recur \\(SplitTree(S_1)\\) and \\(SplitTree(S_2)\\),}\\) <br>' +
        '<p> \\(\\text{1.6) Return the split tree \\(T\\).}\\) </p>' +
        '<p> \\(\\text{2)}\\) \\(Compute WSPD(T):\\) </p>' +
        '<p> \\(\\text{2.1) For each internal node \\(u\\) of \\(T\\) call}\\) <br>'+
            '\\(\\text{\\(FindPairs(v,w)\\) on its children.}\\)</p>' +
        '<p> \\(\\text{2.2.1) If \\(v\\) and \\(w\\) are well-separated}\\) <br>' +
            '\\(\\text{with respect to \\(s\\) create a pair}\\) </p>' +
        '<p>\\(\\text{2.2.2) \\(v\\) and \\(w\\) are NOT well-separated, call}\\) <br>' +
            '\\(\\text{\\(findPairs()\\) recursively on each node and}\\) <br>' +
            '\\(\\text{the others children.}\\) </p>'
        );

/**
 * Split Tree Steps.
*/

steps.set('leafPoint',
        '<p> \\(\\textbf{1)}\\) \\(SpitTree(S):\\) </p>' +
        '<p> \\(\\textbf{1.1) If \\(S\\) is singleton create a leaf node.}\\) <p>' +
        '<p> \\(\\text{1.2) Compute the bounding box, \\(R(S)\\), for \\(S\\).}\\) </p>' +
        '<p> \\(\\text{1.3) Split \\(R(S)\\) along its longest edge.}\\) </p>' +
        '<p> \\(\\text{1.4) Partition \\(S\\) into subsets \\(S_1\\) and \\(S_2\\)}\\) <br>' +
            '\\(\\text{with respect to the splitting line.}\\)</p>' +
        '<p> \\(\\text{1.5) Recur \\(SplitTree(S_1)\\) and \\(SplitTree(S_2)\\),}\\) <br>' +
        '<p> \\(\\text{1.6) Return the split tree \\(T\\).}\\) </p>' +
        '<p> \\(\\text{2)}\\) \\(Compute WSPD(T)\\) </p>'
        );

steps.set('boundingBox',
        '<p> \\(\\textbf{1)}\\) \\(SpitTree(S):\\) </p>' +
        '<p> \\(\\text{1.1) If \\(S\\) is singleton create a leaf node.}\\) <p>' +
        '<p> \\(\\textbf{1.2) Compute the bounding box, \\(R(S)\\), for \\(S\\).}\\) </p>' +
        '<p> \\(\\text{1.3) Split \\(R(S)\\) along its longest edge.}\\) </p>' +
        '<p> \\(\\text{1.4) Partition \\(S\\) into subsets \\(S_1\\) and \\(S_2\\)}\\) <br>' +
            '\\(\\text{with respect to the splitting line.}\\)</p>' +
        '<p> \\(\\text{1.5) Recur \\(SplitTree(S_1)\\) and \\(SplitTree(S_2)\\),}\\) <br>' +
        '<p> \\(\\text{1.6) Return the split tree \\(T\\).}\\) </p>' +
        '<p> \\(\\text{2)}\\) \\(Compute WSPD(T)\\) </p>'
        );
    
steps.set('splitBoundingBox',
        '<p> \\(\\textbf{1)}\\) \\(SpitTree(S):\\) </p>' +
        '<p> \\(\\text{1.1) If \\(S\\) is singleton create a leaf node.}\\) <p>' +
        '<p> \\(\\text{1.2) Compute the bounding box, \\(R(S)\\), for \\(S\\).}\\) </p>' +
        '<p> \\(\\textbf{1.3) Split \\(R(S)\\) along its longest edge.}\\) </p>' +
        '<p> \\(\\text{1.4) Partition \\(S\\) into subsets \\(S_1\\) and \\(S_2\\)}\\) <br>' +
            '\\(\\text{with respect to the splitting line.}\\)</p>' +
        '<p> \\(\\text{1.5) Recur \\(SplitTree(S_1)\\) and \\(SplitTree(S_2)\\),}\\) <br>' +
        '<p> \\(\\text{1.6) Return the split tree \\(T\\).}\\) </p>' +
        '<p> \\(\\text{2)}\\) \\(Compute WSPD(T)\\) </p>'
        );

steps.set('partitionHighlight',
        '<p> \\(\\textbf{1)}\\) \\(SpitTree(S):\\) </p>' +
        '<p> \\(\\text{1.1) If \\(S\\) is singleton create a leaf node.}\\) <p>' +
        '<p> \\(\\text{1.2) Compute the bounding box, \\(R(S)\\), for \\(S\\).}\\) </p>' +
        '<p> \\(\\text{1.3) Split \\(R(S)\\) along its longest edge.}\\) </p>' +
        '<p> \\(\\textbf{1.4) Partition \\(S\\) into subsets \\(S_1\\) and \\(S_2\\)}\\) <br>' +
            '\\(\\textbf{with respect to the splitting line.}\\)</p>' +
        '<p> \\(\\text{1.5) Recur \\(SplitTree(S_1)\\) and \\(SplitTree(S_2)\\),}\\) <br>' +
        '<p> \\(\\text{1.6) Return the split tree \\(T\\).}\\) </p>' +
        '<p> \\(\\text{2)}\\) \\(Compute WSPD(T)\\) </p>'
        );
    
steps.set('splitTreeRecur',
        '<p> \\(\\textbf{1)}\\) \\(SpitTree(S):\\) </p>' +
        '<p> \\(\\text{1.1) If \\(S\\) is singleton create a leaf node.}\\) <p>' +
        '<p> \\(\\text{1.2) Compute the bounding box, \\(R(S)\\), for \\(S\\).}\\) </p>' +
        '<p> \\(\\text{1.3) Split \\(R(S)\\) along its longest edge.}\\) </p>' +
        '<p> \\(\\text{1.4) Partition \\(S\\) into subsets \\(S_1\\) and \\(S_2\\)}\\) <br>' +
            '\\(\\text{with respect to the splitting line.}\\)</p>' +
        '<p> \\(\\textbf{1.5) Recur \\(SplitTree(S_1)\\) and \\(SplitTree(S_2)\\),}\\) <br>' +
        '<p> \\(\\text{1.6) Return the split tree \\(T\\).}\\) </p>' +
        '<p> \\(\\text{2)}\\) \\(Compute WSPD(T)\\) </p>'
        );
    
steps.set('returnSplitTree',
        '<p> \\(\\textbf{1)}\\) \\(SpitTree(S):\\) </p>' +
        '<p> \\(\\text{1.1) If \\(S\\) is singleton create a leaf node.}\\) <p>' +
        '<p> \\(\\text{1.2) Compute the bounding box, \\(R(S)\\), for \\(S\\).}\\) </p>' +
        '<p> \\(\\text{1.3) Split \\(R(S)\\) along its longest edge.}\\) </p>' +
        '<p> \\(\\text{1.4) Partition \\(S\\) into subsets \\(S_1\\) and \\(S_2\\)}\\) <br>' +
            '\\(\\text{with respect to the splitting line.}\\)</p>' +
        '<p> \\(\\text{1.5) Recur \\(SplitTree(S_1)\\) and \\(SplitTree(S_2)\\),}\\) <br>' +
        '<p> \\(\\textbf{1.6) Return the split tree \\(T\\).}\\) </p>' +
        '<p> \\(\\text{2)}\\) \\(Compute WSPD(T)\\) </p>'
        );


/**
 * WSPD Steps
 */

steps.set('findPairsInternalNodes', 
        '<p> \\(\\text{1)}\\) \\(SpitTree(S)\\) </p>' +
        '<p> \\(\\textbf{2)}\\) \\(Compute WSPD(T):\\) </p>' +
        '<p> \\(\\textbf{2.1) For each internal node \\(u\\) of \\(T\\) call}\\) <br>'+
            '\\(\\textbf{\\(FindPairs(v,w)\\) on its children.}\\)</p>' +
        '<p> \\(\\text{2.2.1) If \\(v\\) and \\(w\\) are well-separated}\\) <br>' +
            '\\(\\text{with respect to \\(s\\) create a pair}\\) </p>' +
        '<p>\\(\\text{2.2.2) \\(v\\) and \\(w\\) are NOT well-separated, call}\\) <br>' +
            '\\(\\text{ \\(findPairs()\\) recursively on each node and}\\) <br>' +
            '\\(\\text{the others children.}\\) </p>'
        );

steps.set('wellSeparatedCheck', 
        '<p> \\(\\text{1)}\\) \\(SpitTree(S)\\) </p>' +
        '<p> \\(\\textbf{2)}\\) \\(Compute WSPD(T):\\) </p>' +
        '<p> \\(\\text{2.1) For each internal node \\(u\\) of \\(T\\) call}\\) <br>'+
            '\\(\\text{\\(FindPairs(v,w)\\) on its children.}\\)</p>' +
        '<p> \\(\\textbf{2.2.1) If \\(v\\) and \\(w\\) are well-separated}\\) <br>' +
            '\\(\\textbf{with respect to \\(s\\) create a pair}\\) </p>' +
        '<p>\\(\\text{2.2.2) \\(v\\) and \\(w\\) are NOT well-separated, call}\\) <br>' +
            '\\(\\text{ \\(findPairs()\\) recursively on each node and}\\) <br>' +
            '\\(\\text{the others children.}\\) </p>'
        );

steps.set('findPairsRecur', 
        '<p> \\(\\text{1)}\\) \\(SpitTree(S)\\) </p>' +
        '<p> \\(\\textbf{2)}\\) \\(Compute WSPD(T):\\) </p>' +
        '<p> \\(\\text{2.1) For each internal node \\(u\\) of \\(T\\) call}\\) <br>'+
            '\\(\\text{\\(FindPairs(v,w)\\) on its children.}\\)</p>' +
        '<p> \\(\\text{2.2.1) If \\(v\\) and \\(w\\) are well-separated}\\) <br>' +
            '\\(\\text{with respect to \\(s\\) create a pair}\\) </p>' +
        '<p>\\(\\textbf{2.2.2) \\(v\\) and \\(w\\) are NOT well-separated, call}\\) <br>' +
            '\\(\\textbf{\\(findPairs()\\) recursively on each node and}\\) <br>' +
            '\\(\\textbf{the others children.}\\) </p>'
        );

steps.set('ANN',
    '<p> \\(\\textbf{1) For each point \\(p\\) \\(\\in\\) \\(P\\)}\\) <p>' +
    '<p> \\(\\text{2)  Consider all such pairs of the \\(WSPD\\),  } \\) <br>' +
    '\\(\\text{for which at least one of their sets is a singleton containing \\(p\\) } \\) </p>' +
    '<p> \\(\\text{3)}\\) Otherwise find WSPD pairs \\((A_i,B_i)\\) where \\(B_i = \\{p\\}\\)</p>' +
    '<p> \\(\\text{4)}\\) If \\(A_i = \\{p\\}\\), compute set, \\(Sp = Sp \\cup B_i \\)</p>' +
    '<p> \\(\\text{5)}\\) Otherwise \\(B_i = \\{p\\}\\), compute set, \\(Sp = Sp \\cup A_i \\)</p>' +
    '<p>\\(\\text{6) Find the nearest point of \\(p\\) in \\(Sp\\) which is closet to \\(p\\)}\\) <p>'
);

steps.set('ANNWSPD',
    '<p> \\(\\text{1) For each point \\(p\\) \\(\\varepsilon\\) \\(P\\)}\\) <p>' +
    '<p> \\(\\textbf{2)  Consider all such pairs of the \\(WSPD\\), for which} \\) <br>' +
    '\\(\\textbf{at least one of their sets is a singleton containing \\(p\\)} \\) </p>' +
    '<p> \\(\\text{4)}\\) If \\(A_i = \\{p\\}\\), compute set, \\(Sp = Sp \\cup B_i \\)</p>' +
    '<p> \\(\\text{5)}\\) Otherwise \\(B_i = \\{p\\}\\), compute set, \\(Sp = Sp \\cup A_i \\)</p>' +
    '<p>\\(\\text{6) Find the nearest point of \\(p\\) in \\(Sp\\) which is closet to \\(p\\)}\\) <p>'
);

steps.set('ANNWSPDBi',
    '<p> \\(\\text{1) For each point \\(p\\) \\(\\varepsilon\\) \\(P\\)}\\) <p>' +
    '<p> \\(\\text{2)  Find WSPD pairs \\{\\(A_i,B_i\\)\\} where \\(A_i = \\{p\\}\\) } \\) </p>' +
    '<p> \\(\\textbf{3)  Otherwise find WSPD pairs \\{\\(A_i,B_i\\)\\} where \\(B_i = \\{p\\}\\) } \\) </p>' +
    '<p> \\(\\text{4)}\\) If \\(A_i = \\{p\\}\\), compute set, \\(Sp = Sp \\cup B_i \\)</p>' +
    '<p> \\(\\text{5)}\\) Otherwise \\(B_i = \\{p\\}\\), compute set, \\(Sp = Sp \\cup A_i \\)</p>' +
    '<p>\\(\\text{6) Find the nearest point of \\(p\\) in \\(Sp\\) which is closet to \\(p\\)}\\) <p>'
);

steps.set('ANNWSPDSP',
    '<p> \\(\\text{1) For each point \\(p\\) \\(\\varepsilon\\) \\(P\\)}\\) <p>' +
    '<p> \\(\\text{2)  Consider all such pairs of the \\(WSPD\\),  } \\) <br>' +
    '\\(\\text{for which at least one of their sets is a singleton containing \\(p\\) } \\) </p>' +
    '<p> \\(\\textbf{4)  If \\(A_i = \\{p\\}\\) compute set, \\(Sp = Sp \\cup B_i \\) } \\) </p>' +
    '<p> \\(\\text{5)}\\) Otherwise \\(B_i = \\{p\\}\\), compute set, \\(Sp = Sp \\cup A_i \\)</p>' +
    '<p>\\(\\text{6) Find the nearest point of \\(p\\) in \\(Sp\\) which is closet to \\(p\\)}\\) <p>'
);

steps.set('ANNWSPDQ',
    '<p> \\(\\text{1) For each point \\(p\\) \\(\\varepsilon\\) \\(P\\)}\\) <p>' +
    '<p> \\(\\text{2)  Consider all such pairs of the \\(WSPD\\),  } \\) <br>' +
    '\\(\\text{for which at least one of their sets is a singleton containing \\(p\\) } \\) </p>' +
    '<p> \\(\\text{4)}\\) If \\(A_i = \\{p\\}\\), compute set, \\(Sp = Sp \\cup B_i \\)</p>' +
    '<p> \\(\\text{5)}\\) Otherwise \\(B_i = \\{p\\}\\), compute set, \\(Sp = Sp \\cup A_i \\)</p>' +
    '<p>\\(\\textbf{6) Find the nearest point of \\(p\\) in \\(Sp\\) which is closet to \\(p\\)}\\) <p>'
);

// Called during animation to display the steps for the current algorithm
// and bold the current step of the algorithm.
function displaySteps(selection) {

    resetStepsBox(); // Set the header.

    stepsBox.innerHTML += steps.get(selection) // Set the steps.

    MathJax.typeset(); // Latex typeset.
}

