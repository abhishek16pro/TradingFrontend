import React, { useState } from 'react'
import { Grid, TextField, Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import './Login.css'


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)


    const loginChange = async (e) => {
        setLoading(true);
        e.preventDefault();

        const res = await fetch('/admin/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();
        // console.log(res);

        if (res.status !== 201 || !data) {
            setLoading(false);
            window.alert("Access Denied");
        } else {
            // window.alert("success");
            setLoading(false);
            navigate("/home/dashboard");
        }
    }

    const paperStyle = { padding: 15, width: 360 }
    const btnstyle = { backgroundColor: '#001FFF', margin: '8px 1' }
    return (
        <>
            <form method='POST'>
                <div className='main' >
                    <div className="login">
                        <div style={paperStyle}>
                            <Grid align='center' style={{ marginBottom: 40}}>
                                
                                <h2>Welcome</h2>
                            </Grid>
                                <CssBaseline/>
                                <TextField className="email" name='email' label='Email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
                                <TextField className="password" name='password' label='Password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' margin='normal' fullWidth required />
                                {/* <TextField className="token" name='token' label='Token' placeholder='Enter token' value={password}  type='token' margin='normal' fullWidth required /> */}
                            
                            <Button className='signupbutton'  type='submit' color='success' variant="contained" onClick={loginChange} style={btnstyle} fullWidth> { loading ? <CircularProgress color="inherit" />
                            : <div>Sign In</div> }</Button>
                        </div>
                    </div>
                </div>
            </form>
        </>

    )
}

export default Login