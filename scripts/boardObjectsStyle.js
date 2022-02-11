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
    color: '#000000',
    name: "",
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
    borders : {
        color: '#000000',
    },
    fillOpacity: 0,
    hasInnerPoints: false,
    fillColor: '#000000',
    fixed: true,
    withLabel: false,
    withLines: true,
    vertices: {
        visible: false,
    },
};

// Style for bounding box split line.
let boundingBoxSplitLineStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#000000',
    fixed: true,
    strokeWidth: 5,
};

// Style for WSPD circles if needed.
let wspdCircleStyle = {
    fillOpacity: 0,
    withLabel: false,
    color: '#FFFFFF',
    fixed: true,
    center: {
        visible: false,
    },
    midpoint: {
        visible: false,
    },
    point2: {
        visible: false,
    }
};

// Style for line connecting WSPD pairs.
let wspdConnectionLineStyle = {
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
};

// Style to highlight a t-Spanner edge to contrast with the WSPD.
let tSpannerLineHighlightStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#00FF00',
    fixed: true,
    strokeWidth: 5,
};

// Style to highligh potential closest pair points.
let closestPairHighlightStyle = {
    size: 7,
    withLabel: false,
    fixed: true,
    face: 'square',
    color: '#FF0000',
};

// Style to highlight a potential closest pair line.
let closestPairLineHighlightStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#FF0000',
    fixed: true,
    strokeWidth: 7,
};

// Style to highligh the closest pair points.
let closestPairStyle = {
    size: 7,
    withLabel: false,
    fixed: true,
    face: 'square',
    color: '#00FF00',
};

// Style to highlight the closest pair.
let closestPairLineStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#00FF00',
    fixed: true,
    strokeWidth: 5,
};

// Style for t-Approx MST start point.
let tApproxMSTStartPointStyle = {
    size: 5,
    withLabel: false,
    fixed: true,
    color: '#0000FF',
};

// Style for t-Approx MST considered points.
let tApproxMSTConsideredPointStyle = {
    size: 3,
    withLabel: false,
    fixed: true,
    color: '#009999',
};

// Style for t-Approx MST considered line.
let tApproxMSTConsideredLineStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#009999',
    fixed: true,
    strokeWidth: 5,
}

// Style for a t-Approx MST selected point.
let tApproxMSTSelectedPointStyle = {
    size: 5,
    withLabel: false,
    fixed: true,
    color: '#00FF00',
}

// Style for selected lines in the t-Approx MST.
let tApproxMSTSelectedLineStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#00FF00',
    fixed: true,
}

// Style fot the lth WSPD circle selection in kClosestPairs.
let kClosestLthWSPDCircleHighlightStyle = {
    fillOpacity: 0,
    strokeWidth: 7,
    withLabel: false,
    color: '#0000FF',
    fixed: true,
    center: {
        visible: false,
    },
    midpoint: {
        visible: false,
    },
    point2: {
        visible: false,
    }
};

// Style fot the lth WSPD connection line selection in kClosestPairs.
let kClosestLthWSPDConnectionLineHighlightStyle = {
    strokeWidth: 7,
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#0000FF',
    fixed: true,
};

// Style fot the lth WSPD pair, if a point is in a singleton 
// set selection, in kClosestPairs.
let kClosestLthWSPDSingletonPointHighlightStyle = {
    size: 7,
    withLabel: false,
    fixed: true,
    color: '#0000FF',
};

// Style for the bounding boxes of the lth WSPD pair in kClosestPairs.
let kClosestLthBoundingBoxStyle = {
    borders: { 
        strokeWidth: 7,
        color: '#FF0000',
    },
    fillOpacity: 0,
    hasInnerPoints: false,
    fillColor: '#000000',
    fixed: true,
    withLabel: false,
    withLines: true,
    vertices: {
        visible: false,
    }
};

// Style for the shortest line between the bounding boxes of the lth WSPD
// pair in kClosestPairs.
let kClosestLthConnectionLineHighlightStyle = {
    strokeWidth: 7,
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#FF0000',
    fixed: true,
};

// Style for a WSPD pair circle who's points are valid for the 
//k-closest pairs.
let kClosestWSPDCircleHighlightStyle2 = {
    strokeWidth: 7,
    fillOpacity: 0,
    withLabel: false,
    color: '#009999',
    fixed: true,
};

// Style for a WSPD pair connection line who's points are valid for 
//the k-closest pairs.
let kClosestWSPDConnectionLineHighlightStyle2 = {
    strokeWidth: 7,
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#009999',
    fixed: true,
};

// Style to highlight the potential k-closest pairs.
let kClosestPairsHighlightStyle = {
    size: 7,
    withLabel: false,
    fixed: true,
    color: '#00AA66',
};

// Style to highlight a potential closest pair line.
let kClosestPairsLineHighlightStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#00AA66',
    fixed: true,
    strokeWidth: 7,
};

// Style to highligh the k-closest pairs points.
let kClosestPairStyle = {
    size: 7,
    withLabel: false,
    fixed: true,
    face: 'square',
    color: '#00FF00',
};

// Style to highlight the k-closest pairs lines.
let kClosestPairLineStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#00FF00',
    fixed: true,
    strokeWidth: 5,
};


// Style for line connecting ANN pairs.
let ANNSeparationLineStyle = {
    withLabel: false,
    straightFirst: false,
    straightLast: false,
    color: '#FFFFFF',
    fixed: true,
};

let pointSetStyleANNNode1 = {
    size: 3,
    withLabel: false,
    fixed: true,
    color: '#FF0000'
};

let pointSetStyleANNNode2 = {
    size: 3,
    withLabel: false,
    fixed: true,
    color: '#0000FF'
};


