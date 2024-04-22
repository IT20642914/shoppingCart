import { Router } from "express";
import { getShoppingCartsItems, getAllProducts, getAllFeedbacks, getAllFeedbacksAndAverageRatings,
    createShoppingCart, updateShoppingCart, deleteShoppingCart, getShoppingCartDetails } from "../controller/cartController.js";

const router = Router();

 // Get all shopping cart items
router.get('/', getShoppingCartsItems);

// Create a new shopping cart item
router.post('/', createShoppingCart); 

// Update an existing shopping cart item
router.put('/:id', updateShoppingCart); 

// Delete a shopping cart item
router.delete('/:id', deleteShoppingCart); 

// Get details of a specific shopping cart item
router.get('/single/:id', getShoppingCartDetails); 

// Route for getting all product details
router.get('/products', getAllProducts);

// Route for getting all feedback entries
router.get('/feedbacks', getAllFeedbacks);

// Route for getting average ratings
router.get('/averageratings', getAllFeedbacksAndAverageRatings);

export default router;
