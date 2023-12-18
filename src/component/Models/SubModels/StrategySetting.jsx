import React, { useEffect, useState } from 'react';
import { TextField, InputLabel, Select, MenuItem, FormControl, Typography } from '@mui/material'



function StrategySetting() {

    const OrderType = ['NRML', 'MIS']
    const EntryType = ['SL-Limit']
    const RunonDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const Execute = ['Execute Other Portfolio', 'ReExecute', 'None']

    const [error, setError] = useState('');
    const [StgSetting, setStgSetting] = useState({
        orderType: null,
        entryType: null,
        entryBuffervalue: null,
        exitType: null,
        entryBuffervalue: null,
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

    const handleTimeChange = (event) => {
        console.log(event.target.value);
        const newTime = event.target.value;
        if (isValidTime(newTime)) {
            setStgSetting({
                ...StgSetting, // Copy the existing state
                startTime: newTime, // Update the startTime property
            });
            setError('');
        } else {
            setError('Invalid time');
        }
    };

    const isValidTime = (inputTime) => {
        const startTime = '09:15:00';
        const endTime = '15:30:00';

        return inputTime >= startTime && inputTime <= endTime;
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }} >
                <FormControl margin='normal' size="small" sx={{ width: '110px', marginRight: '5px' }} >
                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: '13px' }} >Order Type</InputLabel>
                    <Select
                        name='type'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{ fontSize: '13px' }}
                    >
                        {OrderType.map((type, index) => {
                            return <MenuItem value={type} key={index} >{type}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <FormControl margin='normal' size="small" sx={{ width: '100px', marginRight: '5px' }} >
                    <InputLabel id="demo-simple-select-label" >Entry Type</InputLabel>
                    <Select
                        name='type'
                        sx={{ fontSize: '13px' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type"
                        value="SL-Limit"
                    >
                        {EntryType.map((type, index) => {
                            return <MenuItem value={type} key={index} >{type}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <TextField
                    label={
                        <Typography variant="body2" sx={{ fontSize: 13 }}>
                            Buffer Value
                        </Typography>
                    }
                    id="outlined-size-small"
                    size="small"
                    sx={{ width: '100px', marginRight: '5px', marginTop: '5px' }}
                />

                <FormControl margin='normal' size="small" sx={{ width: '100px' }} >
                    <InputLabel id="demo-simple-select-label" >Exit Type</InputLabel>
                    <Select
                        name='type'
                        sx={{ fontSize: '13px' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type"
                        value="SL-Limit"
                    >
                        {EntryType.map((type, index) => {
                            return <MenuItem value={type} key={index} >{type}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <TextField
                    label={
                        <Typography variant="body2" sx={{ fontSize: 13 }}>
                            Buffer Value
                        </Typography>
                    }
                    id="outlined-size-small"
                    size="small"
                    sx={{ width: '100px', marginLeft: '5px', marginTop: '5px' }}
                />

                <FormControl margin='normal' size="small" sx={{ width: '130px', marginLeft: '320px' }} >
                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: '13px' }} >Runs on Days</InputLabel>
                    <Select
                        name='type'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type"
                        sx={{ fontSize: '13px' }}
                    >
                        {RunonDays.map((type, index) => {
                            return <MenuItem value={type} key={index} >{type}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
            <div>
                <TextField id="outlined-basic" size="small"
                    label={
                        <Typography variant="body2" sx={{ fontSize: 14 }}>
                            Strategy Level SL
                        </Typography>
                    } sx={{ width: '210px', fontSize: '13px' }} variant="outlined" />

                <FormControl margin='normal' size="small" sx={{ width: '130px', marginRight: '5px', mt: '0px', ml: '5px' }} >
                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }} >On StopLoss</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{ fontSize: '14px' }}
                        defaultValue={"None"}
                    >
                        {Execute.map((type, index) => {
                            return <MenuItem value={type} key={index} >{type}</MenuItem>
                        })}
                    </Select>
                </FormControl>


                <TextField id="outlined-basic" size="small"
                    label={
                        <Typography variant="body2" sx={{ fontSize: 14 }}>
                            Option
                        </Typography>
                    } sx={{ width: '180px', fontSize: '13px' }} variant="outlined" />


                <TextField id="outlined-basic" size="small"
                    type='time'
                    defaultValue="00:00:00"
                    value={StgSetting.startTime}
                    onChange={handleTimeChange}
                    label={
                        <Typography variant="body2" sx={{ fontSize: 14 }}>
                            Start Time
                        </Typography>
                    }
                    sx={{ width: '130px', marginLeft: '320px', marginRight: '5px', mt: '5px' }} variant="outlined"
                    inputProps={{
                        step: 1, // Set the step to 1 to include seconds (hh:mm:ss)
                    }}
                />

                <TextField id="outlined-basic" size="small"
                    type='time'
                    defaultValue="00:00:00"
                    label={
                        <Typography variant="body2" sx={{ fontSize: 14 }}>
                            End Time
                        </Typography>
                    }
                    sx={{ width: '130px', marginRight: '5px', mt: '5px' }} variant="outlined"
                    inputProps={{
                        step: 1, // Set the step to 1 to include seconds (hh:mm:ss)
                    }}
                />

                <TextField id="outlined-basic" size="small"
                    type='time'
                    defaultValue="00:00:00"
                    label={
                        <Typography variant="body2" sx={{ fontSize: 14 }}>
                            SqOff Time
                        </Typography>
                    }
                    sx={{ width: '130px', marginRight: '5px', mt: '5px' }} variant="outlined"
                    inputProps={{
                        step: 1, // Set the step to 1 to include seconds (hh:mm:ss)
                    }}
                />
            </div>
            <div>
                <TextField id="outlined-basic" size="small"
                    label={
                        <Typography variant="body2" sx={{ fontSize: 14 }}>
                            Strategy Level Profit Booking
                        </Typography>
                    }
                    sx={{ marginTop: '5px', width: '210px' }} variant="outlined" />

                <FormControl margin='normal' size="small" sx={{ width: '130px', marginRight: '5px', mt: '5px', ml: '5px' }} >
                    <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }} >On Target</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{ fontSize: '14px' }}
                        defaultValue={"None"}
                    >
                        {Execute.map((type, index) => {
                            return <MenuItem value={type} key={index} >{type}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <TextField id="outlined-basic" size="small"
                    label={
                        <Typography variant="body2" sx={{ fontSize: 14 }}>
                            Option
                        </Typography>
                    } sx={{ width: '180px', fontSize: '13px' }} variant="outlined" />
                    
                <FormControl margin='normal' size="small" sx={{ width: '120px', ml: '5px' }} >
                    <InputLabel>{error && <Typography color="error">{error}</Typography>}</InputLabel>
                </FormControl>

            </div>
        </>
    );
}

export default StrategySetting