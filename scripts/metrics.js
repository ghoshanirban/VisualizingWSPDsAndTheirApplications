/**
 * Metrics calculation and display functions.
 * 
 * David Wisnosky
 */

// Base metrics box text.
let baseMetricsBoxInnerHTML = metricsBox.innerHTML;

// Data download button
/*let dataDownloadHTML = '<div id="dataDownloadBox">' +
                            '<label for="dataDownload"></label >' +
                            '<button class="buttonE button1" id="dataDownload">Download Data</button>' +
                        '</div >'*/

// Resets the metrics box text for new metrics.
function resetMetricsBox() {
    metricsBox.innerHTML = baseMetricsBoxInnerHTML;
}

function populateMetrics(selection) {

    resetMetricsBox();

    var metricsData = '';

    if (selection == 'processing')
        metricsData += '<span class="metric">\\(\\text{Processing}\\)</span>';
    
    else if (selection == 'WSPD') {

        metricsData += '<span class="metric">\\(|P|:' + getPointsetCardinality(pointSet) +'\\)</span>';
        metricsData += '<span class="metric">\\(s:' + getWSPDSeparationFactor(wspd) + '\\) </span>'
        metricsData += '<span class="metric">\\(m:' + getWSPDPairsCardinality(wspd.pairs) + '\\)</span> <br>';
        metricsData += '<span class="metric">\\(Points:\\)</span>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getPointIDs(pointSet, pointSetMap) + '</textarea>';
        metricsData += '<span class="metric">\\(WSPD Pairs:\\)</span> <br>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getWSPDPairs(wspd) + '</textarea>';
    }

    else if (selection == 'tSpanner') {
        
        metricsData += '<span class="metric">\\(|P|:' + getPointsetCardinality(pointSet) + '\\)</span>';
        metricsData += '<span class="metric">\\(s:' + getWSPDSeparationFactor(wspd) + '\\) </span>'
        metricsData += '<span class="metric">\\(m:' + getWSPDPairsCardinality(wspd.pairs) + '\\)</span>';
        metricsData += '<span class="metric">\\(|t|:' + getTValue(tValue) + '\\)</span>';
        metricsData += '<span class="metric">\\(t_{actual}:' + floydWarshall(pointSet, graph) + '\\)</span>';
        metricsData += '<span class="metric">\\(Points:\\)</span>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getPointIDs(pointSet, pointSetMap) + '</textarea>';
        metricsData += '<span class="metric">\\(WSPD Pairs:\\)</span> <br>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getWSPDPairs(wspd) + '</textarea>';
        metricsData += '<span class="metric">\\(Edges :\\)</span> <br>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getGraphEdges(graphEdges) + '</textarea>';
        
    }

    else if (selection == 'closestPair') {

        metricsData += '<span class="metric">\\(|P|:' + getPointsetCardinality(pointSet) + '\\)</span>';
        metricsData += '<span class="metric">\\(s:' + getWSPDSeparationFactor(wspd) + '\\) </span>'
        metricsData += '<span class="metric">\\(m:' + getWSPDPairsCardinality(wspd.pairs) + '\\)</span>';
        metricsData += '<span class="metric">\\(|t|:' + getTValue(tValue) + '\\)</span>';
        metricsData += '<span class="metric">\\(t_{actual}:' + floydWarshall(pointSet, graph) + '\\)</span>';
        metricsData += '<span class="metric">\\(Closest pair:' + getClosestPair(closestPair) + '\\)</span>';
        metricsData += '<span class="metric">\\(Points:\\)</span>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getPointIDs(pointSet, pointSetMap) + '</textarea>';
        metricsData += '<span class="metric">\\(WSPD Pairs:\\)</span> <br>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getWSPDPairs(wspd) + '</textarea>';
        metricsData += '<span class="metric">\\(Edges :\\)</span> <br>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getGraphEdges(graphEdges) + '</textarea>';

    }

    else if (selection == 'kClosestPairs') {

        metricsData += '<span class="metric">\\(|P|:' + getPointsetCardinality(pointSet) + '\\)</span>';
        metricsData += '<span class="metric">\\(s:' + getWSPDSeparationFactor(wspd) + '\\) </span>'
        metricsData += '<span class="metric">\\(m:' + getWSPDPairsCardinality(wspd.pairs) + '\\)</span>';
        metricsData += '<span class="metric">\\(k:' + getK(kPairs.value) + '\\)</span>';
        metricsData += '<span class="metric">\\(Points:\\)</span>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getPointIDs(pointSet, pointSetMap) + '</textarea>';
        metricsData += '<span class="metric">\\(WSPD Pairs:\\)</span> <br>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getWSPDPairs(wspd) + '</textarea>';
        metricsData += '<span class="metric">\\(' + getK(kPairs.value) + '\\)-\\(closest \\text{ } pairs :\\)</span> <br>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getKClosestPairs(kClosestPairs) + '</textarea>';

    }

    else if (selection == 'tApproxMST') {

        metricsData += '<span class="metric">\\(|P|:' + getPointsetCardinality(pointSet) + '\\)</span>';
        metricsData += '<span class="metric">\\(s:' + getWSPDSeparationFactor(wspd) + '\\) </span>'
        metricsData += '<span class="metric">\\(m:' + getWSPDPairsCardinality(wspd.pairs) + '\\)</span>';
        metricsData += '<span class="metric">\\(|t|:' + getTValue(tValue) + '\\)</span>';
        metricsData += '<span class="metric">\\(t_{actual}:' + floydWarshall(pointSet, graph) + '\\)</span>';
        metricsData += '<span class="metric">\\(W_{t-ApproxMST}:' + computeGraphWeight(prim(generateCompleteGraph(pointSet), pointSet.length)) + '\\)</span>';
        metricsData += '<span class="metric">\\(W_{MST}:' + computeGraphWeight(tApproxMST) + '\\)</span>';
        metricsData += '<span class="metric">\\(Points:\\)</span>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getPointIDs(pointSet, pointSetMap) + '</textarea>';
        metricsData += '<span class="metric">\\(WSPD Pairs:\\)</span> <br>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getWSPDPairs(wspd) + '</textarea>';
        metricsData += '<span class="metric">\\(Edges :\\)</span> <br>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getGraphEdges(graphEdges) + '</textarea>';
        metricsData += '<span class="metric">\\(MST edges :\\)</span> <br>';
        metricsData += '<textarea style="width: 40%;" rows="3" col="30" readonly>' + getGraphEdges(tApproxMST) + '</textarea>';

    }

    metricsBox.innerHTML += metricsData; /*+ dataDownloadHTML;

    // Data download control (points, pairs, edges ...).
    let dataDownloadButton = document.getElementById('dataDownload');
    dataDownloadButton.addEventListener('click', downloadData);*/

    MathJax.typeset();
}


