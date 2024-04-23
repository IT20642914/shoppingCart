import React,{useEffect,useState} from 'react'
import { Grid, Box, Typography } from '@mui/material';
import ProductCard from '../../components/ProductCard/ProductCard';
import Styles from './Home.module.scss'
import {cartService} from '../../services/Cart.Service'
const Home = () => {

  const [products, setProducts] = useState([]);

useEffect(() => {
  handleProductFetch()
}, [])


const handleProductFetch=()=>{
  cartService.GetAllProductsWithRating().then((response)=>{
    console.log(response)
setProducts(response.data)
  }).catch ((error)=>{
    console.log(error)
  })
}



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
        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
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