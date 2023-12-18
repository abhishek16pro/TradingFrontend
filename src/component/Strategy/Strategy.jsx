import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import AddStrategy from '../Models/AddStrategy/AddStrategy'
import UpdateStg from '../Models/UpdateStg/UpdateStg';
import { Modal, Button, Box } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    height: '70%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [formattedRows, setformattedRows] = useState([]);
    const [editModaltState, seteditModaltState] = useState(false);
    const [strategyId, setStrategyId] = useState();
    const [strategyData, setStrategyData] = useState();



    const handleOpen = (tag) => {
        for (const i in strategyData) {
            // console.log(typeof(tag), typeof(strategyData[i].name));
            if (tag === strategyData[i].name) {
                setStrategyId(strategyData[i]._id)
            }
        }
        seteditModaltState(true);
    }
    const handleClose = () => seteditModaltState(false)

    const columns = [

        { field: 'status', headerName: 'Satus', width: 80 },
        { field: 'portfoilioname', headerName: 'Portfoilio Name', width: 150 },
        { field: 'symbol', headerName: 'Symbol', width: 80, sortable: false, disableSelectionOnClick: true, filterable: false },
        { field: 'pnl', headerName: 'PnL', width: 50, sortable: false, disableSelectionOnClick: true, filterable: false },
        { field: 'exectute/sqoff', headerName: 'Exectute/SQ off', width: 120, sortable: false, disableSelectionOnClick: true, filterable: false },

        {
            field: 'edit', headerName: 'Edit', width: 100, sortable: false, renderCell: (params) => (
                <button
                    // variant="contained"
                    // color="success"
                    // style={{ height: "30px", width: "20px" }}
                    onClick={() => handleOpen(params.row.strategytag)}
                >
                    Edit
                </button>
            ),
            disableSelectionOnClick: true,
            filterable: false
        },

        // { field: 'edit', headerName: 'Edit', width: 50, sortable: false, disableSelectionOnClick: true, filterable: false },
        { field: 'makecopy', headerName: 'Make Copy', width: 100, sortable: false, disableSelectionOnClick: true, filterable: false },
        { field: 'markascomplete', headerName: 'Mark as complete', width: 150, sortable: false, disableSelectionOnClick: true, filterable: false },
        { field: 'strategytag', headerName: 'Strategy Tag', width: 100, sortable: false, disableSelectionOnClick: true, filterable: false },
        { field: 'reset', headerName: 'Reset', width: 80, sortable: false, disableSelectionOnClick: true, filterable: false },
    ];

    async function fetchUsers() {
        try {
            setLoading(true);
            const response = await fetch(`/strategy/list`);  //change the api of strategy
            response.json().then(data => {
                // console.log(data?.staregyLists);
                setStrategyData(data.staregyLists)
                const dataRows = data.staregyLists.map((value, index) => ({
                    id: index + 1,
                    strategytag: value.name

                }))
                // console.log(dataRows);
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
                    // pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    hideFooter
                />
            }
        </div>
        <AddStrategy />
        {editModaltState &&
            <Modal
                open={editModaltState}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form method='POST'>
                    <Box sx={style}>
                        <UpdateStg id={strategyId} />
                    </Box>
                </form>
            </Modal>
        }
    </>
    );
}
export default Dashboard;