// Returns |P|.
function getPointsetCardinality(P) {
    return P.length;
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

    var pairsString = '';//'{';

    for (pair of W.pairs) {

        pairsString += '{{';

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

// Returns t
function getTValue(t) {
    return t;
}

// Returns |E|.
function getGraphEdgesCardinality(G) {
    return G.size;
}

// Returns the edges of G as a string.
function getGraphEdges(G) {

    var edgeString = '';

    for(var edge of G) {

        edgeString += '(' + pointSetMap.get(edge[0]) + ',' + pointSetMap.get(edge[1]) + ')\n';
    }

    return edgeString;
}

// Returns formatted closet pair.
function getClosestPair(pair) {
    var returnString = '(' + pointSetMap.get(pair[0]) + ',' + pointSetMap.get(pair[1]) + ')';
    return returnString;
}

// Returns k for k-closest pairs.
function getK(k) {
    return k;
}

// Returns the k-closest pairs as a string.
function getKClosestPairs(K) {

    var kClosestPairsString = '';
    
    for (var pair of K) {

        kClosestPairsString += '(' + pointSetMap.get(pair[0]) + ',' + pointSetMap.get(pair[1]) + ')\n';
    }

    return kClosestPairsString;

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




/*
   // Print results to the HTML.
    stepsField.innerHTML = computeGraphWeight(tApproxMST) + " " +
        computeGraphWeight(prim(generateCompleteGraph(pointSet), pointSet.length));*/