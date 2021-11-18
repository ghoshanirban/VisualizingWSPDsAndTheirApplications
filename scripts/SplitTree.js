/**
 * Split tree data structure. Used in the construction of the WSPD.
 * Contains both O(n^2) and O(n log n), construction algorithms.
 * Classes included are the tree "Node" and the "SplitTree".
 * 
 * The definition of these data structures, classes, and construction algorithms
 * can be found in "Geometric Spanner Networks" by Giri Narasimhan and 
 * Michiel Smid.
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
        this.root = this.computeSplitTree(S);
        this.R = R;
        console.log(this.root);
    }

    // O(n^2) algorithm.
    computeSplitTree(S) {

        // Create leaf node if only point is in the set.
        if(S.length == 1) {
            return new Node(S, computeBoundingBox(S), null, null);
        }
        // Create an internal node if S has >= 2 points.
        else{
            let R = computeBoundingBox(S);

            // Split the bounding box by longest side into 2 smaller rectangles.
            let subRectangles = splitBoundingBox(R);
            let R1 = subRectangles[0];
            let R2 = subRectangles[1];

            var S1 = [];
            var S2 = [];

            // Partition the point set S into 2 subsets based on the sub-rectangle the point lies in.
            for(var p of S) {

                if(R1.containsPoint(p))
                    S1.push(p);
                else
                    S2.push(p);
            }

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