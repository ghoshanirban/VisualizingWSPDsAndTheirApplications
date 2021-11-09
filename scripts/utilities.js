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

    boundsCheck(); // Check the bounds are valid before generation.
    let bounds = board.getBoundingBox();
    // Takes the absolute max of the x and y axis on the board minus some buffer.
    let xBound = Math.max(Math.abs(bounds[0]), Math.abs(bounds[2])) - 0.5; 
    let yBound = Math.max(Math.abs(bounds[1]), Math.abs(bounds[3])) - 0.5;

    var newPointSet = [];

    for (let i = 0; i < n; i++) {
        
        newPointSet.push(generateRandomPoint(xBound, yBound));
    }

    updatePointTextBox(newPointSet);
} 

// Adds generated points to the point text box for use to see.
function updatePointTextBox(newPoints) {

    var newPointsText = "";
    
    for(var point of newPoints){
        newPointsText += point[0].toFixed(3).toString() + " " + 
        point[1].toFixed(3).toString() + "\n";
    }

    pointTextBox.value = pointTextBox.value + newPointsText;
}

// Parses points entered in the text box so they can be plotted if valid.
function parseTextPoints() {

    pointSet = [];

    let textBoxInput = pointTextBox.value;
    var textPoints = textBoxInput.split(/\s|\t|\n/);

    for (let i = 0; i < textPoints.length; i+=2) {
        var xCord = parseFloat(textPoints[i]);
        var yCord = parseFloat(textPoints[i + 1]);

        if (isFinite(xCord) && isFinite(yCord))
            pointSet.push([xCord, yCord]);
    }
}

