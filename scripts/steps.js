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
        '<p> 1.1) If \\(|P| = 1\\), create a node that stores only that point. <p>' +
        '<p> 1.2) Otherwise, compute the bounding-box, \\(R(P)\\), for \\(P\\). </p>' +
        '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
        '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
            'with respect to the new rectangles. </p>' +
        '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively '  +
            'defined on \\(P_1\\) and \\(P_2\\). </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) '+
            'on its children \\(u\\) and \\(v\\).</p>' +
        '<p> 3) \\(FindPairs(v,w,s)\\) </p>' +     
        '<p> 3.1) If \\(S_v\\) and \\(S_w\\) are well-separated with respect to ' +
            '\\(s\\) return a pair {\\(u,v\\)}. </p>' +
        '<p> 3.2) Otherwise, if \\(L_{max}(R(v)) \\leq L_{max}(R(w))\\), then call \\(FindPairs(v, LeftChild(w), s)\\) ' +
        'and \\(FindPairs(v, RightChild(w), s)\\). Else, call \\(FindPairs(LeftChild(v), w, s)\\) and ' +
        '\\(FindPairs(RightChild(v), w, s)\\). </p>');

// Split Tree.

steps.set('leafPoint',
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> <strong> 1) \\(SpitTree(P):\\) </strong> </p>' +
        '<p> <strong> 1.1) If \\(|P| = 1\\), create a node that stores only that point. </strong> <p>' +
        '<p> 1.2) Otherwise, compute the bounding-box, \\(R(P)\\), for \\(P\\). </p>' +
        '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
        '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
        'with respect to the new rectangles. </p>' +
        '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
        'defined on \\(P_1\\) and \\(P_2\\). </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
        'on its children \\(u\\) and \\(v\\). </p>' +
        '<p> 3) \\(FindPairs(v,w,s)\\) </p>');

steps.set('boundingBox',
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> <strong> 1) \\(SpitTree(P):\\) </strong> </p>' +
        '<p> 1.1) If \\(|P| = 1\\), create a node that stores only that point. <p>' +
        '<p> <strong> 1.2) Otherwise, compute the bounding-box, \\(R(P)\\), for \\(P\\). </strong> </p>' +
        '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
        '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
        'with respect to the new rectangles. </p>' +
        '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
        'defined on \\(P_1\\) and \\(P_2\\). </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
        'on its children \\(u\\) and \\(v\\). </p>' +
        '<p> 3) \\(FindPairs(v,w,s)\\) </p>');
    
steps.set('splitBoundingBox',
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> <strong> 1) \\(SpitTree(P):\\) </strong> </p>' +
        '<p> 1.1) If \\(|P| = 1\\), create a node that stores only that point. <p>' +
        '<p> 1.2) Otherwise, compute the bounding-box, \\(R(P)\\), for \\(P\\). </p>' +
        '<p> <strong> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </strong> </p>' +
        '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
        'with respect to the new rectangles. </p>' +
        '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
        'defined on \\(P_1\\) and \\(P_2\\). </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
        'on its children \\(u\\) and \\(v\\).</p>' +
        '<p> 3) \\(FindPairs(v,w,s)\\) </p>');

steps.set('partitionHighlight',
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> <strong> 1) \\(SpitTree(P):\\) </strong> </p>' +
        '<p> 1.1) If \\(|P| = 1\\), create a node that stores only that point. <p>' +
        '<p> 1.2) Otherwise, compute the bounding-box, \\(R(P)\\), for \\(P\\). </p>' +
        '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
        '<p> <strong> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
        'with respect to the new rectangles. </strong> </p>' +
        '<p> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
        'defined on \\(P_1\\) and \\(P_2\\). </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
        'on its children \\(u\\) and \\(v\\).</p>' +
        '<p> 3) \\(FindPairs(v,w,s)\\) </p>');
    
