import React from 'react';
import { Modal, TextField, Button, Box } from '@mui/material'
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'



const EditClient = (props) => {

    const [loading, setLoading] = useState(false)
    const [modalValueLoader, setModalValueLoader] = useState(false)
    const [ClientData, setClientData] = useState({
        firstName: "", email: "", contactNumber: "", UserId: "", Password: "", Api: "", Secret: "", Pan: "", t2f: "", multiplier: null, maxLoss: null, maxLossWaitSecond: null, maxProfit: null
    });

    let name, value;
    const handleInput = (e) => {
        console.log(e.target.value);
        name = e.target.name;
        value = e.target.value;
        setClientData({ ...ClientData, [name]: value })
    }

    async function fetchUsersDetails() {
        try {
            setModalValueLoader(true)
            const response = await fetch(`/admin/user/details/${props.clientId}`);
            response.json().then(data => {
                // console.log(data.user);
                setClientData(data.user)
                setModalValueLoader(false)
            })
        } catch (err) {
            console.log(err);
        }
    }



    const PostServer = async (e) => {
        setLoading(true);
        e.preventDefault();
        let { firstName, email, contactNumber, UserId, Password, Api, Secret, Pan, t2f, multiplier, maxLoss, maxLossWaitSecond, maxProfit } = ClientData;

        const headers = {
            'Content-Type': 'application/json'
        };

        const Body = { firstName, email, contactNumber, UserId, Password, Api, Secret, Pan, t2f, multiplier, maxLoss, maxLossWaitSecond, maxProfit }
        console.log(Body);

        axios.post(`/admin/user/update/${props.clientId}`, Body, { headers })
            .then(response => {
                console.log(response);
                if (response.status === 201) {
                    handleClose()
                    window.alert(response.data.message);
                    setLoading(false)
                } else {
                    window.alert(response.data.Error);
                    setLoading(false)
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const textboxstyle = {
        height: '40px',
        width: '45%',
        marginRight: "5%"
    }

    useEffect(() => {
        // console.log("Hello", props.clientId);
        if (props.clientId !== "") handleOpen()
        fetchUsersDetails()

    }, [props.clientId])
    return (
        <>
            <div>
                {/* <Button onClick={handleOpen}><AddIcon fontSize="large" /></Button> */}
                {/* <Button style={{ marginTop: '1rem' }} color='success' variant="contained" onClick={handleOpen} > <AddIcon /> Add Client</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <form method='POST'>
                        <Box sx={style}>
                            {modalValueLoader ? <CircularProgress color="inherit" />
                                : <>
                                    <TextField className="firstName" name='firstName' label='Name' placeholder='Enter Name' margin='normal' value={ClientData.firstName} onChange={handleInput} style={textboxstyle} />
                                    <TextField className="email" name='email' label='Email' placeholder='Enter Email' margin='normal' value={ClientData.email} onChange={handleInput} style={textboxstyle} />
                                    <TextField className="contactNumber" name='contactNumber' label='Contact Number' placeholder='Enter Contact Number' margin='normal' value={ClientData.contactNumber} onChange={handleInput} style={textboxstyle} />
                                    <TextField className="UserId" name='UserId' label='Client Id' placeholder='Enter Client Id' margin='normal' value={ClientData.UserId} onChange={handleInput} style={textboxstyle} />
                                    <TextField className="Password" name='Password' label='Password' placeholder='Enter Password' margin='normal' value={ClientData.Password} onChange={handleInput} fullWidth required style={textboxstyle} />
                                    <TextField className="Api" name='Api' label='Api' placeholder='Enter Api' margin='normal' value={ClientData.Api} onChange={handleInput} fullWidth required style={textboxstyle} />
                                    <TextField className="Secret" name='Secret' label='Secret' placeholder='Enter Secret' margin='normal' value={ClientData.Secret} onChange={handleInput} fullWidth required style={textboxstyle} />
                                    <TextField className="Pan" name='Pan' label='Pan' placeholder='Enter Pin/Pan' margin='normal' value={ClientData.Pan} onChange={handleInput} fullWidth required style={textboxstyle} />
                                    <TextField className="t2f" name='t2f' label='Two FA' placeholder='Enter Two FA' margin='normal' value={ClientData.t2f} onChange={handleInput} fullWidth required style={textboxstyle} />
                                    <TextField className="multiplier" name='multiplier' label='Multiplier' placeholder='Enter Multiplier' margin='normal' value={ClientData.multiplier} onChange={handleInput} fullWidth required style={textboxstyle} />
                                    <TextField className="maxLoss" name='maxLoss' label='maxLoss' placeholder='Enter maxLoss' margin='normal' value={ClientData.maxLoss} onChange={handleInput} fullWidth required style={textboxstyle} />
                                    <TextField className="maxLossWaitSecond" name='maxLossWaitSecond' label='maxLossWaitSecond' placeholder='Enter maxLossWaitSecond' margin='normal' value={ClientData.maxLossWaitSecond} onChange={handleInput} fullWidth required style={textboxstyle} />
                                    <TextField className="maxProfit" name='maxProfit' label='maxProfit' placeholder='Enter maxProfit' margin='normal' value={ClientData.maxProfit} onChange={handleInput} fullWidth required style={textboxstyle} />
                                    <Button className='signupbutton' type='submit' color='success' variant="contained" onClick={PostServer} style={{ marginTop: '20px', width: "90%", marginLeft: "2.5%" }} > Update </Button>
                                </>
                            }
                        </Box>
                    </form>
                </Modal>
            </div>
        </>
    )
}

export default EditClient