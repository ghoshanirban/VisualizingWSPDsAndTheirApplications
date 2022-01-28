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
        
        // Get current considered points distance.
        var currentDistance = distance2D(edge[0], edge[1]);

        // New closest pair found.
        if(currentDistance < distance){
            closestPair[0] = edge[0];
            closestPair[1] = edge[1];

            // Clear old possible closest pair.
            eventQueue.push('ClearTemps')

            // Add new possible closest pair and path connecting them.
            let P1 = closestPair[0];
            let P2 = closestPair[1];
            eventQueue.push(new AnimationObject('point', P1, closestPairHighlightStyle, 'possibleClosestPair', true));
            eventQueue.push(new AnimationObject('point', P2, closestPairHighlightStyle, 'possibleClosestPair', true));
            eventQueue.push(new AnimationObject('line', [P1,P2], closestPairLineHighlightStyle, 'possibleClosestPair', true));

            distance = currentDistance;
        }
    }

    
    // Add closest final closest pair.
    eventQueue.push(new AnimationObject('point', closestPair[0], closestPairStyle, 'closestPair', false));
    eventQueue.push(new AnimationObject('point', closestPair[1], closestPairStyle, 'closestPair', false));
    eventQueue.push(new AnimationObject('line', closestPair, closestPairLineStyle, 'closestPair', false));

    // Clear all temporaries.
    eventQueue.push('ClearTemps');

    return closestPair;
}