steps.set('splitTreeRecur',
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> <strong> 1) \\(SpitTree(P):\\) </strong> </p>' +
        '<p> 1.1) If \\(|P| = 1\\), create a node that stores only that point. <p>' +
        '<p> 1.2) Otherwise, compute the bounding-box, \\(R(P)\\), for \\(P\\). </p>' +
        '<p> 1.3) Split \\(R(P)\\) into two rectangles along its longest side. </p>' +
        '<p> 1.4) Partition \\(P\\) into subsets \\(P_1\\) and \\(P_2\\) ' +
        'with respect to the new rectangles. </p>' +
        '<p> <strong> 1.5) Create a node for \\(P\\) with two subtrees which are recursively ' +
        'defined on \\(P_1\\) and \\(P_2\\). </strong> </p>' +
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
        '\\(s\\) return a pair {\\(u,v\\)}. </p>' +
        '<p> 3.2) Otherwise, if \\(L_{max}(R(v)) \\leq L_{max}(R(w))\\), then call \\(FindPairs(v, LeftChild(w), s)\\) ' +
        'and \\(FindPairs(v, RightChild(w), s)\\). Else, call \\(FindPairs(LeftChild(v), w, s)\\) and ' +
        '\\(FindPairs(RightChild(v), w, s)\\). </p>');

steps.set('wellSeparatedCheck', 
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> 1) \\(SpitTree(P):\\) </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
        'on its children \\(u\\) and \\(v\\).</p>' +
        '<p> <strong> 3) \\(FindPairs(v,w,s)\\) </strong> </p>' +
        '<p> <strong> 3.1) If \\(S_v\\) and \\(S_w\\) are well-separated with respect to ' +
        '\\(s\\) return a pair {\\(u,v\\)}. </strong> </p>' +
        '<p> 3.2) Otherwise, if \\(L_{max}(R(v)) \\leq L_{max}(R(w))\\), then call \\(FindPairs(v, LeftChild(w), s)\\) ' +
        'and \\(FindPairs(v, RightChild(w), s)\\). Else, call \\(FindPairs(LeftChild(v), w, s)\\) and ' +
        '\\(FindPairs(RightChild(v), w, s)\\). </p>');


steps.set('wellSeparatedHighlight',
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> 1) \\(SpitTree(P):\\) </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
        'on its children \\(u\\) and \\(v\\).</p>' +
        '<p> <strong> 3) \\(FindPairs(v,w,s)\\) </strong> </p>' +
        '<p> <strong> 3.1) If \\(S_v\\) and \\(S_w\\) are well-separated with respect to ' +
        '\\(s\\) return a pair {\\(u,v\\)}. </strong> </p>' +
        '<p> 3.2) Otherwise, if \\(L_{max}(R(v)) \\leq L_{max}(R(w))\\), then call \\(FindPairs(v, LeftChild(w), s)\\) ' +
        'and \\(FindPairs(v, RightChild(w), s)\\). Else, call \\(FindPairs(LeftChild(v), w, s)\\) and ' +
        '\\(FindPairs(RightChild(v), w, s)\\). </p>');

steps.set('findPairsRecur', 
        '<p style="text-align: center;"> \\(ConstructWSPD(P,s>0)\\) </p>' +
        '<p> 1) \\(SpitTree(P):\\) </p>' +
        '<p> 2) For each internal node \\(u\\) of \\(T\\) call \\(FindPairs(v,w,s)\\) ' +
        'on its children \\(u\\) and \\(v\\).</p>' +
        '<p> 3) \\(FindPairs(v,w,s)\\) </p>' +
        '<p> 3.1) If \\(S_v\\) and \\(S_w\\) are well-separated with respect to ' +
        '\\(s\\) return a pair {\\(u,v\\)}. </p>' +
        '<p> 3.2) Otherwise, if \\(L_{max}(R(v)) \\leq L_{max}(R(w))\\), then call \\(FindPairs(v, LeftChild(w), s)\\) ' +
        'and \\(FindPairs(v, RightChild(w), s)\\). Else, call \\(FindPairs(LeftChild(v), w, s)\\) and ' +
        '\\(FindPairs(RightChild(v), w, s)\\). </p>');

/**
 * t-Spanner Steps.
*/

steps.set('tSpanner',
        '<p style="text-align: center;"> \\(Construct\\)-\\(t\\)-\\(Spanner(P,t>1)\\) </p>' +
        '<p> 1) Let \\(s = 4(t+1)/(t-1)\\). Construct a WSPD of \\(p\\) with \\(s\\).</p>' +
        '<p> 2) For each pair \\({A_i, B_i}\\) select an arbitrary point \\(a_i\\) in \\(A_i\\) ' +
        'and \\(b_i\\) in \\(B_i\\), then add the edge {\\(a_i,b_i\\)}. </p>');

