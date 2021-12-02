/**
 * Construction of a  t-approximate minimum spanning tree of a point set.
 * The definition of this construction algorithm can be found in
 * "Geometric Spanner Networks" by Giri Narasimhan and Michiel Smid.
 */

// Computes a t-approximate MST of a point set, based on the t-spanner of the WSPD.
function computeApproxMST() {
    
    // Calls prims MST algorithm on the t-spanner.
    let mst = prim(graph, pointSet.length);

    return mst;
}

