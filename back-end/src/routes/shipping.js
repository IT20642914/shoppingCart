import { Router } from "express";
import { createShippingAddress, getShippingAddressesByUserId, updateShippingAddressByUserId, deleteShippingAddressByUserId } from "../controller/shippingController.js";

const router = Router();

// Route for creating a new shipping address
router.post('/', createShippingAddress);

// Route for reading shipping addresses by user ID
router.get('/:userId', getShippingAddressesByUserId);

// Route for updating a shipping address by user ID and address ID
router.put('/:addressId', updateShippingAddressByUserId);

// Route for deleting a shipping address by user ID and address ID
router.delete('/:addressId', deleteShippingAddressByUserId);

export default router;
