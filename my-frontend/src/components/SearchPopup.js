// src/components/SearchPopup.js
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SearchPopup({ open, onClose, onSearch }) {
  const [searchParams, setSearchParams] = useState({ size: '', brand: '' });

  const handleSearch = () => {
    onSearch(searchParams);
    onClose();
  };

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Search Tires</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="size"
          label="Size"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="brand"
          label="Brand"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSearch}>Search</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SearchPopup;
