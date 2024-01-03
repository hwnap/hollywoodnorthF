// src/components/AddTirePopup.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function AddTirePopup({ open, onClose, onAddTire }) {
  const [tireData, setTireData] = useState({
    brand: '',
    size: '',
    treadCondition: '',
    status: '',
    imageUrls: '',
    location: '',
    setInfo: '',
    season: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'imageUrls') {
      setTireData({ ...tireData, [e.target.name]: e.target.value.split(',').map(url => url.trim()) });
    } else {
      setTireData({ ...tireData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    const formattedData = { ...tireData, imageUrls: tireData.imageUrls.split(',').map(url => url.trim()) };
    onAddTire(formattedData);
    onClose();
    setTireData({ brand: '', size: '', treadCondition: '', status: '', imageUrls: '', location: '', setInfo: '', season: '' }); // Reset form
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Tire</DialogTitle>
      <DialogContent>
        <TextField name="brand" label="Brand" fullWidth margin="dense" variant="standard" value={tireData.brand} onChange={handleChange} />
        <TextField name="size" label="Size" fullWidth margin="dense" variant="standard" value={tireData.size} onChange={handleChange} />
        <FormControl fullWidth margin="dense">
          <InputLabel id="tread-condition-label">Tread Condition</InputLabel>
          <Select labelId="tread-condition-label" name="treadCondition" value={tireData.treadCondition} label="Tread Condition" onChange={handleChange}>
            {['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'].map(percent => (
              <MenuItem key={percent} value={percent}>{percent}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="season-label">Season</InputLabel>
          <Select labelId="season-label" name="season" value={tireData.season} label="Season" onChange={handleChange}>
            <MenuItem value="All Season">All Season</MenuItem>
            <MenuItem value="Summer">Summer</MenuItem>
            <MenuItem value="Winter">Winter</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="set-info-label">Tire Set</InputLabel>
          <Select labelId="set-info-label" name="setInfo" value={tireData.setInfo} label="Tire Set" onChange={handleChange}>
            <MenuItem value="Set of 2">Set of 2</MenuItem>
            <MenuItem value="Set of 4">Set of 4</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="location-label">Location</InputLabel>
          <Select labelId="location-label" name="location" value={tireData.location} label="Location" onChange={handleChange}>
            <MenuItem value="Toronto">Toronto</MenuItem>
            <MenuItem value="Barrie">Barrie</MenuItem>
            <MenuItem value="Sutton West">Sutton West</MenuItem>
          </Select>
        </FormControl>
        <TextField name="imageUrls" label="Image URLs (comma separated)" fullWidth margin="dense" variant="standard" value={tireData.imageUrls.join(', ')} onChange={handleChange} helperText="Enter URLs separated by commas" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Tire</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTirePopup;
