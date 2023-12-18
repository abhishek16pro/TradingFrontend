import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';
import { Modal, Button, Box } from '@mui/material'
import SetMultiplier from './SetMultiplier';
import axios from 'axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    height: '70%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Dashboard() {

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [formattedRows, setformattedRows] = useState([]);
    const [editModaltState, seteditModaltState] = useState(false);
    const [StgId, setSgId] = useState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        seteditModaltState(false)
    };

    const columns = [

        {
            field: 'delete', headerName: 'Delete', width: 80, sortable: false, renderCell: () => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button style={{ border: "none", background: "none", cursor: "pointer" }}
                        onClick={(e) => e.stopPropagation()}>
                        <ClearIcon style={{ color: "red" }} />
                    </button>
                </div>
            ),
            disableSelectionOnClick: true,
            filterable: false
        },
        {
            field: 'manualsqoff', headerName: 'Manual Sq Off', width: 120, sortable: false, renderCell: () => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button style={{ border: "none", background: "none", cursor: "pointer" }}
                        onClick={(e) => e.stopPropagation()}>
                        <RemoveCircleOutlineIcon style={{ color: "#147fbb" }} />
                    </button>
                </div>
            ),
            disableSelectionOnClick: true,
            filterable: false
        },

        { field: 'strategytag', headerName: 'Strategy Tag', width: 120 },
        { field: 'pnl', headerName: 'PnL', width: 70 },
        // { field: 'mappedaccount', headerName: 'Mapped Account', width: 120, sortable: false, disableSelectionOnClick: true, filterable: false },
        {
            field: 'mappedaccount', headerName: 'Mapped Account', width: 120, sortable: false, renderCell: (params) => (
                <button
                    onClick={() => {
                        handleEditButtonClick(params.row.strategytag)
                    }
                    } >
                    Set Multiplier
                </button>
            ),
            disableSelectionOnClick: true,
            filterable: false
        },
        {
            field: 'edit', headerName: 'Edit', width: 100, sortable: false, renderCell: (params) => (
                <Button
                    variant="contained"
                    color="success"
                    style={{ height: "30px", width: "20px" }}
                >
                    Edit
                </Button>
            ),
            disableSelectionOnClick: true,
            filterable: false
        },
    ];



    async function fetchTags() {
        try {
            setLoading(true);
            const response = await axios.get(`/strategy/listTag`);  //change the api of strategy
            // console.log(response.data.tagLists);
            // console.log(data.staregyLists);
            const dataRows = response.data.tagLists.map((value, index) => ({
                id: index + 1,
                strategytag: value.tag

                //add more field here
            }));
            // console.log(dataRows);
            setformattedRows(dataRows)
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handleEditButtonClick = (strategytag) => {
        // console.log(clientid);
        setSgId(strategytag)
        seteditModaltState(true)
        // console.log(editModaltState);
    };

    useEffect(() => {
        fetchTags()
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
                    disableRowSelectionOnClick
                    hideFooter
                />
            }
        </div>
        {editModaltState &&
            <Modal
                open={editModaltState}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form method='POST'>
                    <Box sx={style}>
                        <SetMultiplier id={StgId} />
                    </Box>
                </form>

            </Modal>
        }
    </>
    );
}
export default Dashboard;