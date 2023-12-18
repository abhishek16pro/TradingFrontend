import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import Addclient from '../Models/AddClient/AddClient';
import EditClient from "../Models/EditClient/EditClient"
import CircularProgress from '@mui/material/CircularProgress';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import axios from 'axios';

function UserSettings() {

    const [loading, setLoading] = useState(false);
    const [formattedRows, setformattedRows] = useState([]);
    const [editModaltState, seteditModaltState] = useState(false);
    const [clientId, setclientId] = useState();
    const [parentAcc, setParentAcc] = useState("");


    const columns = [
        {
            field: 'delete', headerName: 'Delete', width: 90, sortable: false, renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button style={{ border: "none", background: "none", cursor: "pointer" }}
                        onClick={() => handleDeleteUser(params.row.clientid)}>
                        <ClearIcon style={{ color: "red" }} />
                    </button>
                </div>
            ),
            disableSelectionOnClick: true,
            filterable: false
        },
        { field: 'mapped', headerName: 'Mapped', width: 100, sortable: false, filterable: false },
        { field: 'clientid', headerName: 'Client Id', width: 100, sortable: false },
        {
            field: 'edit', headerName: 'Edit', width: 100, sortable: false, renderCell: (params) => (
                <Button
                    variant="contained"
                    color="success"
                    style={{ height: "30px", width: "20px" }}
                    onClick={() => handleEditButtonClick(params.row.clientid)} >
                    Edit
                </Button>
            ),
            disableSelectionOnClick: true,
            filterable: false
        },
    ];

    async function handleDeleteUser(clientId) {
        try {
            const response = await axios.post(`/admin/user/delete/${clientId}`)
            window.alert(response.data.message);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    const handleEditButtonClick = (clientid) => {
        // console.log(clientid);
        setclientId(clientid)
        seteditModaltState(true)
    };

    async function handleParent(e) {
        // console.log(e.target.value);
        const clientid = e.target.value
        try {

            const Body = { parent: true }

            const parent = await axios.post(`/admin/user/update/${clientid}`, Body)
            if (parent.status === 201) {
                window.alert(parent.data.message);
                setLoading(false)
                setParentAcc(clientid)
            } else {
                window.alert(parent.data.Error);
                setLoading(false)
            }

        } catch (error) {
            console.log(error);
        }


    }



    async function fetchUsers() {
        try {
            setLoading(true);
            const response = await fetch(`/admin/user/Users`);
            response.json().then(data => {

                //Setting parent Account
                // console.log(data.UserId);
                const foundAcc = data.UserId.find(Acc => Acc.parent === true)
                setParentAcc(foundAcc.UserId);
                // const targetRoleId = roleData.find(role => role.roleName === selectedRole);

                const dataRows = data.UserId.map((user, index) => ({
                    id: index + 1,
                    clientid: user.UserId,
                    name: user.firstName,
                    mapped: true
                    //add more field here
                }));
                setformattedRows(dataRows)
                setLoading(false);
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])


    return (<>
        <div style={{ height: 500, width: '100%' }}>
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
                    pageSizeOptions={[5, 10]}
                    // checkboxSelection
                    hideFooterRowCount={true}
                    hideFooter
                />
            }
        </div>
        <Box style={{ display: "flex" }} >
            <Addclient />
            <FormControl fullWidth margin="normal" style={{ width: "150px", marginLeft: '5px' }} size='small' >
                <InputLabel placeholder='Role'>Parent</InputLabel>
                <Select
                    value={parentAcc}
                    onChange={(e) => handleParent(e)}
                >
                    {formattedRows.map((type, index) => {
                        return <MenuItem value={type.clientid} key={index}>{type.clientid}</MenuItem>;
                    })}
                </Select>
            </FormControl>
        </Box >
        {editModaltState && <EditClient clientId={clientId} />
        }



    </>
    );
}

export default UserSettings;