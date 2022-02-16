/**
 * Contains algorithm for the construction of the WSPD geometric object.
 * 
 * The definition of these data structures, classes, and construction algorithms
 * can be found in "Geometric Spanner Networks" by Giri Narasimhan and
 * Michiel Smid.
 * 
 * David Wisnosky
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
        this.constructWSPD(T);
        eventQueue.push('ClearTemps'); // Clear all the intermediate step animations.
    }

    // Constructs the WSPD by finding all separated pairs of the split tree.
    constructWSPD(T) {

        let internalNodes = T.findInternalNodes();

        eventQueue.push('findPairsInternalNodes'); // Used to show internal node step.

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
            var d = distanceBetweenBoundingBoxes(v.R, w.R); // Used in k-closest pairs.
            this.pairs.push([v,w,d]);
        }

        // Compute node with larger longest side, and recur on that subtree.
        else if (v.R.longestSide()[1] <= w.R.longestSide()[1]) {
            let wLeft = w.left;
            let wRight = w.right;
            this.findPairs(v, wLeft);
            this.findPairs(v, wRight);

            eventQueue.push('findPairsRecur'); // Used to show find pair recur step.
        }
        else {
            let vLeft = v.left;
            let vRight = v.right;
            this.findPairs(vLeft, w);
            this.findPairs(vRight, w);

            eventQueue.push('findPairsRecur'); // Used to show find pair recur step.
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

        // Set the color of the animation objects.
        wspdCircleStyle.color = getColor();
        var style1 = {};
        Object.assign(style1, wspdCircleStyle);

        wspdConnectionLineStyle.color = wspdCircleStyle.color;
        var style2 = {};
        Object.assign(style2, wspdConnectionLineStyle);

        // Animations for the well-separated check. Could be non-temporary so they are not added yet.
        let animationCircle1 = new AnimationObject('circle', [C1.center, v.R.vertices[0]], 
            style1, 'wellSeparatedCheck', true);
        let animationCircle2 = new AnimationObject('circle', [C2.center, w.R.vertices[0]], 
            style1, 'wellSeparatedCheck', true);
        let animationLine = new AnimationObject('line', 
            calculateCircleConnectionLine(C1.center, v.R.vertices[0], C2.center, w.R.vertices[0]), 
            style2, 'wellSeparatedCheck', true);

        // Compute the distance between the bounding circles.
        let distanceC1ToC2 = distance2D(C1.center, C2.center) - C1.radius - C2.radius;

        // If the pair is well-separated keep the AnimationObjects on the board and return true.
        if (distanceC1ToC2 >= s*maxRadius) {

            // Set the AnimationObjects as non-temporary.
            animationCircle1.isTemporary = false;
            animationCircle2.isTemporary = false;
            animationLine.isTemporary = false;

            // Adds the AnimationObjects to the animation event queue.
            eventQueue.push(animationCircle1);
            eventQueue.push(animationCircle2);
            eventQueue.push(animationLine);

            return true;
        }
        return false;
    }
}