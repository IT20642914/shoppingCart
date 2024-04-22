import ShoppingCart from '../models/shoppingcarts.js';
import Products from '../models/produts.js';
import Feedback from '../models/feedback.js';


// Controller for getting all shopping carts for a specific customer
export const getShoppingCartsItems = async (req, res) => {
  try {
    const { customerId } = req.query;
    const shoppingCarts = await ShoppingCart.find({ CustomerID: customerId });
    if (shoppingCarts.length === 0) {
      return res.status(404).json({ error: true, message: "No shopping carts found for this customer" });
    }
    res.status(200).json(shoppingCarts);
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};



// Controller for getting all product details
export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (products.length === 0) {
      return res.status(404).json({ error: true, message: "No products found" });
    }  
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};


// Controller for getting all feedback entries
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    if (feedbacks.length === 0) {
      return res.status(404).json({ error: true, message: "No feedback entries found" });
    }
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};




// Controller for getting all products with average ratings
export const getAllFeedbacksAndAverageRatings = async (req, res) => {
  try {
    // Retrieve all products from the Products collection
    const products = await Products.find();
    if (products.length === 0) {
      return res.status(404).json({ error: true, message: "No products found" });
    }

    // Create a map to store average ratings for each ItemID
    const averageRatingsMap = {};

    // Retrieve all feedback entries from the Feedback collection
    const feedbacks = await Feedback.find();

    // Calculate average ratings for each ItemID
    feedbacks.forEach((feedback) => {
      if (!averageRatingsMap[feedback.ItemID]) {
        averageRatingsMap[feedback.ItemID] = { totalRating: 0, count: 0 };
      }
      averageRatingsMap[feedback.ItemID].totalRating += feedback.Rating;
      averageRatingsMap[feedback.ItemID].count++;
    });

    // Enhance each product with its corresponding average ratings
    const productsWithAverageRatings = products.map((product) => {
      const { ItemId } = product;
      const averageRatingInfo = averageRatingsMap[ItemId];
      const averageRating = averageRatingInfo ? averageRatingInfo.totalRating / averageRatingInfo.count : 0;
      return {
        ...product.toObject(), // Convert Mongoose document to plain JavaScript object
        averageRating // Add average rating to the product object
      };
    });

    res.status(200).json(productsWithAverageRatings);
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};


// Controller for creating a new shopping cart item
export const createShoppingCart = async (req, res) => {
  try {
    const shoppingCart = new ShoppingCart(req.body);
    const savedShoppingCart = await shoppingCart.save();
    res.status(201).json(savedShoppingCart);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

// Controller for updating an existing shopping cart item
export const updateShoppingCart = async (req, res) => {
  try {
    const updatedShoppingCart = await ShoppingCart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedShoppingCart);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

// Controller for deleting a shopping cart item
export const deleteShoppingCart = async (req, res) => {
  try {
    await ShoppingCart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Shopping cart item deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

// Controller for getting details of a specific shopping cart item
export const getShoppingCartDetails = async (req, res) => {
  try {
    const shoppingCart = await ShoppingCart.findById(req.params.id);
    if (!shoppingCart) {
      return res.status(404).json({ error: true, message: "Shopping cart item not found" });
    }
    res.status(200).json(shoppingCart);
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};