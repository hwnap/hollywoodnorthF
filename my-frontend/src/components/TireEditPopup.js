import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function TireEditPopup({ open, onClose, tire, onSave }) {
  const [tireData, setTireData] = useState({
    _id: '',
    brand: '',
    size: '',
    treadCondition: '',
    status: '',
    imageUrl: ''
  });

  useEffect(() => {
    // When the tire prop changes, update the state
    if (tire) {
      setTireData({
        _id: tire._id,
        brand: tire.brand,
        size: tire.size,
        treadCondition: tire.treadCondition,
        status: tire.status,
        imageUrl: tire.imageUrl
      });
    }
  }, [tire]);

  const handleChange = (e) => {
    setTireData({ ...tireData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(tireData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Tire</DialogTitle>
      <DialogContent>
        <TextField 
          name="brand" 
          label="Brand" 
          fullWidth 
          margin="dense" 
          variant="standard" 
          value={tireData.brand}
          onChange={handleChange} 
        />
        <TextField 
          name="size" 
          label="Size" 
          fullWidth 
          margin="dense" 
          variant="standard" 
          value={tireData.size}
          onChange={handleChange} 
        />
        <TextField 
          name="treadCondition" 
          label="Tread Condition" 
          fullWidth 
          margin="dense" 
          variant="standard" 
          value={tireData.treadCondition}
          onChange={handleChange} 
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            value={tireData.status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="posted">Posted</MenuItem>
            <MenuItem value="not posted">Not Posted</MenuItem>
            <MenuItem value="sold">Sold</MenuItem>
            <MenuItem value="not sold">Not Sold</MenuItem>
          </Select>
        </FormControl>
        <TextField 
          name="imageUrl" 
          label="Image URL" 
          fullWidth 
          margin="dense" 
          variant="standard" 
          value={tireData.imageUrl}
          onChange={handleChange} 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TireEditPopup;
