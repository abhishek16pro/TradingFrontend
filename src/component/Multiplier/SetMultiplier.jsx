import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, TextField } from '@mui/material'

const SetMultiplier = (props) => {
    // console.log(props);

    const [loading, setLoading] = useState(false);
    const [formattedRows, setformattedRows] = useState([]);
    const [selectedIDs, setSelectedIDs] = useState([]);
    // const [dataRows, setDataRows] = useState([]);

    const columns = [
        { field: 'clientid', headerName: 'Client Id', width: 200, sortable: false },
        {
            field: 'multiplier', headerName: 'multiplier', width: 200, sortable: false, filterable: false,
            renderCell: (params) => (
                <TextField
                    // variant="contained"
                    // color="success"
                    // style={{ height: "30px", width: "20px" }}
                    // onClick={() => handleEditButtonClick(params.row.clientid)} 
                    value={params.row.multiplier}
                    onChange={(e) => handleMultiplierChange(params.row.id, e.target.value)}
                >
                    {/* {params.row.multiplier} */}
                </TextField>
            ),
            disableSelectionOnClick: true,
        },

    ];


    async function fetchUsers() {
        try {
            setLoading(true);
            const response = await fetch(`/admin/user/Users`);
            response.json().then(data => {
                // console.log(data.UserId);
                const dataRows = data.UserId.map((user, index) => ({
                    id: index + 1,
                    // mongoId: user._id,
                    clientid: user.UserId,
                    multiplier: user.multiplier
                    //add more field here
                }));
                setformattedRows(dataRows)
                setLoading(false);
            })

        } catch (err) {
            console.error(err);
        }
    }

    const handleMultiplierChange = (index, newValue) => {
        const updatedRows = [...formattedRows];
        updatedRows[index - 1].multiplier = newValue;
        setformattedRows(updatedRows);
    };


    const handleApply = async () => {
        const selectedRows = formattedRows.filter((row) => selectedIDs.includes(row.id));
        // console.log(props.id);
        // console.log("Selected Row Details:", selectedRows);

        let requestBody = {
            "tag": props.id,
            "mappedAccount": []
        }

        for (const account in selectedRows) {
            let obj = {}
            obj["active"] = true
            obj["clientId"] = selectedRows[account].clientid
            obj["multiplier"] = selectedRows[account].multiplier
            requestBody.mappedAccount.push(obj)
        }

        console.log(requestBody);
        const updateStg = await axios.post(`/strategy/updateTag`, requestBody)
        console.log(updateStg.data);
        // window.alert("Account Mapped Successfully");
        // window.location.reload();
    };

    const handleSelectionChange = (newSelection) => {
        setSelectedIDs(newSelection);
    };

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            <div>
                {loading ? <CircularProgress color="inherit" />
                    :
                    <>
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
                            // hideFooterRowCount={true}
                            onRowSelectionModelChange={(Ids) => handleSelectionChange(Ids)}
                        />

                        <Button style={{ marginTop: '1rem' }} variant="outlined" color='success' onClick={handleApply} > Apply</Button>
                    </>
                }
            </div >
        </>

    )
}

export default SetMultiplier