import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';

function Navbar({ onAddTire, onSearchTire }) {
    // URL of the company logo
    const logoUrl = 'https://i.postimg.cc/MpCNtPX6/Whats-App-Image-2023-12-27-at-4-24-00-PM.jpg';

    return (
        <AppBar position="static" style={{ backgroundColor: 'orange' }}>
            <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center' }}>

                <IconButton color="inherit" onClick={onAddTire}>
                    <AddCircleIcon />
                </IconButton>

                {/* Company Logo with adjusted size */}
                <img src={logoUrl} alt="Company Logo" style={{ maxHeight: '50px', minHeight: '20px' }} />

                <IconButton color="inherit" onClick={onSearchTire}>
                    <SearchIcon />
                </IconButton>

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