steps.set('tSpannerWSPD',
        '<p style="text-align: center;"> \\(Construct\\)-\\(t\\)-\\(Spanner(P,t>1)\\) </p>' +
        '<p> <strong> 1) Let \\(s = 4(t+1)/(t-1)\\). Construct a WSPD of \\(p\\) with \\(s\\). </strong> </p>' +
        '<p> 2) For each pair \\({A_i, B_i}\\) select an arbitrary point \\(a_i\\) in \\(A_i\\) ' +
        'and \\(b_i\\) in \\(B_i\\), then add the edge {\\(a_i,b_i\\)}. </p>');

steps.set('tSpannerStep', 
        '<p style="text-align: center;"> \\(Construct\\)-\\(t\\)-\\(Spanner(P,t>1)\\) </p>' +
        '<p> 1) Let \\(s = 4(t+1)/(t-1)\\). Construct a WSPD of \\(p\\) with \\(s\\).</p>' +
        '<p> <strong> 2) For each pair \\({A_i, B_i}\\) select an arbitrary point \\(a_i\\) in \\(A_i\\) ' +
        'and \\(b_i\\) in \\(B_i\\), then add the edge {\\(a_i,b_i\\\)}. </strong> </p>');

/**
 * Closest Pair Steps.
 */

steps.set('closestPair',
        '<p style="text-align: center;"> \\(ClosestPair(P)\\) </p>' +
        '<p> 1) Construct a 2-spanner (\\(Construct\\)\\(-\\)t\\(-\\)\\(Spanner(P,2)\\)). </p>' +
        '<p> 2) For each edge in the spanner compute the distance weight of the edge. </p>' +
        '<p> 2.1) If the weight of the edge is less than the current shortest edge distance replace ' +
        'the current shortest pair. </p>' +
        '<p> 3) Return the closest pair. </p>');

steps.set('possibleClosestPair',
        '<p style="text-align: center;"> \\(ClosestPair(P)\\) </p>' +
        '<p> 1) Construct a 2-spanner (\\(Construct\\)\\(-\\)t\\(-\\)\\(Spanner(P,2)\\)). </p>' +
        '<p> <strong> 2) For each edge in the spanner compute the distance weight of the edge. </strong> </p>' +
        '<p> 2.1) If the weight of the edge is less than the current shortest edge distance replace ' +
        'the current shortest pair. </p>' +
        '<p> 3) Return the closest pair. </p>');

steps.set('currentPossibleClosestPair',
        '<p style="text-align: center;"> \\(ClosestPair(P)\\) </p>' +
        '<p> 1) Construct a 2-spanner (\\(Construct\\)\\(-\\)t\\(-\\)\\(Spanner(P,2)\\)). </p>' +
        '<p> <strong> 2) For each edge in the spanner compute the distance weight of the edge. </strong> </p>' +
        '<p> <strong> 2.1) If the weight of the edge is less than the current shortest edge distance replace ' +
        'the current shortest pair. </strong></p>' +
        '<p> 3) Return the closest pair. </p>');

steps.set('closestPairReturn',
        '<p style="text-align: center;"> \\(ClosestPair(P)\\) </p>' +
        '<p> 1) Construct a 2-spanner (\\(Construct\\)\\(-\\)t\\(-\\)\\(Spanner(P,2)\\)). </p>' +
        '<p> 2) For each edge in the spanner compute the distance weight of the edge. </p>' +
        '<p> 2.1) If the weight of the edge is less than the current shortest edge distance replace ' +
        'the current shortest pair. </p>' +
        '<p> <strong> 3) Return the closest pair. </strong> </p>');

/**
 * k-Closest Pairs steps.
 */

