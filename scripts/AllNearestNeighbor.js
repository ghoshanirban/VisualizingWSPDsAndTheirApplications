function colorCurrentPoint(checkPoint) {
    var style1 = {};
    Object.assign(style1, pointSetStyleANNCurrentNode);
    
        let animationCircle1 = new AnimationObject('point', checkPoint, style1, 'ANNConstructionSteps', true);        
        eventQueue.push('ANN');
        eventQueue.push(animationCircle1);
        eventQueue.push('ANN');
}

function colorAllWSPDPair(checkPoint, wspdPoints) {

    pointSetStyleANNWSPDPair.color = getColor();

    var style1 = {};
    Object.assign(style1, pointSetStyleANNWSPDPair);

    // eventQueue.push('ANNWSPD');
    var style2 = {};
    Object.assign(style2, pointSetStyleANNCurrentNode);

    for (let i = 0; i < wspdPoints.length; i++) {
        let animationCircle1 = new AnimationObject('point', wspdPoints[i], style1, 'ANNConstructionSteps', true);
        let animationCircle2 = new AnimationObject('point', checkPoint, style2, 'ANNConstructionSteps', true);

        eventQueue.push('ANNWSPDSP');
        eventQueue.push(animationCircle2);
        eventQueue.push('ANNWSPDSP');
        eventQueue.push(animationCircle1);
    }
}

function colorsPALL(checkPoint, wspdPoints) {

    pointSetStyleANNWSPDPair.color = '#0000FF';
    console.log(pointSetStyleANNWSPDPair.color);

    var style1 = {};
    Object.assign(style1, pointSetStyleANNWSPDPair);


    var style2 = {};
    Object.assign(style2, pointSetStyleANNCurrentNode);

    for (let i = 0; i < wspdPoints.length; i++) {
        let animationCircle1 = new AnimationObject('point', wspdPoints[i], style1, 'ANNConstructionSteps', true);
        let animationCircle2 = new AnimationObject('point', checkPoint, style2, 'ANNConstructionSteps', true);

        eventQueue.push('ANNWSPDSP');
        eventQueue.push(animationCircle1);
        eventQueue.push('ANNWSPDSP');
        eventQueue.push(animationCircle2);
    }
}


function pointDist(checkPoint, onFirst, wspdPairFirstPart, wspdPairSecondPart, pointSetMap) {
    if (onFirst) {
        // colorAllWSPDPair(checkPoint, wspdPairSecondPart);
        let minDist = Infinity;
        for (let i = 0; i < wspdPairSecondPart.length; i++) {
            let pointofSecondPart = wspdPairSecondPart[i];
            let dist = distance2D(checkPoint, pointofSecondPart);
            // NearestNeighborAnimatePointWise(checkPoint, pointofSecondPart, 3);
            if (minDist > dist) {
                minDist = dist;
                minPoint = pointofSecondPart;
                // NearestNeighborAnimatePointWiseCurrentClosestPair(checkPoint,pointofSecondPart,3);
            }
        }
    }
    return minPoint;
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
    let animationCircle1 = new AnimationObject('point', v, pointSetStyleANNCurrentClosestNode1, 'ANNConstructionSteps', true);
    //pointSetStyle.color = '#0000FF';    
    let animationCircle2 = new AnimationObject('point', w, pointSetStyleANNCurrentClosestNode2, 'ANNConstructionSteps', true);
    let animationLine = new AnimationObject('line',
        [v, w],
        style2, 'ANNConstructionSteps', true);

    // Adds the AnimationObjects to the animation event queue.
    eventQueue.push(animationCircle1);
    eventQueue.push(animationCircle2);
    eventQueue.push(animationLine);
}

function NearestNeighborAnimatePointWise(v, w) {
    var C1 = new Circle(v, 0);
    var C2 = new Circle(w, 0);
    console.log(C1);
    console.log(C2);

    // Set the color of the animation objects.
    wspdCircleStyle.color = getColor();
    var style1 = {};
    Object.assign(style1, wspdCircleStyle);

    ANNSeparationLineStyle.color = '#0000FF';

    var style2 = {};
    Object.assign(style2, ANNSeparationLineStyle);

    let animationCircle1 = new AnimationObject('point', v, pointSetStyleANNNode1, 'ANNConstructionSteps', true);

    let animationCircle2 = new AnimationObject('point', w, pointSetStyleANNNode2, 'ANNConstructionSteps', true);
    let animationLine = new AnimationObject('line',
        [v, w],
        style2, 'ANNConstructionSteps', true);


    // Set the AnimationObjects as non-temporary.
    animationCircle1.isTemporary = true;
    animationCircle2.isTemporary = true;
    animationLine.isTemporary = true;

    // Adds the AnimationObjects to the animation event queue.
    eventQueue.push(animationCircle1);
    eventQueue.push(animationCircle2);
    eventQueue.push(animationLine);
}

