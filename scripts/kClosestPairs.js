/**
 * Calculation of the k-closest pairs algorithm from the WSPD.
 * The definition of this construction algorithm can be found in
 * "Geometric Spanner Networks" by Giri Narasimhan and Michiel Smid.
 * 
 * David Wisnosky
 */

// Computes the k-closest pairs in a point set via the WSPD.
function computeKClosestPairs(k) {
    
    var l = 0;
    let sumL = 0;

    // Sum the product of the cardinality of the first l pairs such that the sum is < k. 
    // (The cardinality of a pair is the number of points in it)
    for (var pair of wspd.pairs) {
        sumL += pair[0].S.length * pair[1].S.length;

        // Given a point set create a circle containing the points via the bounding box.
        var C1 = new Circle(pair[0].R.getCenter(), distance2D(pair[0].R.getCenter(), pair[0].R.vertices[0]));
        var C2 = new Circle(pair[1].R.getCenter(), distance2D(pair[1].R.getCenter(), pair[1].R.vertices[0]));

        // Find the circle with the maximum radius.
        let maxRadius = Math.max(C1.radius, C2.radius);

        // Clear previous lth WSPD pair.
        eventQueue.push('ClearTemps');

        // Animations for the possible selected lth WSPD. 
        eventQueue.push(new AnimationObject('circle', [C1.center, pair[0].R.vertices[0]],
            kClosestLthWSPDCircleHighlightStyle, 'kClosestWSPDPairSelection', true));
        eventQueue.push(new AnimationObject('circle', [C2.center, pair[1].R.vertices[0]],
            kClosestLthWSPDCircleHighlightStyle, 'kClosestWSPDPairSelection', true));
        eventQueue.push(new AnimationObject('line',
            calculateCircleConnectionLine(C1.center, pair[0].R.vertices[0], C2.center, pair[1].R.vertices[0]),
            kClosestLthWSPDConnectionLineHighlightStyle, 'kClosestWSPDPairSelection', true));

        // Animates the point if the point set of the one element of a WSPD pair is singleton. 
        if (pair[0].S.length == 1)
            eventQueue.push(new AnimationObject('point', pair[0].S[0], 
                kClosestLthWSPDSingletonPointHighlightStyle, 'kClosestWSPDPairSelection', true))
        if (pair[1].S.length == 1)
            eventQueue.push(new AnimationObject('point', pair[1].S[0],
                kClosestLthWSPDSingletonPointHighlightStyle, 'kClosestWSPDPairSelection', true))

        l++;

        if(sumL >= k) // lth index found
            break;
    }

    // Geth the lth pair and compute the minimum distance between their bounding boxes.
    let Al = wspd.pairs[l-1][0];
    let Bl = wspd.pairs[l-1][1];
    let r = distanceBetweenBoundingBoxes(Al.R, Bl.R);

    eventQueue.push('ClearTemps');

    // Animate the lth pairs bounding box and connection line.
    eventQueue.push(new AnimationObject('polygon', Al.R.vertices, 
        kClosestLthBoundingBoxStyle, 'kCLosestBoundingBox', true))
    eventQueue.push(new AnimationObject('polygon', Bl.R.vertices,
        kClosestLthBoundingBoxStyle, 'kCLosestBoundingBox', true))
    eventQueue.push(new AnimationObject('line', calculateRectangleConnectionLine(Al.R, Bl.R), 
        kClosestLthConnectionLineHighlightStyle, 'kCLosestBoundingBox', true));

    eventQueue.push('ClearTemps');

    var lPrime = 0;
    var lPrimeS = [];

    // Find the index lPrime such that the distance between the ith pairs bounding box is <=
    // (1 + (4 /s) * r).
    for (var pair of wspd.pairs) {

        if (distanceBetweenBoundingBoxes(pair[0].R, pair[1].R) <= (1 + (4 / wspd.s) * r)) {
            lPrime ++;
            lPrimeS.push(pair);

            // Given a point set create a circle containing the points via the bounding box.
            var C1 = new Circle(pair[0].R.getCenter(), distance2D(pair[0].R.getCenter(), pair[0].R.vertices[0]));
            var C2 = new Circle(pair[1].R.getCenter(), distance2D(pair[1].R.getCenter(), pair[1].R.vertices[0]));

            // Find the circle with the maximum radius.
            let maxRadius = Math.max(C1.radius, C2.radius);

            // Animations for the WSPD pairs with valid points for the k closest pairs.
            eventQueue.push(new AnimationObject('circle', [C1.center, pair[0].R.vertices[0]],
                kClosestWSPDCircleHighlightStyle2, 'kClosestWSPDPairSelection2', true));
            eventQueue.push(new AnimationObject('circle', [C2.center, pair[1].R.vertices[0]],
                kClosestWSPDCircleHighlightStyle2, 'kClosestWSPDPairSelection2', true));
            eventQueue.push(new AnimationObject('line',
                calculateCircleConnectionLine(C1.center, pair[0].R.vertices[0], C2.center, pair[1].R.vertices[0]),
                kClosestWSPDConnectionLineHighlightStyle2, 'kClosestWSPDPairSelection2', true));
        }
    }

    var L = [];

    // Compute the set L which contains all pairs for which the index i <= lPrime.
    for (var i = 0; i < lPrime; i++) {
        var Ai = lPrimeS[i][0]//wspd.pairs[i][0];
        var Bi = lPrimeS[i][1]//wspd.pairs[i][1];

        // For each element p of Ai and each element q of Bi add this pair to L.
        for(var p of Ai.S){
            for (var q of Bi.S){
                L.push([p,q]);

                // Animate the possible k-closest point pairs selected and their connection line. 
                eventQueue.push(new AnimationObject('point', p, kClosestPairsHighlightStyle, 
                    'possibleKClosestPairs', true));
                eventQueue.push(new AnimationObject('point', q, kClosestPairsHighlightStyle,
                    'possibleKClosestPairs', true));
                eventQueue.push(new AnimationObject('line', [p, q], kClosestPairsLineHighlightStyle,
                    'possibleKClosestPairs', true));

            }
        }
    }

    eventQueue.push('ClearKClosestSelectedWSPD')
    
    // Sort L by shortest distance.
    L.sort(function (a, b) { return distance2D(a[0], a[1]) - distance2D(b[0], b[1]) });

    var K = [];

    // Select the first k elements for L i.e. the k closest pairs.
    for (var i = 0; i < k; i++) {
        K.push(L[i]);

        // Animate the  k-closest point pairs selected and their connection line. 
        eventQueue.push(new AnimationObject('point', L[i][0], kClosestPairStyle,
            'kClosestPairsSelection', false));
        eventQueue.push(new AnimationObject('point', L[i][1], kClosestPairStyle,
            'kClosestPairsSelection', false));
        eventQueue.push(new AnimationObject('line', [L[i][0], L[i][1]], kClosestPairLineStyle,
            'kClosestPairsSelection', false));
    }

    eventQueue.push('ClearTemps');

    return K;
}