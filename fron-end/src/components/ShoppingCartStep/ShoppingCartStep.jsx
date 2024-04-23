import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, IconButton, Typography, Divider,Grid, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Style from './ShoppingCartStep.module.scss';
import { TableContainer, Paper, Table, TableHead, TableCell,TableRow, TableBody, Tooltip,TablePagination} from '@mui/material';
import {defaultImageUrl} from '../../assets/images'

const ShoppingCartStep = ({ cartItemList, onUpdateCart }) => {
  const handleRemoveItem = (itemId) => {
    onUpdateCart(itemId, 0);
  };

  const handleIncreaseQuantity = (itemId, quantity) => {
    onUpdateCart(itemId, quantity + 1);
  };

  const handleDecreaseQuantity = (itemId, quantity) => {
    if (quantity > 1) {
      onUpdateCart(itemId, quantity - 1);
    } else {
      onUpdateCart(itemId, 0);
    }
  };

  // Calculate shipping cost for an individual item
  const calculateIndividualShipping = (item) => {
    const itemTotalPrice = item.price * item.quantity;
    if (itemTotalPrice >= 50) {
      return 0;
    }
    return itemTotalPrice * 0.1; // 10% shipping cost if the item total is below $50
  };

  // Calculate the total shipping cost for all items
  const calculateTotalShipping = () => {
    return cartItemList.reduce((total, item) => total + calculateIndividualShipping(item), 0);
  };

  // Calculate the subtotal (price * quantity) for all items
  const calculateSubtotal = () => {
    return cartItemList.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const totalShipping = calculateTotalShipping();
  const estimatedTotal = subtotal + totalShipping;

  return (
    <section className={Style.shoppingStepContainer}>
      <section className={Style.Section1}>
      {cartItemList.length === 0 ? (
      <p>Cart is Empty</p>
  ) : (
        <List>
          {cartItemList.map(item => (
            <ListItem key={item.id} secondaryAction={
              <>
                <IconButton onClick={() => handleDecreaseQuantity(item.id, item.quantity)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <IconButton onClick={() => handleIncreaseQuantity(item.id, item.quantity)}>
                  <AddCircleOutlineIcon />
                </IconButton>
                <Button onClick={() => handleRemoveItem(item.id)}>Remove</Button>
              </>
            }>
              <ListItemAvatar>
                <Avatar src={item.imageUrl||defaultImageUrl} alt={item.name} />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={`Price: $${item.price.toFixed(2)} - Quantity: ${item.quantity}`}
              />
            </ListItem>
          ))}
        </List>
          )}
      </section>
      
      <section className={Style.Section2}>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={12}>
      <div className={Style.detailedReport}>
        <Typography variant="h6" component="h2">Detailed Shipping Report</Typography>
        <Grid container spacing={2}>
          {cartItemList.map(item => (
            <Grid item xs={6} md={12} key={item.id}>
              <Typography>
                {item.name}:{calculateIndividualShipping(item) === 0 ? 'Free Shipping' : `$${calculateIndividualShipping(item).toFixed(2)} Shipping`}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </div>
    </Grid>
    <Grid item xs={12} sm={12}>
      <Divider />
      <div className={Style.Summary}>
        <Typography sx={{justifyContent:"center",fontSize:"24px", textAlign:"center"}}>Summary</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Subtotal:</TableCell>
                <TableCell>${subtotal.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Shipping Cost:</TableCell>
                <TableCell>${totalShipping.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estimated Total:</TableCell>
                <TableCell>${estimatedTotal.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Grid>
  </Grid>
</section>


    </section>
  );
};

export default ShoppingCartStep;