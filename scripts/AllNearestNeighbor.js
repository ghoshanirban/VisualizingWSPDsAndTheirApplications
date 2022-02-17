function colorCurrentPoint(checkPoint) {
    var style1 = {};
    Object.assign(style1, pointSetStyleANNCurrentNode);
    
        let animationCircle1 = new AnimationObject('point', checkPoint, style1, 'ANNLoop', true);        
        eventQueue.push(animationCircle1);
}

function colorAllWSPDPair(checkPoint, wspdPoints) {

    pointSetStyleANNWSPDPair.color = getColor();

    var style1 = {};
    Object.assign(style1, pointSetStyleANNWSPDPair);

    var style2 = {};
    Object.assign(style2, pointSetStyleANNCurrentNode);

    for (let i = 0; i < wspdPoints.length; i++) {
        let animationCircle1 = new AnimationObject('point', wspdPoints[i], style1, 'considerWSPDPairs', true);
        let animationCircle2 = new AnimationObject('point', checkPoint, style2, 'considerWSPDPairs', true);

        eventQueue.push(animationCircle2);
        eventQueue.push(animationCircle1);
    }
}

function colorsPALL(checkPoint, wspdPoints) {

    pointSetStyleANNWSPDPair.color = '#0000FF';

    var style1 = {};
    Object.assign(style1, pointSetStyleANNWSPDPair);


    var style2 = {};
    Object.assign(style2, pointSetStyleANNCurrentNode);

    for (let i = 0; i < wspdPoints.length; i++) {
        let animationCircle1 = new AnimationObject('point', wspdPoints[i], style1, 'selectSingletonWSPD', true);
        let animationCircle2 = new AnimationObject('point', checkPoint, style2, 'selectSingletonWSPD', true);

        eventQueue.push(animationCircle1);
        eventQueue.push(animationCircle2);
    }
}

function isExistWhere(wspdPart, checkPoint, pointSetMap) {
    let mapCheckPoint = pointSetMap.get(checkPoint);
    for (let i = 0; i < wspdPart.length; i++) {
        let wspdPartPoint = pointSetMap.get(wspdPart[i]);
        if (mapCheckPoint == wspdPartPoint) {
            return 1;
        }
    }
}


function NearestNeighborAnimatePointWiseCurrentClosestPair(v, w) {
    var C1 = new Circle(v, 0);
    var C2 = new Circle(w, 0);
    
    var style2 = {};
    Object.assign(style2, ANNCurrentClosestLine);

    //pointSetStyle.color = '#FF0000';    
    let animationCircle1 = new AnimationObject('point', v, pointSetStyleANNCurrentClosestNode1, 'getNearestNeighbor', true);
    //pointSetStyle.color = '#0000FF';    
    let animationCircle2 = new AnimationObject('point', w, pointSetStyleANNCurrentClosestNode2, 'getNearestNeighbor', true);
    let animationLine = new AnimationObject('line',
        [v, w],
        style2, 'getNearestNeighbor', true);

    // Adds the AnimationObjects to the animation event queue.
    eventQueue.push(animationCircle1);
    eventQueue.push(animationCircle2);
    eventQueue.push(animationLine);
}

function NearestNeighborAnimatePointWise(v, w) {
    var C1 = new Circle(v, 0);
    var C2 = new Circle(w, 0);

    // Set the color of the animation objects.
    wspdCircleStyle.color = getColor();
    var style1 = {};
    Object.assign(style1, wspdCircleStyle);

    ANNSeparationLineStyle.color = '#0000FF';

    var style2 = {};
    Object.assign(style2, ANNSeparationLineStyle);

    let animationCircle1 = new AnimationObject('point', v, pointSetStyleANNNode1, 'getNearestNeighbor', true);

    let animationCircle2 = new AnimationObject('point', w, pointSetStyleANNNode2, 'getNearestNeighbor', true);
    let animationLine = new AnimationObject('line',
        [v, w],
        style2, 'getNearestNeighbor', true);


    // Adds the AnimationObjects to the animation event queue.
    eventQueue.push(animationCircle1);
    eventQueue.push(animationCircle2);
    eventQueue.push(animationLine);
}

function NaiveAllNN() {

    let singletonWSPD = getSingletonWSPD();

    for (let p = 0; p < pointSet.length; p++) {

        let sPALL = [];
        let minDistPoint;
        let checkPoint = pointSet[p];
        colorCurrentPoint(checkPoint);
        for (let i = 0; i < singletonWSPD.length; i++) {
           
            let wspdPairs = singletonWSPD[i];
            let wspdPairFirstPart = wspdPairs[0].S;
            let wspdPairSecondPart = wspdPairs[1].S;

            if (wspdPairFirstPart.length > wspdPairSecondPart.length) {
                let tmp = wspdPairSecondPart;
                wspdPairSecondPart = wspdPairFirstPart;
                wspdPairFirstPart = tmp;
            }

            if (pointSetMap.get(checkPoint) == pointSetMap.get(wspdPairFirstPart[0])) {                
                colorAllWSPDPair(checkPoint, wspdPairSecondPart);
                for (let i = 0; i < wspdPairSecondPart.length; i++) {
                    sPALL.push(wspdPairSecondPart[i]);
                }
            }
            else {
                let isExist = isExistWhere(wspdPairSecondPart, checkPoint, pointSetMap);
                if (isExist) {
                    colorAllWSPDPair(checkPoint, wspdPairFirstPart);
                    sPALL.push(wspdPairFirstPart[0]);
                }
            }
        }

        colorsPALL(checkPoint, sPALL);
        let dist;
        let minDist = Infinity;
        for (let i = 0; i < sPALL.length; i++) {
            dist = distance2D(sPALL[i], checkPoint);
            NearestNeighborAnimatePointWise(checkPoint, sPALL[i]);
            if (minDist > dist) {
                minDist = dist;
                minDistPoint = sPALL[i];
            }
        }

        NearestNeighborAnimatePointWiseCurrentClosestPair(checkPoint, minDistPoint);

        finalANNPairConstruction(checkPoint, minDistPoint);
        eventQueue.push('ClearTemps');
        ANNList.push(pointSetMap.get(checkPoint));
        ANNList.push(pointSetMap.get(minDistPoint));
    }
}

function finalANNPairConstruction(checkPoint, minDistPoint) {

    var style1 = {};
    Object.assign(style1, pointSetStyleANNFinal);

    ANNSeparationLineStyle.color = '#0000FF'//'#FA5B3D';
    var style2 = {};
    Object.assign(style2, ANNSeparationLineStyle);

    let animationCircleP1 = new AnimationObject('point', checkPoint,
        style1, 'getNearestNeighbor', false);
    let animationCircleP2 = new AnimationObject('point', minDistPoint, style1, 'getNearestNeighbor', false);

    let animationCircleP3 = new AnimationObject('arrow', [checkPoint, minDistPoint], style2, 'getNearestNeighbor', false);


    eventQueue.push(animationCircleP1);
    eventQueue.push(animationCircleP2);
    eventQueue.push(animationCircleP3);

}