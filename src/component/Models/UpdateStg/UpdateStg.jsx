import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField, InputLabel, Select, MenuItem, Button, Box, FormControl, ListItemText, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import * as StgFunction from '../../Models/SubModels/StgFunction'
import { useEffect } from 'react';


const formStyle = {
    minWidth: '100px', // Adjust the width as needed
    margin: 'normal',
}

function UpdateStg(props) {
    // console.log(props.id);

    const [modalValueLoader, setModalValueLoader] = useState(false)
    const [Strategy, setStrategy] = useState()
    const legs = ["leg1"]

    async function fetchStrategy() {
        try {
            setModalValueLoader(false)
            axios.get(`/strategy/detail/${props.id}`).then(res => {
                let stg = res.data.strategy;
                for (const key in stg.log) {
                    if (!stg.log[key].added) {
                        delete stg[key];
                    }
                }
                console.log(stg);
                setStrategy(stg);
                setModalValueLoader(true)
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchStrategy()
    }, [props.id])

    // Create rows dynamically based on props.legCount
    const [legData, setLegData] = useState([
        { id: 1, idle: false, side: 'S', cepe: "C", strike: '', strikeValue: null, wt: null, targetType: null, tgtvalue: null, stoplossType: null, slValue: null, trail: null, onTarget: [], onTargetNoT: null, onSL: [], onSLNoT: null },
        { id: 2, idle: false, side: 'S', cepe: "C", strike: '', strikeValue: null, wt: null, targetType: null, tgtvalue: null, stoplossType: null, slValue: null, trail: null, onTarget: [], onTargetNoT: null, onSL: [], onSLNoT: null }
    ])
    // console.log(legData[0].onSL.includes("ReExecute Leg"));

    const [StgSetting, setStgSetting] = useState({
        index: null,
        stgTag: null,
        orderType: null,
        entryType: "Sl-Limit",
        entryBuffervalue: null,
        exitType: "Sl-Limit",
        exitBuffervalue: null,
        runonDays: [],
        stgLevelSL: null,
        onStopLoss: null,
        onstopLossOption: null,
        stgLevelprofit: null,
        onTarget: null,
        onTargetOption: null,
        startTime: null,
        endTime: null,
        sqoffTime: null
    })

    const Index = ['BANKNIFTY', 'NIFTY', 'FINNIFTY', 'MIDCPNIFTY']
    const Strike = ['Prem. Close to', 'Prem. greater than', 'Prem. less than', 'By Strike', 'ATM']
    const onTGTSL = ['None', 'ReExecute', 'ReEntry']
    const Target = ['None', 'Premium in Points', 'Premium in %', 'Underlying in Points', 'Underlying in %']
    const OrderType = ['NRML', 'MIS']
    const EntryType = ['SL-Limit']
    const RunonDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const Execute = ['Execute Other Portfolio', 'ReExecute', 'None']

    for (let i = 1; i <= legData.length; i++) {
        onTGTSL.push(`Execute Leg${i}`)
    }
    for (let i = 1; i <= legData.length; i++) {
        onTGTSL.push(`Sq Off Leg${i}`)
    }


    const addNewRow = () => {
        if (legData.length < 8) {

            // Create a copy of the existing legData array
            const updatedLegData = [...legData];

            // Create a new object with the same structure as the existing ones
            const newObject = {
                id: updatedLegData.length + 1,
                idle: false,
                side: 'Sell',
                cepe: "ce",
                strike: null,
                strikeValue: null,
                wt: null,
                targetType: null,
                tgtvalue: null,
                stoplossType: null,
                slValue: null,
                trail: null,
                onTarget: [],
                onTargetNoT: null,
                onSL: [],
                onSLNoT: null,
            };

            updatedLegData.push(newObject);
            setLegData(updatedLegData);
        }
    };


    const removeLastRow = () => {
        const updatedLegData = [...legData];

        updatedLegData.pop();

        setLegData(updatedLegData);
    };

    const handleIdle = (index, e) => {
        console.log(e.target.checked, index);
        const updatedLegData = [...legData];
        const objectIndex = updatedLegData.findIndex((item) => item.id === index + 1);
        if (objectIndex !== -1) {
            updatedLegData[objectIndex].idle = e.target.checked
            setLegData(updatedLegData);
        }
        // console.log(legData);
    }

    const handleClickSide = (index) => {
        const updatedLegData = [...legData];
        const objectIndex = updatedLegData.findIndex((item) => item.id === index + 1);

        if (objectIndex !== -1) {
            updatedLegData[objectIndex].side = updatedLegData[objectIndex].side === 'B' ? 'S' : 'B';
            setLegData(updatedLegData);
        }
    };


    const handleClickcp = (index) => {
        const updatedLegData = [...legData];
        const objectIndex = updatedLegData.findIndex((item) => item.id === index + 1);

        if (objectIndex !== -1) {
            updatedLegData[objectIndex].cepe = updatedLegData[objectIndex].cepe === 'C' ? 'P' : 'C';
            setLegData(updatedLegData);
        }
    };



    //selsect strike value
    const handleStrike = (index, e) => {
        const updatedLegData = [...legData];
        const objectIndex = updatedLegData.findIndex((item) => item.id === index + 1);
        updatedLegData[objectIndex].strike = e.target.value
        setLegData(updatedLegData);
    };

    const handleStrikeValue = (index, e) => {
        const updatedLegData = [...legData];
        const objectIndex = updatedLegData.findIndex((item) => item.id === index + 1);
        updatedLegData[objectIndex].strikeValue = e.target.value
        setLegData(updatedLegData);
        // console.log(legData);
    };

    const handleWnT = (index, e) => {
        const updatedLegData = [...legData];
        const objectIndex = updatedLegData.findIndex((item) => item.id === index + 1);
        updatedLegData[objectIndex].wt = e.target.value
        setLegData(updatedLegData);
        // console.log(legData);
    };

    const handleTargetType = (index, e) => {
        const updatedLegData = [...legData];
        const objectIndex = updatedLegData.findIndex((item) => item.id === index + 1);
        updatedLegData[objectIndex].targetType = e.target.value
        setLegData(updatedLegData);
        // console.log(legData);
    };

    const handleTGTValue = (index, e) => {
        const updatedLegData = [...legData];
        const objectIndex = updatedLegData.findIndex((item) => item.id === index + 1);
        updatedLegData[objectIndex].tgtvalue = e.target.value
        setLegData(updatedLegData);
        // console.log(legData);
    };

    const handleSLType = (index, e) => {
        const updatedLegData = [...legData];
        const objectIndex = updatedLegData.findIndex((item) => item.id === index + 1);
        updatedLegData[objectIndex].stoplossType = e.target.value
        setLegData(updatedLegData);
        // console.log(legData);
    };

    const handleSLValue = (index, e) => {
        const updatedLegData = [...legData];
        const objectIndex = updatedLegData.findIndex((item) => item.id === index + 1);
        updatedLegData[objectIndex].slValue = e.target.value
        setLegData(updatedLegData);
        // console.log(legData);
    };

    const handleTrail = (index, e) => {
        const updatedLegData = [...legData];
        const objectIndex = updatedLegData.findIndex((item) => item.id === index + 1);
        updatedLegData[objectIndex].trail = e.target.value
        setLegData(updatedLegData);
        // console.log(legData);
    };

    const handleOnTarget = (rowIndex, selectedValues) => {
        const updatedLegData = [...legData]; // Create a copy of the legData array
        updatedLegData[rowIndex].onTarget = selectedValues.target.value; // Update the onSL array for the specific row

        setLegData(updatedLegData); // Update the state with the new legData
        // console.log(legData);
    };

    const handleonTargetNoT = (index, e) => {
        const updatedLegData = [...legData];
        const objectIndex = updatedLegData.findIndex((item) => item.id === index + 1);
        updatedLegData[objectIndex].onTargetNoT = e.target.value
        setLegData(updatedLegData);
        // console.log(legData);
    };

    const handleOnSL = (rowIndex, selectedValues) => {
        const updatedLegData = [...legData]; // Create a copy of the legData array
        updatedLegData[rowIndex].onSL = selectedValues.target.value; // Update the onSL array for the specific row

        setLegData(updatedLegData); // Update the state with the new legData
        // console.log(legData);
    };

    const handleonSLNoT = (index, e) => {
        const updatedLegData = [...legData];
        const objectIndex = updatedLegData.findIndex((item) => item.id === index + 1);
        updatedLegData[objectIndex].onSLNoT = e.target.value
        setLegData(updatedLegData);
        console.log(legData);
    };


    ////////////////////////////////// strategy setting //////////////////////////////////////////////////


    const handleIndex = (e) => {
        const updatedLegData = StgSetting
        updatedLegData.index = e.target.value
        setStgSetting(updatedLegData)
        // console.log(StgSetting);
    };

    const handleStgTag = (e) => {
        const updatedLegData = StgSetting
        updatedLegData.stgTag = e.target.value
        setStgSetting(updatedLegData)
        // console.log(StgSetting);
    };

    const handleOrderType = (e) => {
        const updatedLegData = StgSetting
        updatedLegData.orderType = e.target.value
        setStgSetting(updatedLegData)
        // console.log(StgSetting);
    };

    const handleentryBuffervalue = (e) => {
        const updatedLegData = StgSetting
        updatedLegData.entryBuffervalue = e.target.value
        setStgSetting(updatedLegData)
        // console.log(StgSetting);
    };

    const handleexitBuffervalue = (e) => {
        const updatedLegData = StgSetting
        updatedLegData.exitBuffervalue = e.target.value
        setStgSetting(updatedLegData)
        // console.log(StgSetting);
    };

    const handleRunonDays = (event) => {
        const selectedValue = event.target.value;
        // Update StgSetting.runonDays with the selected days
        setStgSetting((prevState) => ({
            ...prevState,
            runonDays: selectedValue,
        }));
    };

    const handlestgLevelSL = (e) => {
        const updatedLegData = StgSetting
        updatedLegData.stgLevelSL = e.target.value
        setStgSetting(updatedLegData)
        // console.log(StgSetting);
    };


    const handleonStopLoss = (e) => {
        const updatedLegData = StgSetting
        updatedLegData.onStopLoss = e.target.value
        setStgSetting(updatedLegData)
        // console.log(StgSetting);
    };


    const handlestgLevelprofit = (e) => {
        const updatedLegData = StgSetting
        updatedLegData.stgLevelprofit = e.target.value
        setStgSetting(updatedLegData)
        // console.log(StgSetting);
    };

    const handleonTarget = (e) => {
        const updatedLegData = StgSetting
        updatedLegData.onTarget = e.target.value
        setStgSetting(updatedLegData)
        // console.log(StgSetting);
    };

    const handleStarttTime = (e) => {
        const updatedLegData = StgSetting
        updatedLegData.startTime = e.target.value
        setStgSetting(updatedLegData)
        // console.log(StgSetting);
    };

    const handleendTime = (e) => {
        const updatedLegData = StgSetting
        updatedLegData.endTime = e.target.value
        setStgSetting(updatedLegData)
        // console.log(StgSetting);
    };

    const handlesqoffTime = (e) => {
        const updatedLegData = StgSetting
        updatedLegData.sqoffTime = e.target.value
        setStgSetting(updatedLegData)
        // console.log(StgSetting);
    };

    const saveStrategy = () => {
        StgFunction.addStrategy(StgSetting, legData);
    }

    return (
        <>
            {
                !modalValueLoader ? <div>Loading</div> :

                    // <div>not loading</div>

                    <div >
                        <Box>
                            <FormControl margin='normal' size='small' sx={formStyle}>
                                <InputLabel id="demo-simple-select-label" size='small' >INDEX</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={(e) => handleIndex(e)}
                                    value={Strategy.index}
                                    label="Type"
                                // onChange={handleInput}
                                >
                                    {Index.map((type, index) => {
                                        return <MenuItem value={type} key={index} >{type}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Strategy Tag"
                                id="outlined-size-small"
                                size="small"
                                onChange={handleStgTag}
                                value={Strategy.name}
                                sx={{ width: '180px', mt: '15px', marginLeft: '5px' }}
                            />

                            <Button style={{ marginTop: '1rem', position: 'absolute', left: '85%' }} onClick={() => addNewRow()} variant="outlined" > <AddIcon /> Add leg</Button>
                        </Box>



                        {/* add leg */}

                        <TableContainer style={{ maxHeight: '250px', overflowY: 'auto' }} component={Paper}>
                            <Table sx={{ maxWidth: '100%' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ padding: '0px', position: 'sticky' }} >Leg</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }} >Delete</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }} >Idle</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }} >B/S</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }} >CE/PE</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }} >Strike</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }} >Value</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }} >W & T</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }}>Target</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }}>TGT Value</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }}>Stop Loss</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }}>SL Value</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }}>Trail</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }}>On Target</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }}>No. of Times</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }}>On Stop Loss</TableCell>
                                        <TableCell align="center" sx={{ padding: '0px' }}>No. of Times</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {
                                        legs.map((row, index) => (
                                            <TableRow
                                                key={index}
                                            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center" sx={{ padding: '0px' }} component="th" scope="row">{index + 1}</TableCell>
                                                <TableCell align="center" sx={{ padding: '0px' }} > <Button color='error' size="small" onClick={() => removeLastRow()} ><ClearIcon /></Button> </TableCell>
                                                <TableCell align="center" sx={{ padding: '0px' }} > <Checkbox onClick={(e) => handleIdle(index, e)} /> </TableCell>

                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    {
                                                        Strategy[row].tradeType === 'B' ? (
                                                            <Button variant="contained" size="small" color="success" sx={{ width: '10px' }} onClick={() => handleClickSide(index)}>
                                                                B
                                                            </Button>
                                                        ) : (
                                                            <Button variant="contained" size="small" color="error" onClick={() => handleClickSide(index)}>
                                                                S
                                                            </Button>
                                                        )
                                                    }
                                                </TableCell>

                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    {
                                                        Strategy[row].optionType === 'CE' ? (
                                                            <Button variant="contained" size="small" onClick={() => handleClickcp(index)}>
                                                                C
                                                            </Button>
                                                        ) : (
                                                            <Button variant="contained" size="small" color="secondary" onClick={() => handleClickcp(index)}>
                                                                P
                                                            </Button>
                                                        )
                                                    }
                                                </TableCell>

                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    <>
                                                        <FormControl size='small' sx={{ width: "120px" }} >
                                                            <InputLabel sx={{ fontSize: '12px' }} >{Strategy[row].strikeSelectionType}</InputLabel>
                                                            <Select
                                                                size='small'
                                                                value={Strategy[row].strikeSelectionType}
                                                                onChange={(e) => handleStrike(index, e)}
                                                                style={{ height: '30px', width: '120px' }} // Add custom styles here
                                                            >
                                                                {Strike.map((option) => (
                                                                    <MenuItem key={option} value={option}>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                                                            {/* <Checkbox size='small' checked={row.strike.indexOf(option) > -1} /> */}
                                                                            <ListItemText sx={{ fontSize: '12px' }} primary={option} />
                                                                        </Box>
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </>
                                                </TableCell>

                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    <TextField value={Strategy[row].strikeSelectionValue} type='Number' onChange={(e) => handleStrikeValue(index, e)} id="strikevalue" label="" size="small" variant="standard" sx={{ width: "60px" }} style={{ textAlign: 'center' }} />
                                                </TableCell>

                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    <TextField value={Strategy[row].waitTrade} onChange={(e) => handleWnT(index, e)} id="wt" label="" size="small" variant="standard" sx={{ width: "60px" }} />
                                                </TableCell>

                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    <>
                                                        <FormControl margin="normal" size="small" sx={{ width: "100px" }}>
                                                            <InputLabel sx={{ fontSize: '12px' }} >{Strategy[row].targetType}</InputLabel>
                                                            <Select
                                                                size='small'
                                                                value={Strategy[row].targetType}
                                                                onChange={(e) => handleTargetType(index, e)}
                                                                sx={{ height: "30px" }}
                                                            >
                                                                {Target.map((type, index) => {
                                                                    return <MenuItem value={type} key={index}>{type}</MenuItem>;
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </>
                                                </TableCell>

                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    <TextField value={Strategy[row].targetValue} onChange={(e) => handleTGTValue(index, e)} variant="standard" sx={{ width: "60px" }} />
                                                </TableCell>

                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    <FormControl margin="normal" sx={{ width: "100px" }}>
                                                        <InputLabel>{Strategy[row].sLType}</InputLabel>
                                                        <Select
                                                            size='small'
                                                            value={Strategy[row].sLType}
                                                            onChange={(e) => handleSLType(index, e)}

                                                            sx={{ height: "30px" }}
                                                        >
                                                            {Target.map((type, index) => {
                                                                return <MenuItem value={type} key={index}>{type}</MenuItem>;
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    <TextField value={Strategy[row].sLValue} onChange={(e) => handleSLValue(index, e)} variant="standard" sx={{ width: "60px" }} />
                                                </TableCell>


                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    <TextField value={Strategy[row].trail} type='Number' onChange={(e) => handleTrail(index, e)} variant="standard" sx={{ width: "60px" }} />
                                                </TableCell>

                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    <FormControl margin="normal" sx={{ width: "100px" }}>
                                                        <InputLabel ></InputLabel>
                                                        <Select
                                                            multiple
                                                            sx={{ height: "30px" }}
                                                            value={Strategy[row].onTargetValue}
                                                        // onChange={(event) => { handleOnTarget(index, event) }}
                                                        >
                                                            {onTGTSL.map((type, index) => {
                                                                return <MenuItem value={type} key={index}> <Checkbox checked={Strategy[row].onTargetValue.includes(type)} />{type}  </MenuItem>;
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    {Strategy[row].onTargetValue.includes("ReExecute") || Strategy[row].onTargetValue.includes("ReEntry") ? <TextField type='Number' variant="standard" onChange={(e) => handleonTargetNoT(index, e)} sx={{ width: "60px" }} /> : <TextField disabled type='Number' variant="standard" onChange={(e) => handleonSLNoT(index, e)} sx={{ width: "60px" }} />}
                                                </TableCell>

                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    <FormControl margin="normal" sx={{ width: "100px" }}>
                                                        <InputLabel ></InputLabel>
                                                        <Select
                                                            multiple
                                                            sx={{ height: "30px" }}
                                                            value={Strategy[row].onSLValue}
                                                            // onChange={(event) => { handleOnSL(index, event) }}
                                                        >
                                                            {onTGTSL.map((type, index) => {
                                                                // return <MenuItem value={type} key={index}> <Checkbox checked={Strategy[row].onSLValue.includes(type)} />{type}  </MenuItem>;
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>

                                                <TableCell align="center" sx={{ padding: '0px' }} >
                                                    {/* {Strategy[row].onSLTimes.includes("ReExecute") || Strategy[row].onSLTimes.includes("ReEntry") ? <TextField type='Number' variant="standard" onChange={(e) => handleonSLNoT(index, e)} sx={{ width: "60px" }} /> : <TextField disabled type='Number' variant="standard" onChange={(e) => handleonSLNoT(index, e)} sx={{ width: "60px" }} />} */}
                                                </TableCell>

                                            </TableRow>
                                        ))
                                    }



                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>


                //     {/* Strategy Setting */}

                //     <>
                //         <div style={{ display: 'flex', alignItems: 'center' }} >
                //             <FormControl margin='normal' size="small" sx={{ width: '110px', marginRight: '5px' }} >
                //                 <InputLabel sx={{ fontSize: '13px' }} >Order Type</InputLabel>
                //                 <Select
                //                     size='small'
                //                     onChange={(e) => handleOrderType(e)}
                //                     // value={StgSetting.orderType}
                //                     sx={{ fontSize: '12px', height: '30px' }}
                //                 >
                //                     {OrderType.map((option) => (
                //                         <MenuItem key={option} value={option}>
                //                             <Box sx={{ display: 'flex', alignItems: 'center' }} >
                //                                 <ListItemText sx={{ fontSize: '12px' }} primary={option} />
                //                             </Box>
                //                         </MenuItem>
                //                     ))}
                //                 </Select>
                //             </FormControl>

                //             <FormControl margin='normal' size="small" sx={{ width: '100px', marginRight: '5px' }} >
                //                 <InputLabel id="demo-simple-select-label" >Entry Type</InputLabel>
                //                 <Select
                //                     name='type'
                //                     sx={{ fontSize: '13px' }}
                //                     labelId="demo-simple-select-label"
                //                     id="demo-simple-select"
                //                     label="Type"
                //                     value="SL-Limit"
                //                 >
                //                     {EntryType.map((type, index) => {
                //                         return <MenuItem sx={{ fontSize: '12px' }} value={type} key={index} >{type}</MenuItem>
                //                     })}
                //                 </Select>
                //             </FormControl>

                //             <TextField
                //                 label={
                //                     <Typography variant="body2" sx={{ fontSize: 13 }}>
                //                         Buffer Value
                //                     </Typography>
                //                 }
                //                 onChange={(e) => handleentryBuffervalue(e)}
                //                 id="outlined-size-small"
                //                 size="small"
                //                 sx={{ width: '100px', marginRight: '5px', marginTop: '5px' }}
                //             />

                //             <FormControl margin='normal' size="small" sx={{ width: '100px' }} >
                //                 <InputLabel id="demo-simple-select-label" >Exit Type</InputLabel>
                //                 <Select
                //                     name='type'
                //                     sx={{ fontSize: '13px' }}
                //                     labelId="demo-simple-select-label"
                //                     id="demo-simple-select"
                //                     label="Type"
                //                     value="SL-Limit"
                //                 >
                //                     {EntryType.map((type, index) => {
                //                         return <MenuItem value={type} key={index} >{type}</MenuItem>
                //                     })}
                //                 </Select>
                //             </FormControl>

                //             <TextField
                //                 label={
                //                     <Typography variant="body2" sx={{ fontSize: 13 }}>
                //                         Buffer Value
                //                     </Typography>
                //                 }
                //                 onChange={(e) => handleexitBuffervalue(e)}
                //                 id="outlined-size-small"
                //                 size="small"
                //                 sx={{ width: '100px', marginLeft: '5px', marginTop: '5px' }}
                //             />

                //             <FormControl margin='normal' size="small" sx={{ width: '130px', marginLeft: '320px' }} >
                //                 <InputLabel id="demo-simple-select-label" label='Run on Days' sx={{ fontSize: '13px' }} >
                //                     {StgSetting.runonDays.map((day) => day.slice(0, 2)).join(', ')}
                //                 </InputLabel>
                //                 <Select
                //                     size="small"
                //                     sx={{ fontSize: '13px' }}
                //                     multiple
                //                     value={StgSetting.runonDays || []}
                //                     onChange={handleRunonDays}
                //                 >
                //                     {RunonDays.map((type, index) => {
                //                         return <MenuItem value={type} key={index} >
                //                             <Checkbox checked={StgSetting.runonDays.indexOf(type) !== -1} sx={{ padding: '0px' }} />
                //                             {type}
                //                         </MenuItem>
                //                     })}
                //                 </Select>
                //             </FormControl>
                //         </div>
                //         <div>
                //             <TextField id="outlined-basic" size="small"
                //                 type='Number'
                //                 label={
                //                     <Typography variant="body2" sx={{ fontSize: 14 }}>
                //                         Strategy Level SL
                //                     </Typography>
                //                 }
                //                 onChange={(e) => handlestgLevelSL(e)}
                //                 sx={{ width: '210px', fontSize: '13px' }} variant="outlined" />

                //             <FormControl margin='normal' size="small" sx={{ width: '130px', marginRight: '5px', mt: '0px', ml: '5px' }} >
                //                 <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }} >On StopLoss</InputLabel>
                //                 <Select
                //                     labelId="demo-simple-select-label"
                //                     id="demo-simple-select"
                //                     sx={{ fontSize: '14px' }}
                //                     defaultValue={"None"}
                //                     onChange={(e) => handleonStopLoss(e)}
                //                 >
                //                     {Execute.map((type, index) => {
                //                         return <MenuItem value={type} key={index} >{type}</MenuItem>
                //                     })}
                //                 </Select>
                //             </FormControl>


                //             <TextField id="outlined-basic" size="small"
                //                 label={
                //                     <Typography variant="body2" sx={{ fontSize: 14 }}>
                //                         Option
                //                     </Typography>
                //                 } sx={{ width: '180px', fontSize: '13px' }} variant="outlined" />


                //             <TextField id="outlined-basic" size="small"
                //                 type='time'
                //                 defaultValue="00:00:00"
                //                 value={StgSetting.startTime}
                //                 label={
                //                     <Typography variant="body2" sx={{ fontSize: 14 }}>
                //                         Start Time
                //                     </Typography>
                //                 }
                //                 onChange={(e) => handleStarttTime(e)}
                //                 sx={{ width: '130px', marginLeft: '320px', marginRight: '5px', mt: '5px' }} variant="outlined"
                //                 inputProps={{
                //                     step: 1, // Set the step to 1 to include seconds (hh:mm:ss)
                //                 }}
                //             />

                //             <TextField id="outlined-basic" size="small"
                //                 type='time'
                //                 defaultValue="00:00:00"
                //                 label={
                //                     <Typography variant="body2" sx={{ fontSize: 14 }}>
                //                         End Time
                //                     </Typography>
                //                 }
                //                 onChange={(e) => handleendTime(e)}
                //                 sx={{ width: '130px', marginRight: '5px', mt: '5px' }} variant="outlined"
                //                 inputProps={{
                //                     step: 1, // Set the step to 1 to include seconds (hh:mm:ss)
                //                 }}
                //             />

                //             <TextField id="outlined-basic" size="small"
                //                 type='time'
                //                 defaultValue="00:00:00"
                //                 label={
                //                     <Typography variant="body2" sx={{ fontSize: 14 }}>
                //                         SqOff Time
                //                     </Typography>
                //                 }
                //                 onChange={(e) => handlesqoffTime(e)}
                //                 sx={{ width: '130px', marginRight: '5px', mt: '5px' }} variant="outlined"
                //                 inputProps={{
                //                     step: 1, // Set the step to 1 to include seconds (hh:mm:ss)
                //                 }}
                //             />
                //         </div>
                //         <div>
                //             <TextField id="outlined-basic" size="small"
                //                 type='Number'
                //                 label={
                //                     <Typography variant="body2" sx={{ fontSize: 14 }}>
                //                         Strategy Level Profit Booking
                //                     </Typography>
                //                 }
                //                 onChange={(e) => handlestgLevelprofit(e)}
                //                 sx={{ marginTop: '5px', width: '210px' }} variant="outlined" />

                //             <FormControl margin='normal' size="small" sx={{ width: '130px', marginRight: '5px', mt: '5px', ml: '5px' }} >
                //                 <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }} >On Target</InputLabel>
                //                 <Select
                //                     labelId="demo-simple-select-label"
                //                     id="demo-simple-select"
                //                     sx={{ fontSize: '14px' }}
                //                     defaultValue={"None"}
                //                     onChange={(e) => handleonTarget(e)}
                //                 >
                //                     {Execute.map((type, index) => {
                //                         return <MenuItem value={type} key={index} >{type}</MenuItem>
                //                     })}
                //                 </Select>
                //             </FormControl>

                //             <TextField id="outlined-basic" size="small"
                //                 label={
                //                     <Typography variant="body2" sx={{ fontSize: 14 }}>
                //                         Option
                //                     </Typography>
                //                 } sx={{ width: '180px', fontSize: '13px' }} variant="outlined" />

                //         </div>

                //         <Button style={{ marginTop: '1rem' }} onClick={saveStrategy} variant="outlined" color='success' > <AddIcon /> Save Strategy</Button>
                //     </>

                // </div>
            }
        </>
    );
}

export default UpdateStg