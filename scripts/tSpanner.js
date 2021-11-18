/**
 * t-Spanner construction algorithm from the WSPD.
 * The definition of this construction algorithm can be found in 
 * "Geometric Spanner Networks" by Giri Narasimhan and Michiel Smid.
 */

// Constructs a t-spanner of a point set in O(n) time given a WSPD.
function constructTSpanner() {

    var adjacencyList = new Set();

    // For each pair take a representative point and create an edge.
    for(var pair of wspd.pairs) {
        adjacencyList.add([pair[0].S[0], pair[1].S[0]]);
    }

    return adjacencyList;
}