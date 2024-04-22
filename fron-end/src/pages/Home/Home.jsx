import React from 'react'
import { Grid, Box, Typography } from '@mui/material';
import { products } from '../../utilities/';
import ProductCard from '../../components/ProductCard/ProductCard';
import Styles from './Home.module.scss'
const Home = () => {
const handleProductClick = (id) => {
console.log(id)

}
const handleAddToCart=(id)=>{
  // need handleAddToCart function
  console.log(id)

}

  return (
    <section className={Styles.container}>
    <Box className={Styles.rootBox}>
    <Box className={Styles.titleBox}>
      <Typography variant="h4" component="h1">
        Choose your favorite product
        </Typography>
    </Box>
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard {...product}
           onCardClick={handleProductClick}
           handleAddToCart={handleAddToCart} />
        </Grid>
      ))}
    </Grid>
  </Box>
  </section>
  )
}

export default Home