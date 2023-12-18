import React from 'react';
import { Modal, TextField, InputLabel, Select, MenuItem, Button, Box, FormControl, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddLeg from '../SubModels/AddLeg'
import axios from 'axios'



const AddStrategy = () => {

  const [open, setOpen] = useState(false);
  const [stgList, setStgList] = useState([]);
  const [stgTag, setStgTag] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  async function fetchStgList() {
    try {
      const response = await axios.get(`/strategy/list`);
      // console.log(response.data.staregyLists);
      setStgList(response.data.staregyLists);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchTagList() {
    try {
      const response = await axios.get(`/strategy/listTag`);
      // console.log(response.data.tagLists);
      setStgTag(response.data.tagLists)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTagList()
    fetchStgList()
  }, [])

  return (
    <>
      <div>
        {/* <Button onClick={handleOpen}><AddIcon fontSize="large" /></Button> */}
        <Button style={{ marginTop: '1rem' }} color='success' variant="contained" onClick={handleOpen} > <AddIcon /> Add strategy</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form method='POST'>
            <Box sx={style}>
              <AddLeg stgTag={stgTag} stgList={stgList} />
            </Box>
          </form>

        </Modal>
      </div>
    </>
  )
}

export default AddStrategy