/**
 * Contains default stylings for board objects.
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

    if(styleID == 1)
        partitionPointStyle1.color = color;
    else if (styleID == 2)
        partitionPointStyle2.color = color;
}

// Starting and normal bounding box.
const boundingboxStandard = [-10, 10, 10, -10];

// Board specifications
const boardParams = {
    boundingbox: boundingboxStandard,
    showaxis: false,
    showcopyright: false,
};

const pointSetStyle = {
    size: 3,
    withLabel: false,
    fixed: true,
    color: '#000000'
};

const partitionPointStyle1 = {
    size: 3,
    withLabel: false,
    fixed: true,
    color: '#FFFFFF',
};

const partitionPointStyle2 = {
    size: 3,
    withLabel: false,
    fixed: true,
    color: '#FFFFFF',
};

const leafPointStyle = {
    size: 3,
    withLabel: false,
    fixed: true,
    color: '#00FF00',
};

const boundingBoxStyle = {
    fillOpacity: 0,
    hasInnerPoints: false,
    color: '#000000',
    fillColor: '#000000',
    fixed: true,
    withLabel: false,
};

const wspdCircleStyle = {
    fillOpacity: 0,
    withLabel: false,
    color: '#FFFFFF',
    fixed: true,
};

const wspdSeparationLineStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#FFFFFF',
    fixed: true,
};
