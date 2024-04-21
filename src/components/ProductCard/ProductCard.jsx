import React from 'react';
import { Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';

const ProductCard = ({ id, name, price, imageUrl, rating, onCardClick }) => {
  return (
    <Card sx={{
     maxWidth: 345, width: '100%', cursor: 'pointer',
    background:"rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.5)", 
    borderRadius: "16px",
    }} onClick={() => onCardClick(id)}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={name}
        sx={{
          minWidth:345, 
          maxHeight:145, 
          objectFit: 'fill', // Change to 'cover' if you want to fill the height and width without preserving the whole image view
          width: '100%' // This ensures it takes the full width of the card
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}
        </Typography>
        <Rating value={rating} readOnly />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
