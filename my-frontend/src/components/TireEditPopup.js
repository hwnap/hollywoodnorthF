import React, { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function TireEditPopup({ open, onClose, tire, onSave, isAdmin }) {
  const [tireData, setTireData] = useState({
    _id: '',
    brand: '',
    size: '',
    treadCondition: '',
    status: '',
    imageUrls: [],
    location: '',
    setInfo: '',
    season: '',
    price: '',
    notes: ''
  });

  useEffect(() => {
    if (tire) {
      setTireData({
        _id: tire._id,
        brand: tire.brand,
        size: tire.size,
        treadCondition: tire.treadCondition,
        status: tire.status,
        imageUrls: tire.imageUrls,
        location: tire.location,
        setInfo: tire.setInfo,
        season: tire.season,
        price: tire.price,
        notes: tire.notes
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
        {/* Brand, Size, and other fields */}
        <TextField name="brand" label="Brand" fullWidth margin="dense" variant="standard" value={tireData.brand} onChange={handleChange} />
        {/* ...other input fields... */}
        
        {/* Price field with admin check */}
        <TextField 
          name="price" 
          label="Price" 
          type="number"
          fullWidth 
          margin="dense" 
          variant="standard" 
          value={tireData.price} 
          onChange={handleChange} 
          disabled={!isAdmin} // Disable if not admin
        />

        {/* Notes field */}
        <TextField 
          name="notes" 
          label="Notes" 
          fullWidth 
          margin="dense" 
          variant="standard" 
          multiline
          rows={4}
          value={tireData.notes} 
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
