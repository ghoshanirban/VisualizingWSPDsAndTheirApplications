/**
 * Closest pair algorithm from the WSPD.
 * The definition of this algorithm can be found in
 * "Geometric Spanner Networks" by Giri Narasimhan and Michiel Smid.
 */

// Finds the closest pair in a point set in O(n) time given a WSPD, and a 
// t-spanner constructed from said WSPD.
function computeClosestPair() {

    var distance = Infinity;
    var closestPair = [];

    for(edge of graph) {
        
        var currentDistance = distance2D(edge[0], edge[1]);

        if(currentDistance < distance){
            closestPair[0] = edge[0];
            closestPair[1] = edge[1];

            distance = currentDistance;
        }
    }

    return closestPair;
}