function NaiveAllNN(pointSet, pointSetMap, treeArray, wspd) {

    for (let p = 0; p < pointSet.length; p++) {

        eventQueue.push('ANN');
        let sPALL = [];
        let minDistPoint;
        let checkPoint = pointSet[p];
        colorCurrentPoint(checkPoint);
        for (let i = 0; i < wspd.length; i++) {

            //eventQueue.push('ANNWSPD');            
            let wspdPairs = wspd[i];
            let wspdPairFirstPart = wspdPairs[0].S;
            let wspdPairSecondPart = wspdPairs[1].S;

            if (wspdPairFirstPart.length > wspdPairSecondPart.length) {
                let tmp = wspdPairSecondPart;
                wspdPairSecondPart = wspdPairFirstPart;
                wspdPairFirstPart = tmp;
            }

            if (pointSetMap.get(checkPoint) == pointSetMap.get(wspdPairFirstPart[0])) {                
                colorAllWSPDPair(checkPoint, wspdPairSecondPart);
                eventQueue.push('ANNWSPD');
                for (let i = 0; i < wspdPairSecondPart.length; i++) {
                    eventQueue.push('ANNWSPD');
                    sPALL.push(wspdPairSecondPart[i]);
                }
            }
            else {
                let isExist = isExistWhere(wspdPairSecondPart, checkPoint, pointSetMap);
                if (isExist) {
                    eventQueue.push('ANNWSPD');
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
            eventQueue.push('ANNWSPDQ');
            NearestNeighborAnimatePointWise(checkPoint, sPALL[i]);
            if (minDist > dist) {
                minDist = dist;
                minDistPoint = sPALL[i];
            }
        }

        NearestNeighborAnimatePointWiseCurrentClosestPair(checkPoint, minDistPoint);

        finalANNPairConstruction(checkPoint, minDistPoint);
        eventQueue.push('ClearANN');
        ANNList.push(pointSetMap.get(checkPoint));
        ANNList.push(pointSetMap.get(minDistPoint));
    }
    // finalANNAnimation(ANNList);
}

function finalANNPairConstruction(checkPoint, minDistPoint) {

    var style1 = {};
    Object.assign(style1, pointSetStyleANNFinal);

    ANNSeparationLineStyle.color = '#0000FF'//'#FA5B3D';
    var style2 = {};
    Object.assign(style2, ANNSeparationLineStyle);

    let animationCircleP1 = new AnimationObject('point', checkPoint,
        style1, 'ANNConstructionStepsPermanent', false);
    let animationCircleP2 = new AnimationObject('point', minDistPoint, style1, 'ANNConstructionStepsPermanent', false);

    let animationCircleP3 = new AnimationObject('arrow', [checkPoint, minDistPoint], style2, 'ANNConstructionStepsPermanent', false);

    animationCircleP1.isTemporary = false;
    animationCircleP2.isTemporary = false;
    animationCircleP3.isTemporary = false;

    eventQueue.push(animationCircleP1);
    eventQueue.push(animationCircleP2);
    eventQueue.push(animationCircleP3);

}

function finalANNAnimation(ANNList) {
    for (let i = 0; i < ANNList.length; i += 2) {
        let checkPoint = ANNList[i];
        let minDistPoint = ANNList[i + 1];

        wspdCircleStyle.color = getColor();
        var style1 = {};
        Object.assign(style1, wspdCircleStyle);

        ANNSeparationLineStyle.color = '#0000FF'//'#FA5B3D';
        var style2 = {};
        Object.assign(style2, ANNSeparationLineStyle);

        let animationCircleP1 = new AnimationObject('point', checkPoint[0],
            style1, 'ANNConstructionSteps', true);
        let animationCircleP2 = new AnimationObject('point', minDistPoint[0], style1, 'ANNConstructionSteps', true);

        let animationCircleP3 = new AnimationObject('arrow', [checkPoint, minDistPoint], style2, 'ANNConstructionSteps', true);

        eventQueue.push(animationCircleP1);
        eventQueue.push(animationCircleP2);
        eventQueue.push(animationCircleP3);

    }
}