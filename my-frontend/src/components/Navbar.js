import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';

function Navbar({ onAddTire, onSearchTire }) {
  return (
    <AppBar position="static" style={{ backgroundColor: 'orange' }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>

        <IconButton color="inherit" onClick={onAddTire}>
          <AddCircleIcon />
        </IconButton>

        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
          HW Tire Inventory
        </Typography>

        <IconButton color="inherit" onClick={onSearchTire}>
          <SearchIcon />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
