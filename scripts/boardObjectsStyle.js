/**
 * Contains default stylings for board objects.
 * 
 * David Wisnosky
 */

// Colors to select from for WSPD visual.
const colors = [
    '#FF0000', '#FF006F', '#DC00C9', '#4A62FF', '#0082FF', '#008BE4',
    '#00FF00', '#00EA71', '#00D0B2', '#00B4E7', '#0097FF', '#0076FF',
    '#0000FF', '#0066FF', '#008DFF', '#00A6FF', '#00BBE7', '#00CE9A',
    '#FFFF00', '#ABEA0D', '#4DD12D', '#00B444', '#009655', '#007861',
    '#FF00FF', '#6A69FF', '#0087FF', '#008EFF', '#0088D8', '#007B83',
    '#00FFFF', '#00DCFF', '#55B4FC', '#8A8BD4', '#9D649B', '#924660',

];

var colorSet = 0;

// Gets the next color available.
function getColor() {
    i = Math.floor(Math.random() * 6) + colorSet % 36;

    colorSet += 6;

    return colors[i];
}

// Sets a color for partition point visual.
function setPartitionColor(styleID) {
    
    // Red '#FF0000' reserved for polygon. Green '#00FF00' is reserved for leaf nodes.
    var color = '#FF0000';
    while (color == '#FF0000' || color == '#00FF00') {
        color = getColor();
    }

    partitionPointStyle.color = color;
}

// Starting and normal bounding box.
let boundingboxStandard = [-10, 10, 10, -10];

// Board specifications
let boardParams = {
    boundingbox: boundingboxStandard,
    showaxis: false,
    showcopyright: false,
};

// Basic point.
let pointSetStyle = {
    size: 3,
    withLabel: false,
    fixed: true,
    color: '#000000'
};

// Random color for split tree partitioning.
let partitionPointStyle = {
    size: 3,
    withLabel: false,
    fixed: true,
    color: '#FFFFFF',
};

// Split tree leaf node (point) style.
let leafPointStyle = {
    size: 3,
    withLabel: false,
    fixed: true,
    color: '#00FF00',
};

// Style for bounding boxes.
let boundingBoxStyle = {
    fillOpacity: 0,
    hasInnerPoints: false,
    color: '#000000',
    fillColor: '#000000',
    fixed: true,
    withLabel: false,
    vertices: {
        visible: false,
    }
};

// Style for WSPD circles if needed.
let wspdCircleStyle = {
    fillOpacity: 0,
    withLabel: false,
    color: '#FFFFFF',
    fixed: true,
};

// Style for line connecting WSPD pairs.
let wspdSeparationLineStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#FFFFFF',
    fixed: true,
};

// Style for lines in the t-Spanner.
let tSpannerLineStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#000000',
    fixed: true,
}

// Style to highlight a t-Spanner edge to contrast with the WSPD.
let tSpannerLineHighlightStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#00FF00',
    fixed: true,
    strokeWidth: 5,
}

// Style to highligh the closest pair points.
let closestPairStyle = {
    size: 7,
    withLabel: false,
    fixed: true,
    face: 'square',
    color: '#00FF00',
}

// Style to highligh potential closest pair points.
let closestPairHighlightStyle = {
    size: 7,
    withLabel: false,
    fixed: true,
    face: 'square',
    color: '#FF0000',
}

// Style to highlight the closest pair.
let closestPairLineStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#00FF00',
    fixed: true,
    strokeWidth: 5,
}

// Style to highlight a potential closest pair.
let closestPairLineHighlightStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#FF0000',
    fixed: true,
    strokeWidth: 7,
}