steps.set('kClosestPairs', 
        '<p style="text-align: center;"> \\(k\\)\\(-\\)\\(ClosestPairs(P)\\) </p>' +
        '<p> 1) Construct a WSPD with \\(s>0\\) where the set of pairs is sorted by the minimum distance '+
        'between the bounding-boxes of the first set of the pair \\(R(A_i)\\) and the second set of pair ' +
        '\\(R(B_i)\\) denoted as \\(|R(A_i)R(B_i)|\\). </p>' +
        '<p> 2) Compute the smallest integer \\(l\\) such that \\(\\sum{i = 1}{l} |A_i| \\cdot |B_i| \\geq k\\).</p>' +
        '<p> 3) Let \\(r\\) denote \\(|R(A_l)R(B_l)|\\).</p>' +
        '<p> 4) Compute \\(l\'\\) the number of indices for which \\(|R(A_i)R(B_i)| \\leq (1+4/s)r\\). </p>' +
        '<p> 5) Compute \\(L\\) which contains all pairs {\\(p,q\\)} for which there is an index \\(1 \\leq i \\leq l\\) ' +
        'such that \\(p \\in A_i, q \\in B_i\\) or  \\(q \\in A_i, p \\in B_i\\)' +
        '<p> 6) Return the first \\(k\\) pairs ordered by smallest distances in \\(L\\).</p>');

steps.set('kClosestWSPDPairSelection',
        '<p style="text-align: center;"> \\(k\\)\\(-\\)\\(ClosestPairs(P)\\) </p>' +
        '<p> 1) Construct a WSPD with \\(s>0\\) where the set of pairs is sorted by the minimum distance ' +
        'between the bounding-boxes of the first set of the pair \\(R(A_i)\\) and the second set of pair ' +
        '\\(R(B_i)\\) denoted as \\(|R(A_i)R(B_i)|\\). </p>' +
        '<p> <strong> 2) Compute the smallest integer \\(l\\) such that \\(\\sum{i = 1}{l} |A_i| \\cdot |B_i| \\geq k\\). </strong> </p>' +
        '<p> 3) Let \\(r\\) denote \\(|R(A_l)R(B_l)|\\).</p>' +
        '<p> 4) Compute \\(l\'\\) the number of indices for which \\(|R(A_i)R(B_i)| \\leq (1+4/s)r\\). </p>' +
        '<p> 5) Compute \\(L\\) which contains all pairs  {\\(p,q\\)} for which there is an index \\(1 \\leq i \\leq l\\) ' +
        'such that \\(p \\in A_i, q \\in B_i\\) or  \\(q \\in A_i, p \\in B_i\\)' +
        '<p> 6) Return the first \\(k\\) pairs ordered by smallest distances in \\(L\\).</p>');

steps.set('kClosestBoundingBox',
        '<p style="text-align: center;"> \\(k\\)\\(-\\)\\(ClosestPairs(P)\\) </p>' +
        '<p> 1) Construct a WSPD with \\(s>0\\) where the set of pairs is sorted by the minimum distance ' +
        'between the bounding-boxes of the first set of the pair \\(R(A_i)\\) and the second set of pair ' +
        '\\(R(B_i)\\) denoted as \\(|R(A_i)R(B_i)|\\). </p>' +
        '<p> 2) Compute the smallest integer \\(l\\) such that \\(\\sum{i = 1}{l} |A_i| \\cdot |B_i| \\geq k\\).</p>' +
        '<p> <strong> 3) Let \\(r\\) denote \\(|R(A_l)R(B_l)|\\). </strong> </p>' +
        '<p> 4) Compute \\(l\'\\) the number of indices for which \\(|R(A_i)R(B_i)| \\leq (1+4/s)r\\). </p>' +
        '<p> 5) Compute \\(L\\) which contains all pairs  {\\(p,q\\)} for which there is an index \\(1 \\leq i \\leq l\\) ' +
        'such that \\(p \\in A_i, q \\in B_i\\) or  \\(q \\in A_i, p \\in B_i\\)' +
        '<p> 6) Return the first \\(k\\) pairs ordered by smallest distances in \\(L\\).</p>');

