import React from 'react';
import { Card, CardContent, CardMedia, Typography, Rating, Button } from '@mui/material';
import {defaultImageUrl} from '../../assets/images'
const ProductCard = ({ id, name, price, imageUrl, rating, onCardClick, handleAddToCart }) => {
  return (
    <Card sx={{
      maxWidth: 345, width: '100%', cursor: 'pointer',
      background: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      borderRadius: "16px",
    }} onClick={() => onCardClick(id)}>
      <CardMedia
        component="img"
        image={imageUrl||defaultImageUrl}
        alt={name}
        sx={{
          minWidth: 345,
          maxHeight: 145,
          objectFit: 'cover', // Changed to 'cover' to better fit images
          width: '100%' // Ensures it takes the full width of the card
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
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.stopPropagation(); // Prevents the onCardClick from being triggered when the button is clicked
            handleAddToCart(id);
          }}
          sx={{ marginTop: 2,width:"10rem" }} // Adds some space above the button
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
