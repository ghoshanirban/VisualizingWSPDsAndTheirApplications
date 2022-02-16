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

    for(edge of graphEdges) {

        let P1 = edge[0];
        let P2 = edge[1];

        // Highlight current checked edge.
        eventQueue.push(new AnimationObject('point', P1, closestPairPotentialHighlightStyle, 'possibleClosestPair', true));
        eventQueue.push(new AnimationObject('point', P2, closestPairPotentialHighlightStyle, 'possibleClosestPair', true));
        eventQueue.push(new AnimationObject('line', [P1, P2], closestPairPotentialLineHighlightStyle, 'possibleClosestPair', true));

        // Get current considered points distance.
        var currentDistance = distance2D(edge[0], edge[1]);

        // New closest pair found.
        if(currentDistance < distance){
            closestPair[0] = P1
            closestPair[1] = P2;

            // Clear checked edge.
            eventQueue.push('ClearOldClosest');

            eventQueue.push(new AnimationObject('point', P1, closestPairHighlightStyle, 'currentPossibleClosestPair', false));
            eventQueue.push(new AnimationObject('point', P2, closestPairHighlightStyle, 'currentPossibleClosestPair', false));
            eventQueue.push(new AnimationObject('line', [P1, P2], closestPairLineHighlightStyle, 'currentPossibleClosestPair', false));

            distance = currentDistance;
        }

        eventQueue.push('ClearTemps');
    }

    
    // Add closest final closest pair.
    eventQueue.push(new AnimationObject('point', closestPair[0], closestPairStyle, 'closestPairReturn', false));
    eventQueue.push(new AnimationObject('point', closestPair[1], closestPairStyle, 'closestPairReturn', false));
    eventQueue.push(new AnimationObject('line', closestPair, closestPairLineStyle, 'closestPairReturn', false));

    // Clear all temporaries.
    eventQueue.push('ClearTemps');

    return closestPair;
}