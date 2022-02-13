function colorAllWSPDPair(wspdPoints) {
    wspdCircleStyle.color = '#0000FF';
    var style1 = {};
    Object.assign(style1, wspdCircleStyle);

    for (let i = 0; i < wspdPoints; i++) {
        let animationCircle1 = new AnimationObject('point', wspdPoints[i], style1, 'ANNConstructionSteps', true);
        eventQueue.push(animationCircle1);
    }
}


function pointDist(checkPoint, onFirst, wspdPairFirstPart, wspdPairSecondPart, pointSetMap) {
    if (onFirst) {
        let minDist = Infinity;
        for (let i = 0; i < wspdPairSecondPart.length; i++) {
            let pointofSecondPart = wspdPairSecondPart[i];
            let dist = distance2D(checkPoint, pointofSecondPart);
            NearestNeighborAnimatePointWise(checkPoint, pointofSecondPart, 3);
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
    console.log(C1);
    console.log(C2);

    // Set the color of the animation objects.
    wspdCircleStyle.color = getColor();
    var style1 = {};
    Object.assign(style1, wspdCircleStyle);

    //ANNCurrentClosestLine.color = '#59FF33';
    //ANNSeparationLineStyle.

    var style2 = {};
    Object.assign(style2, ANNCurrentClosestLine);

    //pointSetStyle.color = '#FF0000';    
    let animationCircle1 = new AnimationObject('point', v, pointSetStyleANNCurrentClosestNode1, 'ANNConstructionSteps', true);
    //pointSetStyle.color = '#0000FF';    
    let animationCircle2 = new AnimationObject('point', w, pointSetStyleANNCurrentClosestNode2, 'ANNConstructionSteps', true);
    let animationLine = new AnimationObject('line',
        [v, w],
        style2, 'ANNConstructionSteps', true);


    // Set the AnimationObjects as non-temporary.
    animationCircle1.isTemporary = false;
    animationCircle2.isTemporary = false;
    animationLine.isTemporary = false;

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


    //pointSetStyle.color = '#FF0000';    
    let animationCircle1 = new AnimationObject('point', v, pointSetStyleANNNode1, 'ANNConstructionSteps', true);
    //pointSetStyle.color = '#0000FF';    
    let animationCircle2 = new AnimationObject('point', w, pointSetStyleANNNode2, 'ANNConstructionSteps', true);
    let animationLine = new AnimationObject('line',
        [v, w],
        style2, 'ANNConstructionSteps', true);


    // Set the AnimationObjects as non-temporary.
    animationCircle1.isTemporary = false;
    animationCircle2.isTemporary = false;
    animationLine.isTemporary = false;

    // Adds the AnimationObjects to the animation event queue.
    eventQueue.push(animationCircle1);
    eventQueue.push(animationCircle2);
    eventQueue.push(animationLine);
}

function NaiveAllNN(pointSet, pointSetMap, treeArray, wspd) {
    let ANNList = [];
    for (let p = 0; p < pointSet.length; p++) {

        let minDist = Infinity;
        let minDistPoint;
        let checkPoint = pointSet[p];
        let nearestWspdPair;
        for (let i = 0; i < wspd.length; i++) {
            let tmpNearestWspdPair;            
            let wspdPairs = wspd[i];
            let wspdPairFirstPart = wspdPairs[0].S;
            let wspdPairSecondPart = wspdPairs[1].S;

            if (wspdPairFirstPart.length > wspdPairSecondPart.length) {
                let tmp = wspdPairSecondPart;
                wspdPairSecondPart = wspdPairFirstPart;
                wspdPairFirstPart = tmp;
            }

            let NNPair = [];
            let dist;
            if (pointSetMap.get(checkPoint) == pointSetMap.get(wspdPairFirstPart[0])) {
                NNPair = pointDist(checkPoint, 1, wspdPairFirstPart, wspdPairSecondPart, pointSetMap);
                dist = distance2D(NNPair, checkPoint);
            }
            else {
                let isExist = isExistWhere(wspdPairSecondPart, checkPoint, pointSetMap);                
                if (isExist) {
                    dist = distance2D(wspdPairFirstPart[0], checkPoint);
                    NearestNeighborAnimatePointWise(checkPoint, wspdPairFirstPart[0]);
                    NNPair = wspdPairFirstPart[0];
                }
            }
            if (minDist > dist) {
                minDist = dist;
                minDistPoint = NNPair;
                nearestWspdPair = wspdPairs;
                NearestNeighborAnimatePointWiseCurrentClosestPair(checkPoint,minDistPoint);
            }
            eventQueue.push('ClearANN');
        }
        eventQueue.push('ClearANN');
        finalANNPairConstruction(checkPoint,minDistPoint);
        ANNList.push(checkPoint);
        ANNList.push(minDistPoint);
        console.log("PointSet Naive");
        console.log(checkPoint);
        console.log(minDistPoint);
    }
    finalANNAnimation(ANNList);
}

function finalANNPairConstruction(checkPoint,minDistPoint)
{
    wspdCircleStyle.color = getColor();
    var style1 = {};
    Object.assign(style1, wspdCircleStyle);

    ANNSeparationLineStyle.color = '#0000FF'//'#FA5B3D';
    var style2 = {};
    Object.assign(style2, ANNSeparationLineStyle);

    let animationCircleP1 = new AnimationObject('point', checkPoint[0],
        style1, 'ANNConstructionStepsPermanent', true);
    let animationCircleP2 = new AnimationObject('point', minDistPoint[0], style1, 'ANNConstructionStepsPermanent', true);

    let animationCircleP3 = new AnimationObject('arrow', [checkPoint, minDistPoint], style2, 'ANNConstructionStepsPermanent', true);

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