// src/components/TireCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';  // Import the delete icon

function TireCard({ tire, onView, onEdit, onDelete }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={tire.imageUrl || '/default-image.jpg'}
          alt={tire.brand}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {tire.brand} - {tire.size}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tread Condition: {tire.treadCondition} <br />
            Status: {tire.status}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onView(tire)}>
          View
        </Button>
        <Button size="small" color="primary" onClick={() => onEdit(tire)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => onDelete(tire._id)}>
          <DeleteIcon /> Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default TireCard;