steps.set('kClosestWSPDPairSelection2',
        '<p style="text-align: center;"> \\(k\\)\\(-\\)\\(ClosestPairs(P)\\) </p>' +
        '<p> 1) Construct a WSPD with \\(s>0\\) where the set of pairs is sorted by the minimum distance ' +
        'between the bounding-boxes of the first set of the pair \\(R(A_i)\\) and the second set of pair ' +
        '\\(R(B_i)\\) denoted as \\(|R(A_i)R(B_i)|\\). </p>' +
        '<p> 2) Compute the smallest integer \\(l\\) such that \\(\\sum{i = 1}{l} |A_i| \\cdot |B_i| \\geq k\\).</p>' +
        '<p> 3) Let \\(r\\) denote \\(|R(A_l)R(B_l)|\\).</p>' +
        '<p> <strong> 4) Compute \\(l\'\\) the number of indices for which \\(|R(A_i)R(B_i)| \\leq (1+4/s)r\\). </strong> </p>' +
        '<p> 5) Compute \\(L\\) which contains all pairs  {\\(p,q\\)} for which there is an index \\(1 \\leq i \\leq l\\) ' +
        'such that \\(p \\in A_i, q \\in B_i\\) or  \\(q \\in A_i, p \\in B_i\\)' +
        '<p> 6) Return the first \\(k\\) pairs ordered by smallest distances in \\(L\\).</p>');

steps.set('possibleKClosestPairs',
        '<p style="text-align: center;"> \\(k\\)\\(-\\)\\(ClosestPairs(P)\\) </p>' +
        '<p> 1) Construct a WSPD with \\(s>0\\) where the set of pairs is sorted by the minimum distance ' +
        'between the bounding-boxes of the first set of the pair \\(R(A_i)\\) and the second set of pair ' +
        '\\(R(B_i)\\) denoted as \\(|R(A_i)R(B_i)|\\). </p>' +
        '<p> 2) Compute the smallest integer \\(l\\) such that \\(\\sum{i = 1}{l} |A_i| \\cdot |B_i| \\geq k\\).</p>' +
        '<p> 3) Let \\(r\\) denote \\(|R(A_l)R(B_l)|\\).</p>' +
        '<p> 4) Compute \\(l\'\\) the number of indices for which \\(|R(A_i)R(B_i)| \\leq (1+4/s)r\\). </p>' +
        '<p> <strong> 5) Compute \\(L\\) which contains all pairs  {\\(p,q\\)} for which there is an index \\(1 \\leq i \\leq l\\) ' +
        'such that \\(p \\in A_i, q \\in B_i\\) or  \\(q \\in A_i, p \\in B_i\\) </strong> </p>' +
        '<p> 6) Return the first \\(k\\) pairs ordered by smallest distances in \\(L\\).</p>');

steps.set('kClosestPairsSelection',
        '<p style="text-align: center;"> \\(k\\)\\(-\\)\\(ClosestPairs(P)\\) </p>' +
        '<p> 1) Construct a WSPD with \\(s>0\\) where the set of pairs is sorted by the minimum distance ' +
        'between the bounding-boxes of the first set of the pair \\(R(A_i)\\) and the second set of pair ' +
        '\\(R(B_i)\\) denoted as \\(|R(A_i)R(B_i)|\\). </p>' +
        '<p> 2) Compute the smallest integer \\(l\\) such that \\(\\sum{i = 1}{l} |A_i| \\cdot |B_i| \\geq k\\).</p>' +
        '<p> 3) Let \\(r\\) denote \\(|R(A_l)R(B_l)|\\).</p>' +
        '<p> 4) Compute \\(l\'\\) the number of indices for which \\(|R(A_i)R(B_i)| \\leq (1+4/s)r\\). </p>' +
        '<p> 5) Compute \\(L\\) which contains all pairs  {\\(p,q\\)} for which there is an index \\(1 \\leq i \\leq l\\) ' +
        'such that \\(p \\in A_i, q \\in B_i\\) or  \\(q \\in A_i, p \\in B_i\\)' +
        '<p> <strong> 6) Return the first \\(k\\) pairs ordered by smallest distances in \\(L\\). </strong> </p>');

/**
 * ANN steps.
 */

