/**
 * Calculation of the k-closest pairs algorithm from the WSPD.
 * The definition of this construction algorithm can be found in
 * "Geometric Spanner Networks" by Giri Narasimhan and Michiel Smid.
 */

function computeKClosestPairs(k) {
    
    var l = 0;
    let sumL = 0;

    for (var pair of wspd.pairs) {
        sumL += pair[0].S.length + pair[1].S.length;

        l++;

        if(sumL >= k)
            break;
    }

    let Al = wspd.pairs[l-1][0];
    let Bl = wspd.pairs[l-1][1];

    let r = distanceBetweenBoundingBoxes(Al.R, Bl.R);

    var lPrime = 0;

    for (var pair of wspd.pairs) {

        if (distanceBetweenBoundingBoxes(pair[0].R, pair[1].R) <= (1 + 4 / wspd.s) * r) {
            lPrime ++;
        }
    }

    var L = [];

    for (var i = 0; i < lPrime; i++) {
        var Ai = wspd.pairs[i][0];
        var Bi = wspd.pairs[i][1];

        for(var p of Ai.S){
            for (var q of Bi.S){
                L.push([p,q]);
            }
        }
    }
    
    L.sort(function (a, b) { return distance2D(a[0], a[1]) - distance2D(b[0], b[1]) });

    var K = [];

    for (var i = 0; i < k; i++) {
        K.push(L[i]);
    }

    return K;
}