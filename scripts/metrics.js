/**
 * Metrics calculation and display functions.
 * 
 * David Wisnosky
 */



function populateMetrics(selection) {
    
    if (selection == 'WSPD') {

        var metricsData = '';

        metricsData += '<span>\\(|V|:' + getPointsetCardinality(pointSet) +'\\)</span> <br><br>'

        metricsData += '<span>\\(WSPD Pairs:\\)</span> <br>';

        metricsData += '<span>\\(|Pairs|:' + getWSPDPairsCardinality(wspd.pairs) +'\\)</span> <br>';

        metricsData += '<textarea rows="3" col="50" readonly>';

        for (pair of wspd.pairs) {

            metricsData += '[['

            for (point of pair[0].S) {
                metricsData += pointSetMap.get(point) + ' ';
            }

            metricsData += '],['

            for (point of pair[1].S) {
                metricsData += pointSetMap.get(point) + ' ';
            }

            metricsData += ']]\n';

        }

        metricsData += '</textarea>';

    }

    metricsBox.innerHTML = metricsData;

    MathJax.typeset();
}


// Returns |V|.
function getPointsetCardinality(S) {
    return S.length;
}

// Returns |WSPD.pairs|.
function getWSPDPairsCardinality(wspdPairs) {
    return wspdPairs.length;
}

// Returns |E|.
function getGraphEdgesCardinality(G) {
    return G.size;
}

function getWSPDPairs(W) {
    return;
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

/*// Floyd-Warshall algorithm.
function floydWarshall(S, G) {
    
    var dis = [];

    for (let i = 0; i < G.size; i++) {
       dis.push([]);
       for (let j = 0; j < G.size; j++) {

            if(i == j)
                dis[i].push(0);
            else if(G.get())
       } 
    }

}*/

