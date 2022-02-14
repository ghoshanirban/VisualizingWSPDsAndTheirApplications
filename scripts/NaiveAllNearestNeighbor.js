function colorAllWSPDPair(wspdPoints) {
    wspdCircleStyle.color = '#0000FF';
    var style1 = {};
    Object.assign(style1, wspdCircleStyle);

    for (let i = 0; i < wspdPoints; i++) {
        let animationCircle1 = new AnimationObject('point', wspdPoints[i], style1, 'wellSeparatedCheck', true);
        eventQueue.push(animationCircle1);
    }
}


function pointDist(checkPoint, onFirst, wspdPairFirstPart, wspdPairSecondPart, pointSetMap) {
    if (onFirst) {
        let minDist = Infinity;
        for (let i = 0; i < wspdPairSecondPart.length; i++) {
            colorAllWSPDPair(wspdPairSecondPart);
            let pointofSecondPart = wspdPairSecondPart[i];
            let dist = distance2D(checkPoint, pointofSecondPart);
            NearestNeighborAnimatePointWise(checkPoint, pointofSecondPart, 3);
            if (minDist > dist) {
                minDist = dist;
                minPoint = pointofSecondPart;
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


function NearestNeighborAnimatePointWise(v, w, s) {
    //eventQueue.push('ClearTemps');

    // Given a point set create a circle containing the points via the bounding box.
    //console.log("hello");
    //console.log(v.R);
    // var C1 = new Circle(v.R.getCenter(), distance2D(v.R.getCenter(), v.R.vertices[0]));
    // var C2 = new Circle(w.R.getCenter(), distance2D(w.R.getCenter(), w.R.vertices[0]));

    var C1 = new Circle(v, 0);
    var C2 = new Circle(w, 0);
    console.log(C1);
    console.log(C2);

    // Find the circle with the maximum radius.
    //let maxRadius = Math.max(C1.radius, C2.radius);

    // Create new bounding circles with the maximum radius.
    // C1 = new Circle(C1.center, maxRadius);
    // C2 = new Circle(C2.center, maxRadius);

    // Set the color of the animation objects.
    wspdCircleStyle.color = getColor();
    var style1 = {};
    Object.assign(style1, wspdCircleStyle);

    wspdSeparationLineStyle.color = '#0000FF';

    var style2 = {};
    Object.assign(style2, wspdSeparationLineStyle);

    // Animations for the well-separated check. Could be non-temporary so they are not added yet.

    // let animationCircle2 = new AnimationObject('circle', [C2.center, w],
    //     style1, 'wellSeparatedCheck', true);

    // let animationCircle1 = new AnimationObject('circle', [C1.center, v],
    //     style1, 'wellSeparatedCheck', true);

    //pointSetStyle.color = '#FF0000';    
    let animationCircle1 = new AnimationObject('point', v, pointSetStyleANNNode1, 'wellSeparatedCheck', true);
    //pointSetStyle.color = '#0000FF';    
    let animationCircle2 = new AnimationObject('point', w, pointSetStyleANNNode2, 'wellSeparatedCheck', true);
    let animationLine = new AnimationObject('line',
        [v, w],
        style2, 'wellSeparatedCheck', true);

    // console.log(animationCircle1);
    // console.log(animationCircle2);
    // console.log(animationLine);
    // console.log("Point of v and w ");
    // console.log(v);
    // console.log(w);

    // Compute the distance between the bounding circles.
    //let distanceC1ToC2 = distance2D(C1.center, C2.center) - C1.radius - C2.radius;

    // If the pair is well-separated keep the AnimationObjects on the board and return true.
    //if (distanceC1ToC2 >= s*maxRadius) {

    // Set the AnimationObjects as non-temporary.
    animationCircle1.isTemporary = false;
    animationCircle2.isTemporary = false;
    animationLine.isTemporary = false;

    // Adds the AnimationObjects to the animation event queue.
    eventQueue.push(animationCircle1);
    eventQueue.push(animationCircle2);
    eventQueue.push(animationLine);

    //  return true;
    //}

    // Remove a non well-separated pair animation step.
    //eventQueue.push('RemoveNonWellSeparated');
}

function NearestNeighborAnimate(v, w, s) {
    //eventQueue.push('ClearTemps');

    // Given a point set create a circle containing the points via the bounding box.
    //console.log("hello");
    //console.log(v.R);
    var C1 = new Circle(v.R.getCenter(), distance2D(v.R.getCenter(), v.R.vertices[0]));
    var C2 = new Circle(w.R.getCenter(), distance2D(w.R.getCenter(), w.R.vertices[0]));

    // console.log(C1);
    // console.log(C2);
    // Find the circle with the maximum radius.
    let maxRadius = Math.max(C1.radius, C2.radius);

    // Create new bounding circles with the maximum radius.
    C1 = new Circle(C1.center, maxRadius);
    C2 = new Circle(C2.center, maxRadius);

    // Set the color of the animation objects.
    wspdCircleStyle.color = getColor();
    var style1 = {};
    Object.assign(style1, wspdCircleStyle);

    wspdSeparationLineStyle.color = wspdCircleStyle.color;
    var style2 = {};
    Object.assign(style2, wspdSeparationLineStyle);

    // Animations for the well-separated check. Could be non-temporary so they are not added yet.
    let animationCircle1 = new AnimationObject('circle', [C1.center, v.R.vertices[0]],
        style1, 'wellSeparatedCheck', true);
    let animationCircle2 = new AnimationObject('circle', [C2.center, w.R.vertices[0]],
        style1, 'wellSeparatedCheck', true);
    let animationLine = new AnimationObject('line',
        calculateCircleConnectionLine(C1.center, v.R.vertices[0], C2.center, w.R.vertices[0]),
        style2, 'wellSeparatedCheck', true);

    // console.log(animationCircle1);
    // console.log(animationCircle2);
    // console.log(animationLine);
    // Compute the distance between the bounding circles.
    //let distanceC1ToC2 = distance2D(C1.center, C2.center) - C1.radius - C2.radius;

    // If the pair is well-separated keep the AnimationObjects on the board and return true.
    //if (distanceC1ToC2 >= s*maxRadius) {

    // Set the AnimationObjects as non-temporary.
    animationCircle1.isTemporary = false;
    animationCircle2.isTemporary = false;
    animationLine.isTemporary = false;

    // Adds the AnimationObjects to the animation event queue.
    eventQueue.push(animationCircle1);
    eventQueue.push(animationCircle2);
    eventQueue.push(animationLine);

    //  return true;
    //}

    // Remove a non well-separated pair animation step.
    //eventQueue.push('RemoveNonWellSeparated');
}

function NaiveAllNN(pointSet, pointSetMap, treeArray, wspd) {
    //console.log(pointSet.length);
    //console.log(pointSet);
    let ANNList = [];
    for (let p = 0; p < pointSet.length; p++) {

        let minDist = Infinity;
        let minDistPoint;
        let checkPoint = pointSet[p];
        //let secondPoint = pointSet[p + 1];
        //console.log(p+1);
        //console.log(secondPoint);
        //NearestNeighborAnimatePointWise(checkPoint, secondPoint, 3);
        let nearestWspdPair;
        for (let i = 0; i < wspd.length; i++) {
            let tmpNearestWspdPair;
            // console.log("minDistPoint");
            // console.log(minDistPoint);

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
            // console.log("CheckPoint");
            // console.log(checkPoint);
            if (pointSetMap.get(checkPoint) == pointSetMap.get(wspdPairFirstPart[0])) {
                NNPair = pointDist(checkPoint, 1, wspdPairFirstPart, wspdPairSecondPart, pointSetMap);
                // console.log("NNPair");
                // console.log(NNPair);
                dist = distance2D(NNPair, checkPoint);
                //console.log("WSPD Pair for animate");
                //console.log(wspdPairs[1]);
                //let animationPoint = new AnimationObject('point', checkPoint, leafPointStyle, 'leafPoint', true);
                //animationPoint.isTemporary = true;
                //eventQueue.push(animationPoint);
                //NearestNeighborAnimate(wspdPairs[0], wspdPairs[1], 3);
            }
            else {
                //console.log("check");
                let isExist = isExistWhere(wspdPairSecondPart, checkPoint, pointSetMap);
                // console.log(wspdPairSecondPart);
                // console.log(isExist);                
                if (isExist) {
                    // console.log("check1");
                    // console.log(wspdPairFirstPart);
                    dist = distance2D(wspdPairFirstPart[0], checkPoint);
                    //console.log("check2");
                    NearestNeighborAnimatePointWise(checkPoint, wspdPairFirstPart[0]);
                    NNPair = wspdPairFirstPart[0];
                    //let animationPoint = new AnimationObject('point', checkPoint, leafPointStyle, 'leafPoint', true);
                    //animationPoint.isTemporary = true;
                    //eventQueue.push(animationPoint);
                    //NearestNeighborAnimate(wspdPairs[0], wspdPairs[1], 3);
                }
                //console.log("Second NN");
                //console.log(NNPair);
            }
            if (minDist > dist) {
                minDist = dist;
                minDistPoint = NNPair;
                nearestWspdPair = wspdPairs;
            }
            eventQueue.push('ClearWSPD');
            // console.log("minDistPoint");
            // console.log(minDistPoint);
        }

        //var p1 = board.create('point', checkPoint);
        //var p2 = board.create('point', minDistPoint);
        //var l1 = board.create('arrow', [p1, p2]);

        eventQueue.push('ClearWSPD');


        ANNList.push(checkPoint);
        ANNList.push(minDistPoint);

        // Remove the WSPD from the board.
        //eventQueue.push('ClearTemps'); // Remove the temporary items.
        //eventQueue.push(new AnimationObject('point', checkPoint, leafPointStyle, 'leafPoint', false));
        //NearestNeighborAnimate(nearestWspdPair[0], nearestWspdPair[1], 3);
        //NearestNeighborAnimatePointWise(checkPoint, minDistPoint, 3);
        //eventQueue.push('ClearTemps'); // Remove the WSPD from the board.
        //animate(1, animationSpeedSelection.value);   
        // while (eventQueue.length > 0) {
        //     remove(eventQueue.shift());
        // }

        console.log("PointSet Naive");
        console.log(checkPoint);
        console.log(minDistPoint);
    }
    finalANNAnimation(ANNList);
}

function finalANNAnimation(ANNList) {
    for (let i = 0; i < ANNList.length; i += 2) {
        let checkPoint = ANNList[i];
        let minDistPoint = ANNList[i + 1];

        wspdCircleStyle.color = getColor();
        var style1 = {};
        Object.assign(style1, wspdCircleStyle);

        wspdSeparationLineStyle.color = '#0000FF'//'#FA5B3D';
        var style2 = {};
        Object.assign(style2, wspdSeparationLineStyle);

        let animationCircleP1 = new AnimationObject('point', checkPoint[0],
            style1, 'wellSeparatedCheck', true);
        let animationCircleP2 = new AnimationObject('point', minDistPoint[0], style1, 'wellSeparatedCheck', true);

        let animationCircleP3 = new AnimationObject('arrow', [checkPoint, minDistPoint], style2, 'wellSeparatedCheck', true);

        eventQueue.push(animationCircleP1);
        eventQueue.push(animationCircleP2);
        eventQueue.push(animationCircleP3);

    }
}