steps.set('ANN',
        '<p> 1) For each point \\(p\\) in \\(P\\): <p>' +
        '<p> 1.1) Consider all such pairs of the WSPD, for which at least one of their sets ' +
        'is a singleton containing \\(p\\). </p>' +
        '<p> 1.2) For every such pair {\\(A_i, B_i\\)}, if \\(A_i =\\){\\(p\\)}, then \\(S_p = S_p \\cup B_i\\), else if ' +
        '\\(B_i =\\){\\(p\\)} then \\(S_p = S_p \\cup A_i\\).</p>' +
        '<p> 1.3) The nearest neighbor of \\(p\\) is the point in \\(S_p\\) closest to \\(p\\).</p>');

steps.set('ANNLoop',
        '<p> <strong> 1) For each point \\(p\\) in \\(P\\): </strong> <p>' +
        '<p> 1.1) Consider all such pairs of the WSPD, for which at least one of their sets ' +
        'is a singleton containing \\(p\\). </p>' +
        '<p> 1.2) For every such pair {\\(A_i, B_i\\)}, if \\(A_i =\\){\\(p\\)}, then \\(S_p = S_p \\cup B_i\\), else if ' +
        '\\(B_i =\\){\\(p\\)} then \\(S_p = S_p \\cup A_i\\).</p>' +
        '<p> 1.3) The nearest neighbor of \\(p\\) is the point in \\(S_p\\) closest to \\(p\\).</p>');

steps.set('considerWSPDPairs',
        '<p> <strong> 1) For each point \\(p\\) in \\(P\\): </strong> <p>' +
        '<p> <strong> 1.1) Consider all such pairs of the WSPD, for which at least one of their sets ' +
        'is a singleton containing \\(p\\). </strong> </p>' +
        '<p> 1.2) For every such pair {\\(A_i, B_i\\)}, if \\(A_i =\\){\\(p\\)}, then \\(S_p = S_p \\cup B_i\\), else if ' +
        '\\(B_i =\\){\\(p\\)} then \\(S_p = S_p \\cup A_i\\).</p>' +
        '<p> 1.3) The nearest neighbor of \\(p\\) is the point in \\(S_p\\) closest to \\(p\\).</p>');

steps.set('selectSingletonWSPD',
        '<p> <strong> 1) For each point \\(p\\) in \\(P\\): </strong> <p>' +
        '<p> 1.1) Consider all such pairs of the WSPD, for which at least one of their sets ' +
        'is a singleton containing \\(p\\). </p>' +
        '<p> <strong> 1.2) For every such pair {\\(A_i, B_i\\)}, if \\(A_i =\\){\\(p\\)}, then \\(S_p = S_p \\cup B_i\\), else if ' +
        '\\(B_i =\\){\\(p\\)} then \\(S_p = S_p \\cup A_i\\). </strong> </p>' +
        '<p> 1.3) The nearest neighbor of \\(p\\) is the point in \\(S_p\\) closest to \\(p\\).</p>');

steps.set('getNearestNeighbor',
        '<p> <strong> 1) For each point \\(p\\) in \\(P\\): </strong> <p>' +
        '<p> 1.1) Consider all such pairs of the WSPD, for which at least one of their sets ' +
        'is a singleton containing \\(p\\). </p>' +
        '<p> 1.2) For every such pair {\\(A_i, B_i\\)}, if \\(A_i =\\){\\(p\\)}, then \\(S_p = S_p \\cup B_i\\), else if ' +
        '\\(B_i =\\){\\(p\\)} then \\(S_p = S_p \\cup A_i\\).</p>' +
        '<p> <strong> 1.3) The nearest neighbor of \\(p\\) is the point in \\(S_p\\) closest to \\(p\\). </strong> </p>');

/**
 * t-Approx MST steps.
 */

steps.set('tApproxMST',
        '<p style="text-align: center;"> \\(t\\)\\(-\\)\\(ApproximateMinimumSpanningTree(P,t>1)\\) </p>' +
        '<p> 1) Construct a t-spanner \\(G\\) via (\\(Construct\\)\\(-\\)t\\(-\\)\\(Spanner(P,t)\\)). </p>' +
        '<p> 2) Prims(G) </p>' +
        '<p> 2.1) Select an arbitrary starting point. <p>' +
        '<p> 2.2) While the \\(|T_v| < |P|\\) select the shortest edge \\(e\\) of ' +
        '\\(G\\) with at least one vertex in \\(T\\). </p> ' +
        '<p> 2.3) If the selected edge \\(e\\) would create a cycle do not add it to \\(T\\). </p>' +
        '<p> 2.4) Otherwise add \\(e\\) to \\(T\\). </p>');

