// src/components/Navbar.js
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LinkIcon from '@mui/icons-material/Link';
import { orange } from '@mui/material/colors';

function Navbar({ onAddTire, onOpenImageUpload }) {
    const logoUrl = 'https://i.postimg.cc/MpCNtPX6/Whats-App-Image-2023-12-27-at-4-24-00-PM.jpg';
    const imageUploadUrl = 'https://postimages.org/';
    
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: 'white' }}>
            <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center' }}>

                <IconButton
                    style={{ color: orange[500] }}
                    edge="start"
                    onClick={handleMenuOpen}
                >
                    <MenuIcon />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={onAddTire}>
                        <AddCircleIcon style={{ color: orange[500], marginRight: '10px' }} />
                        Add Tire
                    </MenuItem>
                    <MenuItem onClick={() => window.open(imageUploadUrl, '_blank')}>
                        <LinkIcon style={{ color: orange[500], marginRight: '10px' }} />
                        Image Upload
                    </MenuItem>
                </Menu>

                <img src={logoUrl} alt="Company Logo" style={{ maxHeight: '50px', minHeight: '20px' }} />

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
