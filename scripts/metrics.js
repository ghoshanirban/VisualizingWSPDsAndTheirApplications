/**
 * Metrics calculation and display functions.
 * 
 * David Wisnosky
 */

// Base metrics box text.
var baseMetricsBoxInnerHTML = metricsBox.innerHTML;

// Resets the metrics box text for new metrics.
function resetMetricsBox() {
    metricsBox.innerHTML = baseMetricsBoxInnerHTML;
}

function populateMetrics(selection) {

    resetMetricsBox();

    var metricsData = '';
    
    if (selection == 'WSPD') {

        metricsData += '<span class="metric">\\(|S|:' + getPointsetCardinality(pointSet) +'\\)</span>';
        metricsData += '<span class="metric">\\(s:' + getWSPDSeparationFactor(wspd) + '\\) </span>'
        metricsData += '<span class="metric">\\(|m|:' + getWSPDPairsCardinality(wspd.pairs) + '\\)</span> <br>';
        metricsData += '<span class="metric">\\(Points:\\)</span>';
        metricsData += '<span class="metric">\\(WSPD Pairs:\\)</span> <br>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getPointIDs(pointSet, pointSetMap) + '</textarea>';
        metricsData += '<span> &nbsp </span>'
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getWSPDPairs(wspd) + '</textarea>';
    }

    else if (selection == 'tSpanner') {
        
        metricsData += '<span class="metric">\\(t:' + floydWarshall(pointSet, graph) + '\\)</span>';
    }

    else if (selection == 'ANN') {
        metricsData += '<span class="metric">\\(|S|:' + getPointsetCardinality(pointSet) + '\\)</span>';
        metricsData += '<span class="metric">\\(s:' + getWSPDSeparationFactor(wspd) + '\\) </span>'
        metricsData += '<span class="metric">\\(|m|:' + getANNPairsCardinality(ANNList) + '\\)</span> <br>';
        metricsData += '<span class="metric">\\(Points:\\)</span>';
        metricsData += '<span class="metric">\\(ANN Pairs:\\)</span> <br>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getPointIDs(pointSet, pointSetMap) + '</textarea>';
        metricsData += '<span> &nbsp </span>'
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getANNPairs(ANNList) + '</textarea>';
    }


    metricsBox.innerHTML += metricsData;

    MathJax.typeset();
}


// Returns |S|.
function getPointsetCardinality(S) {
    return S.length;
}

// Returns a string with points matched to their IDs.
function getPointIDs(S, m) {

    var pointsString = ''

    for (point of S) {

        pointsString += m.get(point) + ': ' + '(' + point + ')' + '\n';
    }

    return pointsString;
} 

// Returns m.
function getWSPDPairsCardinality(wspdPairs) {
    return wspdPairs.length;
}

// Returns s.
function  getWSPDSeparationFactor(W) {
    return W.s;
}

// Returns the WSPD pairs as a string.
function getWSPDPairs(W) {

    var pairsString = '{';

    for (pair of W.pairs) {

        pairsString += '{';

        for (point of pair[0].S) {
            pairsString += pointSetMap.get(point) + ',';
        }

        pairsString = pairsString.substring(0, pairsString.length - 1);
        pairsString += '},{';

        for (point of pair[1].S) {
            pairsString += pointSetMap.get(point) + ',';
        }

        pairsString = pairsString.substring(0, pairsString.length - 1);
        pairsString += '}}\n';
    }

    return pairsString;
}

// Returns |E|.
function getGraphEdgesCardinality(G) {
    return G.size;
}



// Creates a complete graph from a point set.
function generateCompleteGraph(S) {

    var G = new Set();

    for (let i = 0; i < S.length; i++) {
        u = S[i];
        for (let j = i + 1; j < S.length; j++) {
            v = S[j];
            G.add([u, v]);
        }
    }

    return G;
}

// Iterate over all edges in a graph and compute their total weight.
function computeGraphWeight(G) {

    var weight = 0;

    for (var edge of G) {
        weight += distance2D(edge[0], edge[1]);
    }

    return weight;
}

// Prim's MST algorithm.
function prim(G, n) {

    // Convert the set to an array for sorting by edge weight.
    let GPrime = Array.from(G);

    // Sort the graph by edge weight.
    GPrime.sort(function (a, b) { return distance2D(a[0], a[1]) - distance2D(b[0], b[1]) });

    // Select the first vertex in the sorted set to be the arbitrary start.
    let r = GPrime[0][0];

    // Prims algorithm iterations.
    var A = new Set();
    A.add(r);
    T = new Set();
    let index = 0;

    // While all vertices have not been connected, find the shortest edge such that a new vertex is added to A.
    while (A.size != n) {

        let v = GPrime[index][0];
        let w = GPrime[index][1];
        if (A.has(v) && !A.has(w)) {
            A.add(w); // Add the vertex.
            T.add(GPrime[index]); // Add the edge to the MST.
            GPrime.splice(index, 1); // Remove the edge, from the sorted set.
            index = 0;
        }
        else if (A.has(w) && !A.has(v)) {
            A.add(v); // Add the vertex.
            T.add(GPrime[index]); // Add the edge to the MST.
            GPrime.splice(index, 1); // Remove the edge, from the sorted set.
            index = 0;
        }
        else {
            index++; // Minimum edge is not yet valid check the next edge.
        }
    }

    return T;
}

function floydWarshall(pointSet, graph){

    var dist = [];

    for (var i = 0; i < graph.size; i++) {
        dist.push([]);
        for (var j = 0; j < graph.size; j++) {
            if (i == j) {
                dist[i].push(0);
            }
            else if (graph.get(i).includes(j)) {
                dist[i].push(distance2D(pointSet[i], pointSet[j], 2));
            }
            else {
                dist[i].push(Infinity);
            }
        }
    }

    for (var k = 0; k < graph.size; k++) {
        for (var i = 0; i < graph.size; i++) {
            for (var j = 0; j < graph.size; j++) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
 
    var tMax = 0;
    for (var i = 0; i < pointSet.length; i++) {
        for (var j = i + 1; j < pointSet.length; j++) {
            var t = dist[i][j] / distance2D(pointSet[i], pointSet[j], 2);
            if (t > tMax) {
                tMax = t;
                worstPair = [i, j];
            }

        }
    }

    return tMax;
}


function getANNPairsCardinality(ANNList) {
    return ANNList.length / 2;
}


// Returns the WSPD pairs as a string.
function getANNPairs(ANNList) {

    var pairsString = '';

    pairsString += '{';

    for (let i = 0; i < ANNList.length - 2; i += 2) {
        pairsString += '{' + ANNList[i] + ',';
        pairsString += ANNList[i + 1] + '},\n';

    }
    pairsString += '{' + ANNList[ANNList.length - 2] + ',';
    pairsString += ANNList[ANNList.length - 1] + '}';

    pairsString += '}\n';

    return pairsString;
}