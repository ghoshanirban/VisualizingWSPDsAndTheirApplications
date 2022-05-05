/**
 * File to control processing and algorithm function calls.
 */

function processAlgorithm(algorithm, param, mainAlgorithm = false) {

    metricsBox.innerHTML = baseMetricsBoxInnerHTML + '<span class="metric">\\(\\text{Processing...}\\)</span>';
    metricsBox.innerHTML += '<div class="loader">Loading...</div>';

    MathJax.typeset();

    displaySteps(algorithm);

    setTimeout(function () {
        algorithmCall(algorithm, param, mainAlgorithm);
    }, 1000);
}

function algorithmCall(algorithm, param, mainAlgorithm) {

    if (algorithm == 'WSPD')
        generateWSPD(param);

    else if (algorithm == 'tSpanner')
        generateTSpanner(param);

    else if (algorithm == 'closestPair')
        closestPair = computeClosestPair();

    else if (algorithm == 'kClosestPairs')
        kClosestPairs = computeKClosestPairs(param);

    else if (algorithm == 'ANN')
        NaiveAllNN();

    else if (algorithm == 'tApproxMST')
        tApproxMST = tApproximateMinimumSpanningTree();

    if (mainAlgorithm) {
        populateMetrics(algorithm);
        animate(1, animationSpeedSelection.value, algorithm);
    }
}
