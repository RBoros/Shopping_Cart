// api/controllers/cart.controller
const cartService = require('../../services/cart.service');

class CartController {
    
    async getAllCartItems(req, res) {
        try {
            const cartItems = await cartService.getAllCartItems(req.body);
            res.json({ cartItems });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async addItemToCart(req, res) {
        try {
            const updatedCart = await cartService.addItemToCart(req.body);
            res.status(201).json({ updatedCart });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async updateItemInCart(req, res) {
        try {
            const result = await cartService.updateItemInCart(req.params.productId, req.body);
            if (!result) {
                return res.status(404).json({ error: 'Cart item not found' });
            }
            res.json({ result }); // Assuming result is the updated cart item       
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async deleteCart(req, res) {
        try {
            const result = await cartService.deleteCart(req.body);
            if (result.changes > 0) {
                res.status(204).json({ message: "No Content"});
            }else {
                res.status(404).json({ error: 'Cart not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async deleteCartItem(req, res) {
        try {
            const result = await cartService.deleteCartItem(req.params.productId, req.body);
            res.json({ result });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new CartController();
