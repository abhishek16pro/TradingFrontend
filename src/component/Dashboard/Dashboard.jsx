import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material'
import axios from 'axios';




function Dashboard() {

    const [loading, setLoading] = useState(false);
    const [formattedRows, setformattedRows] = useState([]);
    const [selectedIDs, setSelectedIDs] = useState([]);

    const columns = [
        {
            field: 'logout', headerName: 'Logout', width: 60, sortable: false, renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button style={{ border: "none", background: "none", cursor: "pointer" }}
                        onClick={() => handleLogoutIds(params.id)}
                    >
                        <PowerSettingsNewIcon style={{ color: "#1976d2" }} />
                    </button>
                </div>
            ),
            filterable: false
        },
        {
            field: 'manualsqoff', headerName: 'Manual Sq Off', width: 120, sortable: false, renderCell: () => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button style={{ border: "none", background: "none", cursor: "pointer" }}>
                        <RemoveCircleOutlineIcon style={{ color: "#147fbb" }} />
                    </button>
                </div>
            ),
            filterable: false
        },
        {
            field: 'login', headerName: 'Login', width: 70, type: 'boolean'
        },
        { field: 'mtm', headerName: 'MTM', width: 90 },
        { field: 'availablemargin', headerName: 'Available Margin', width: 130 },
        { field: 'dealer/client', headerName: 'Dealer/Client', width: 100, sortable: false, filterable: false },
        { field: 'clientid', headerName: 'Client Id', width: 100, },
        { field: 'maxloss', headerName: 'Max Loss', width: 80, sortable: false, filterable: false },
        { field: 'maxlosswaitsec', headerName: 'Max Loss Wait Sec', width: 150, sortable: false, filterable: false },
        { field: 'maxprofit', headerName: 'Max Profit', width: 100, sortable: false, filterable: false },
    ];

    async function fetchUsers() {
        try {
            setLoading(true);
            const response = await axios.get(`/admin/user/Users`);
            const data = response.data;
            console.log(data);
            const dataRows = data.UserId.map((user, index) => ({
                id: user.UserId,
                clientid: user.UserId,
                name: user.firstName,
                login: user.active,
                maxloss: user.maxLoss,
                maxlosswaitsec: user.maxLossWaitSecond,
                maxprofit: user.maxProfit,
                // Add more fields here
            }));

            setformattedRows(dataRows);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    //function to login seleted ids
    async function handleLoginIds() {
        // console.log(selectedIDs);
        try {
            const headers = {
                "Content-Type": "application/json"
            }
            const body = {
                "UserIds": selectedIDs,
                "active": true
            }
            const response = await axios.post(`/admin/user/bulkstatus`, body, headers);
            console.log(response);
            window.location.reload();

        } catch (err) {
            console.log(err);
        }

    }

    async function handleLogoutIds(Ids) {
        try {
            const headers = {
                "Content-Type": "application/json"
            }
            const body = {
                "UserIds": [Ids],
                "active": false
            }
            const response = await axios.post(`/admin/user/bulkstatus`, body, headers);
            window.location.reload();

        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (<>
        <div style={{ height: 400, width: '100%' }}>
            {loading ? <CircularProgress color="inherit" />
                :
                <DataGrid
                    rows={formattedRows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    checkboxSelection
                    disableRowSelectionOnClick
                    hideFooter
                    onRowSelectionModelChange={(Ids) => setSelectedIDs(Ids)}
                />
            }
            <Button style={{ marginTop: '1rem' }} variant="outlined" color='success' onClick={handleLoginIds} > Verify Login</Button>
            <Button style={{ marginTop: '1rem', position:'absolute', right:'10px' }} variant="outlined" color='success' > Reconcile Positions</Button>
        </div>
    </>
    );
}
export default Dashboard;