/**
 * Split tree data structure. Used in the construction of the WSPD.
 * Contains both O(n^2) and O(n log n), construction algorithms.
 * Classes included are the tree "Node" and the "SplitTree".
 * 
 * The definition of these data structures, classes, and construction algorithms
 * can be found in "Geometric Spanner Networks" by Giri Narasimhan and 
 * Michiel Smid.
 * 
 * David Wisnosky
 */

// Node class for Split tree nodes elements.
class Node {

    /**
     * S = Point set.
     * R = Rectangle bounding the points in the node.
     * v = Left node.
     * w = Right node.
     */
    constructor(S, R, v, w) {
        this.S = S;
        this.R = R;
        this.left = v;
        this.right = w;
    }
}

// Class for the split tree data structure.
class SplitTree {

    /**
     * S = Point set.
     * R = Rectangle that bounds the point set.
     */
    constructor(S, R) {
        this.root = this.computeSplitTree(S, R);
        this.R = R;
    }

    // O(n^2) algorithm.
    // Parameters: A point set, for calculation, and the bounding box for animation purposes.
    computeSplitTree(S, R) {

        // Create leaf node if only point is in the set.
        if(S.length == 1) {
            eventQueue.push(new AnimationObject('point', S[0], leafPointStyle, 'leafPoint', true)); // Highlights the point green for done. 
            return new Node(S, computeBoundingBox(S), null, null);
        }
        // Create an internal node if S has >= 2 points.
        else{
            let R = computeBoundingBox(S);

            // Animates the bounding box of the point set.
            eventQueue.push(new AnimationObject('polygon', R.vertices, boundingBoxStyle, 'boundingBox', true));

            // Split the bounding box by longest side into 2 smaller rectangles.
            let subRectangles = splitBoundingBox(R);
            let R1 = subRectangles[0];
            let R2 = subRectangles[1];

            // Animates the splitting of the bounding box of the point set.
            eventQueue.push(new AnimationObject('line', subRectangles[2], boundingBoxSplitLineStyle, 'splitBoundingBox', true));

            // Subsets partitioned from original.
            var S1 = [];
            var S2 = [];

            // Set the color of the partitions.
            setPartitionColor();
            var style1 = {};
            Object.assign(style1, partitionPointStyle);

            setPartitionColor();
            var style2 = {};
            Object.assign(style2, partitionPointStyle);

            // Partition the point set S into 2 subsets based on the sub-rectangle the point lies in.

            eventQueue.push('pointPartitionStart'); // Draws all partitioned points in one animation step.
            for(var p of S) {

                if(R1.containsPoint(p)){
                    S1.push(p);
                    eventQueue.push(new AnimationObject('point', p, style1, 'partitionHighlight', true)); // Highlights the points partitioned into R1.
                }

                else{
                    S2.push(p);
                    eventQueue.push(new AnimationObject('point', p, style2, 'partitionHighlight', true)); // Highlights the points partitioned into R2.
                }
            }

            eventQueue.push('pointPartitionEnd'); // Draws all partitioned points in one animation step.

            eventQueue.push('splitTreeRecur'); // For recursive step display.

            // Recursively call on the subsets of S.
            var v = this.computeSplitTree(S1, R1);
            var w = this.computeSplitTree(S2, R2);

            return new Node(S, R, v, w);
        }
    }

    // Finds all the internal nodes of a given split tree staring from the root.
    findInternalNodes(root=this.root, N=[]) {

        if(root.left != null && root.right != null) {
            N.push(root);
            this.findInternalNodes(root.left, N);
            this.findInternalNodes(root.right, N);
        }

        return N;
    }
}