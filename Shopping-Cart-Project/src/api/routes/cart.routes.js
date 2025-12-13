// api/routes/cart.routes.js
const express = require('express');
const router = express.Router();
//const userController = require('../controllers/user.controller.js');
const cartController = require('../controllers/cart.controller.js');


// --- User API Routes ---
/*
// GET /api/users - Retrieve all users
router.get("/users", userController.getAllUsers);

// GET /api/user/:id - Retrieve a single user by their ID
router.get("/user/:id", userController.getUserById);

// POST /api/user - Create a new user
router.post("/user", userController.createUser);

// PATCH /api/user/:id - Update an existing user's details
router.patch("/user/:id", userController.updateUser);

// DELETE /api/user/:id - Delete a user
router.delete("/user/:id", userController.deleteUser);
*/

// --- Cart API Routes ---

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

