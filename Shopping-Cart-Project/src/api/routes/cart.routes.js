// api/routes/cart.routes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller.js');

// --- Cart API Routes ---
//Each request needs a userId in the request body

// GET /api/cart - Retrieve all items in cart
router.get("/", cartController.getAllCartItems);

// POST /api/cart/items - Add an item to the cart
router.post("/items", cartController.addItemToCart);

// PUT /api/cart/items/{productId} - Create a new user
router.put("/items/:productId", cartController.updateItemInCart);

// DELETE /api/cart/items - Delete cart
router.delete("/", cartController.deleteCart);

// DELETE /api/cart/items/{productId} - Delete cart item
router.delete("/items/:productId", cartController.deleteCartItem);

module.exports = router;

