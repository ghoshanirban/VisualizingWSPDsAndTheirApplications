/**
 * Contains class definitions for various geometric objects.
 */

// Basic rectangle with vertices and dimensions.
class Rectangle {
    
    constructor(corners) {
        this.vertices = [corners[0], corners[1], corners[2], corners[3]]; // Clockwise from top left.
        this.length = distance2D(this.vertices[0], this.vertices[1]);
        this.width = distance2D(this.vertices[0], this.vertices[3]);
    }

    // Gets the center point coordinates of the rectangle.
    getCenter() {

        return midpoint(this.vertices[0], this.vertices[2]);
    }

    // Checks if a point lies within or on the rectangle.
    containsPoint(p) {

        if (p[0] <= this.vertices[1][0] && p[0] >= this.vertices[3][0] && p[1] <= this.vertices[1][1] && p[1] >= this.vertices[3][1])
            return true;

        return false;
    }

    // Returns the longest size of the rectangle, and its length.
    longestSide() {
        return this.length >= this.width ? ['l', this.length] : ['l', this.width];
    }

}

// Basic circle with c = center and r = radius.
class Circle {

    constructor(c, r) {
        this.center = c;
        this.radius = r;
    }
}