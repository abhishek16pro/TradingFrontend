import axios from 'axios'
export const addStrategy = async (StgSetting, legData) => {
    // console.log(legData);

    const dayIndices = getDayIndices(StgSetting.runonDays);
    // console.log(dayIndices);

    let body = {
        "index": StgSetting.index,
        "name": StgSetting.stgName,
        "tag": StgSetting.stgTag,
        "orderType": null,
        "entryType": "SL-Limit",
        "entrybuffervalue": StgSetting.entryBuffervalue,
        "exitType": "Sl-Limit",
        "exitbuffervalue": StgSetting.exitBuffervalue,
        "runOnDay": dayIndices,
        "loss": -parseInt(StgSetting.stgLevelSL),
        "profit": parseInt(StgSetting.stgLevelprofit),
        "startTime": StgSetting.startTime,
        "endTime": StgSetting.endTime,
        "sqTime": StgSetting.sqoffTime,
        // "index": StgSetting.index === "BANKNIFTY" ? "bankNifty" : StgSetting.index === "NIFTY" ? "nifty" : StgSetting.index === "FINNIFTY" ? "finNifty" : "midCapNifty",
    }

    for (let i = 0; i < 8; i++) {
        if (legData[i]) {

            body[`leg${i + 1}`] = {
                "added": true,
                "idle": legData[i].idle,
                "lot": parseInt(legData[i].lot),
                "tradeType": legData[i].side,
                "optionType": legData[i].cepe === "C" ? "CE" : "PE",
                "strikeSelectionType": legData[i].strike === "Prem. Close to" ? "premiumClose" : legData[i].strike === "Prem. greater than" ? "premiumgreater" : legData[i].strike === "Prem. less than" ? "premiumless" : legData[i].strike === "By Strike" ? "ByStrike" : "Atm",
                "strikeSelectionValue": legData[i].strikeValue,
                "waitTrade": legData[i].wt,
                "targetType": legData[i].targetType === "Premium in Points" ? "premiumpoints" : legData[i].targetType === "Premium in %" ? "premium%" : legData[i].targetType === "Underlying in Points" ? "underlyingpoints" : legData[i].targetType === "Underlying in %" ? "underlying%" : "None",
                "targetValue": legData[i].tgtvalue,
                "sLType": legData[i].stoplossType === "Premium in Points" ? "premiumpoints" : legData[i].stoplossType === "Premium in %" ? "premium%" : legData[i].stoplossType === "Underlying in Points" ? "underlyingpoints" : legData[i].stoplossType === "Underlying in %" ? "underlying%" : "None",
                "sLValue": legData[i].slValue,
                "trail": legData[i].trail,
                "onTargetType": "None",
                "onTargetValue": [],
                "onTargetTimes": 0,
                "onSLType": "None",
                "onSLValue": [],
                "onSLTimes": 0
            };

            //check target type an no of times in
            legData[i].onTarget.map(data => {
                // console.log(data.includes('ReExecute'));
                if (data.includes('ReExecute')) {
                    body[`leg${i + 1}`].onTargetType = 'reExecute'
                    body[`leg${i + 1}`].onTargetTimes = parseInt(legData[i].onTargetNoT)
                }
                else if (data.includes('ReEntry')) {
                    body[`leg${i + 1}`].onTargetType = 'reEntry'
                    body[`leg${i + 1}`].onTargetTimes = parseInt(legData[i].onTargetNoT)
                }

                // else if (data.includes('Execute')) {

                //     body[`leg${i + 1}`].onTargetType = 'Execute'
                // }
                // else if (data.includes('Sq Off')) {

                //     body[`leg${i + 1}`].onTargetType = 'sqOff'
                // }
                // else body[`leg${i + 1}`].onTargetType = 'None'
            })

            //check target type an no of times in
            legData[i].onSL.map(data => {
                // console.log(data.includes('ReExecute'));
                if (data.includes('ReExecute')) {
                    body[`leg${i + 1}`].onSLType = 'reExecute'
                    body[`leg${i + 1}`].onSLTimes = parseInt(legData[i].onSLNoT)
                }
                else if (data.includes('ReEntry')) {
                    body[`leg${i + 1}`].onSLType = 'reEntry'
                    body[`leg${i + 1}`].onSLTimes = parseInt(legData[i].onSLNoT)
                }

                // else if (data.includes('Execute')) {

                //     body[`leg${i + 1}`].onSLType = 'Execute'
                // }
                // else if (data.includes('Sq Off')) {

                //     body[`leg${i + 1}`].onSLType = 'sqOff'
                // }
                // else body[`leg${i + 1}`].onSLType = 'None'
            })


            legData[i].onTarget.map(data => {
                // console.log(data.includes('ReExecute'));
                if (data.includes('Execute Leg')) {
                    body[`leg${i + 1}`].onTargetValue.push(parseInt(data.replace("Execute Leg", "")))
                }

                if (data.includes('Sq Off Leg')) {
                    body[`leg${i + 1}`].onTargetValue.push(-parseInt(data.replace("Sq Off Leg", "")))
                }

            })

            legData[i].onSL.map(data => {
                // console.log(data.includes('ReExecute'));
                if (data.includes('Execute Leg')) {
                    body[`leg${i + 1}`].onSLValue.push(parseInt(data.replace("Execute Leg", "")))
                }

                if (data.includes('Sq Off Leg')) {
                    body[`leg${i + 1}`].onSLValue.push(-parseInt(data.replace("Sq Off Leg", "")))
                }

            })

        }
    }

    // console.log(body);

    try {
        const res = await axios.post(`/strategy/add`, body);
        // console.log(res.data.message);
        window.alert(res.data.message)
        window.location.reload();
    } catch (err) {
        window.alert(err.response.data.Error)
        // console.log(typeof (err.response.data.Error));
    }
}

function getDayIndices(dayNames) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const dayIndices = dayNames.map(dayName => {
        const index = daysOfWeek.indexOf(dayName);
        return index !== -1 ? index : undefined;
    });

    return dayIndices;
}