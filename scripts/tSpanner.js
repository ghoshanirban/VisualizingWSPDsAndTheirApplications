/**
 * t-Spanner construction algorithm from the WSPD.
 * The definition of this construction algorithm can be found in 
 * "Geometric Spanner Networks" by Giri Narasimhan and Michiel Smid.
 * 
 * David Wisnosky
 */

// Constructs a t-spanner of a point set in O(n) time given a WSPD.
function constructTSpanner() {

    var adjacencyList = new Map();
    var edges = new Set();
    
    // For each pair take a representative point and create an edge.
    for(var pair of wspd.pairs) {
        edges.add([pair[0].S[0], pair[1].S[0]]);

        var p1 = pointSetMap.get(pair[0].S[0]);
        var p2 = pointSetMap.get(pair[1].S[0]);

        if (adjacencyList.has(p1)) {
            adjacencyList.get(p1).push(p2);
        }
        else {
            adjacencyList.set(p1, []);
            adjacencyList.get(p1).push(p2);
        }

        if (adjacencyList.has(p2)) {
            adjacencyList.get(p2).push(p1);
        }
        else {
            adjacencyList.set(p2, []);
            adjacencyList.get(p2).push(p1);
        }

        eventQueue.push(new AnimationObject('line', [pair[0].S[0], pair[1].S[0]], tSpannerLineHighlightStyle, 'tSpannerStep', true));
        eventQueue.push(new AnimationObject('line', [pair[0].S[0], pair[1].S[0]], tSpannerLineStyle, 'tSpanner', false));
    }

    eventQueue.push('ClearWSPD'); // Remove the WSPD from the board.
    eventQueue.push('ClearTemps'); // Remove the temporary items.

    return [adjacencyList, edges];
}