steps.set('tApproxMSTStartPoint',
        '<p style="text-align: center;"> \\(t\\)\\(-\\)\\(ApproximateMinimumSpanningTree(P,t>1)\\) </p>' +
        '<p> 1) Construct a t-spanner \\(G\\) via (\\(Construct\\)\\(-\\)t\\(-\\)\\(Spanner(P,t)\\)). </p>' +
        '<p> <strong> 2) Prims(G) </strong> </p>' +
        '<p> <strong> 2.1) Select an arbitrary starting point. </strong> <p>' +
        '<p> 2.2) While the \\(|T_v| < |P|\\) select the shortest edge \\(e\\) of ' +
        '\\(G\\) with at least one vertex in \\(T\\). </p> ' +
        '<p> 2.3) If the selected edge \\(e\\) would create a cycle do not add it to \\(T\\). </p>' +
        '<p> 2.4) Otherwise add \\(e\\) to \\(T\\). </p>');

steps.set('tApproxMSTConsidered',
        '<p style="text-align: center;"> \\(t\\)\\(-\\)\\(ApproximateMinimumSpanningTree(P,t>1)\\) </p>' +
        '<p> 1) Construct a t-spanner \\(G\\) via (\\(Construct\\)\\(-\\)t\\(-\\)\\(Spanner(P,t)\\)). </p>' +
        '<p> 2) <strong> Prims(G) </strong> </p>' +
        '<p> 2.1) Select an arbitrary starting point. <p>' +
        '<p> <strong> 2.2) While the \\(|T_v| < |P|\\) select the shortest edge \\(e\\) of ' +
        '\\(G\\) with at least one vertex in \\(T\\). </strong> </p> ' +
        '<p> 2.3) If the selected edge \\(e\\) would create a cycle do not add it to \\(T\\). </p>' +
        '<p> 2.4) Otherwise add \\(e\\) to \\(T\\). </p>');

steps.set('cycleEdge',
        '<p style="text-align: center;"> \\(t\\)\\(-\\)\\(ApproximateMinimumSpanningTree(P,t>1)\\) </p>' +
        '<p> 1) Construct a t-spanner \\(G\\) via (\\(Construct\\)\\(-\\)t\\(-\\)\\(Spanner(P,t)\\)). </p>' +
        '<p> <strong> 2) Prims(G) </strong> </p>' +
        '<p> 2.1) Select an arbitrary starting point. <p>' +
        '<p> 2.2) While the \\(|T_v| < |P|\\) select the shortest edge \\(e\\) of ' +
        '\\(G\\) with at least one vertex in \\(T\\). </p> ' +
        '<p> <strong> 2.3) If the selected edge \\(e\\) would create a cycle do not add it to \\(T\\). </strong> </p>' +
        '<p> 2.4) Otherwise add \\(e\\) to \\(T\\). </p>');

steps.set('tApproxMSTAdd',
        '<p style="text-align: center;"> \\(t\\)\\(-\\)\\(ApproximateMinimumSpanningTree(P,t>1)\\) </p>' +
        '<p> 1) Construct a t-spanner \\(G\\) via (\\(Construct\\)\\(-\\)t\\(-\\)\\(Spanner(P,t)\\)). </p>' +
        '<p> <strong> 2) Prims(G) </strong> </p>' +
        '<p> 2.1) Select an arbitrary starting point. <p>' +
        '<p> 2.2) While the \\(|T_v| < |P|\\) select the shortest edge \\(e\\) of ' +
        '\\(G\\) with at least one vertex in \\(T\\). </p> ' +
        '<p> 2.3) If the selected edge \\(e\\) would create a cycle do not add it to \\(T\\). </p>' +
        '<p> <strong> 2.4) Otherwise add \\(e\\) to \\(T\\). </strong> </p>');

// Called during animation to display the steps for the current algorithm
// and bold the current step of the algorithm.
function displaySteps(selection) {

    resetStepsBox(); // Set the header.

    stepsBox.innerHTML += steps.get(selection) // Set the steps.

    MathJax.typeset(); // Latex typeset.
}

