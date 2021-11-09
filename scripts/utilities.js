/**
 * Miscellaneous functions.
 */

// Generates a random point with in an x and y bound.
function generateRandomPoint(xBound, yBound){

    var xSign = Math.floor(Math.random() * 2);
    var ySign = Math.floor(Math.random() * 2);

    xSign = (xSign == 0) ? 1 : -1;
    ySign = (ySign == 0) ? 1 : -1;

    return[xSign * Math.random() * xBound, ySign * Math.random() * yBound];
}

// Creates a point set of size n and stores it in the pointSet global.
function generateRandomPointSet() {
    
    let n = numPointsEntry.value;

    // Restricted to 100 points.
    if (pointSet.length + n > 100){
        n = 100 - pointSet.length;
        alert("100 points maximum, points will be truncated.");
    }


    let bounds = board.getBoundingBox()
    // Takes the absolute max of the x and y axis on the board minus some buffer.
    let xBound = Math.max(Math.abs(bounds[0]), Math.abs(bounds[2])) - 0.5; 
    let yBound = Math.max(Math.abs(bounds[1]), Math.abs(bounds[3])) - 0.5;

    for (let i = 0; i < n; i++) {
        
        pointSet.push(generateRandomPoint(xBound, yBound));
    }
} 

