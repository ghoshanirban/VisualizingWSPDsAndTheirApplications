/**
 * Construction of a  t-approximate minimum spanning tree of a point set.
 * The definition of this construction algorithm can be found in
 * "Geometric Spanner Networks" by Giri Narasimhan and Michiel Smid.
 */

// Computes a t-approximate MST of a point set, based on the t-spanner of the WSPD.
function tApproximateMinimumSpanningTree() {
    
    // Calls prims MST algorithm on the t-spanner.
    let mst = animatedPrim(graphEdges, pointSet.length);

    return mst;
}

// Prim's MST algorithm.
function animatedPrim(G, n) {

    // Convert the set to an array for sorting by edge weight.
    let GPrime = Array.from(G);

    // Sort the graph by edge weight.
    GPrime.sort(function (a, b) { return distance2D(a[0], a[1]) - distance2D(b[0], b[1]) });

    // Select the first vertex in the sorted set to be the arbitrary start.
    let r = GPrime[0][0];
    eventQueue.push(new AnimationObject('point', r, tApproxMSTStartPointStyle, 'tApproxMSTStartPoint', true)); // Highlight the start point.
    // Highlight the start point to permanent color.
    eventQueue.push(new AnimationObject('point', r, tApproxMSTSelectedPointStyle, 'tApproxMSTPoint', false)); 

    // Prims algorithm iterations.
    var A = new Set();
    A.add(r);
    T = new Set();
    let index = 0;

    // While all vertices have not been connected, find the shortest edge such that a new vertex is added to A.
    while (A.size != n) {

        let v = GPrime[index][0];
        let w = GPrime[index][1];
        // Highlight the considered points and edge.
        eventQueue.push(new AnimationObject('point', v, tApproxMSTConsideredPointStyle, 'tApproxMSTConsideredPoint', true)); 
        eventQueue.push(new AnimationObject('point', w, tApproxMSTConsideredPointStyle, 'tApproxMSTConsideredPoint', true));
        eventQueue.push(new AnimationObject('line', [v, w], tApproxMSTConsideredLineStyle, 'tApproxMSTConsideredLine', true));
        if (A.has(v) && !A.has(w)) {
            A.add(w); // Add the vertex.
            T.add(GPrime[index]); // Add the edge to the MST.

            // Permanently highlight the new t-Approx MST point and edge.
            eventQueue.push(new AnimationObject('point', w, tApproxMSTSelectedPointStyle, 'tApproxMSTPoint', false));
            eventQueue.push(new AnimationObject('line', GPrime[index], tApproxMSTSelectedLineStyle, 'tApproxMSTEdge', false));

            GPrime.splice(index, 1); // Remove the edge, from the sorted set.
            index = 0;
        }
        else if (A.has(w) && !A.has(v)) {
            A.add(v); // Add the vertex.
            T.add(GPrime[index]); // Add the edge to the MST.

            // Permanently highlight the new t-Approx MST point and edge.
            eventQueue.push(new AnimationObject('point', v, tApproxMSTSelectedPointStyle, 'tApproxMSTPoint', false));
            eventQueue.push(new AnimationObject('line', GPrime[index], tApproxMSTSelectedLineStyle, 'tApproxMSTEdge', false));

            GPrime.splice(index, 1); // Remove the edge, from the sorted set.
            index = 0;
        }

        else{
            index++; // Minimum edge is not yet valid check the next edge.
        }

        // Removed considered point and edge highlights.
        eventQueue.push('ClearTemps');
    }

    return T;
}