/**
 * Contains algorithm for the construction of the WSPD geometric object.
 * 
 * The definition of these data structures, classes, and construction algorithms
 * can be found in "Geometric Spanner Networks" by Giri Narasimhan and
 * Michiel Smid.
 */

// Class for the WSPD object.
class WSPD {

    /**
     * T = Split tree of the point set S.
     * s = Separation factor.
     */
    constructor(T, s) {
        this.s = s;
        this.pairs = [];
        this.computeWSPD(T);
    }

    // Constructs the WSPD by finding all separated pairs of the split tree.
    computeWSPD(T) {

        let internalNodes = T.findInternalNodes();

        // Loop through all internal nodes and check if they are well-separated.
        for(var u of internalNodes) {
            let v = u.left;
            let w = u.right;
            this.findPairs(v,w);
        }
    }

    // Computes if v and w are well separated, if not their child nodes are checked recursively.
    findPairs(v,w) {

        // Nodes are well separated add as a valid pair.
        if(isWellSeparated(v, w, this.s)) {
            this.pairs.push([v,w]);
        }
        else if (v.R.longestSide()[1] <= w.R.longestSide()[1]) {
            let wLeft = w.left;
            let wRight = w.right;
            this.findPairs(v, wLeft);
            this.findPairs(v, wRight);
        }
        else {
            let vLeft = v.left;
            let vRight = v.right;
            this.findPairs(vLeft, w);
            this.findPairs(vRight, w);
        }
    }
}

// Checks if two given point sets are well-separated with respect to s. 
// shape = 0 uses a circle as the containing shape shape = 1 uses a rectangle.
function isWellSeparated(v, w, s, shape=0) {
    
    // Use circles.
    if(shape == 0) {

        // Given a point set create a circle containing the points via the bounding box.
        var C1 = new Circle(v.R.getCenter(), distance2D(v.R.getCenter(), v.R.vertices[0]));
        var C2 = new Circle(w.R.getCenter(), distance2D(w.R.getCenter(), w.R.vertices[0]));

        // Find the circle with the maximum radius.
        let maxRadius = Math.max(C1.radius, C2.radius);

        // Create new bounding circles with the maximum radius.
        C1 = new Circle(C1.center, maxRadius);
        C2 = new Circle(C2.center, maxRadius);

        // Compute the distance between the bounding circles.
        let distanceC1ToC2 = distance2D(C1.center, C2.center) - C1.radius - C2.radius;

        return distanceC1ToC2 >= s*maxRadius;
    }
}