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
var colorIndex = 0; //Allows for fair use of colors.

function getColor() {
    return colors[colorIndex++];
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

const highlightPointStyle = {
    size: 3,
    withLabel: false,
    fixed: true,
    color: '#FF0000'
};

const boundingBoxStyle = {
    hasInnerPoints: true,
    color: '#000000'
};