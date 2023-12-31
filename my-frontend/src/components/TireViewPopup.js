// src/components/TireViewPopup.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

function TireViewPopup({ open, onClose, tire }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>View Tire</DialogTitle>
      <DialogContent>
        {tire && (
          <img src={tire.imageUrl || '/default-image.jpg'} alt={tire.brand} style={{ width: '100%' }} />
        )}
      </DialogContent>
      <Button onClick={onClose}>Close</Button>
    </Dialog>
  );
}

export default TireViewPopup;
