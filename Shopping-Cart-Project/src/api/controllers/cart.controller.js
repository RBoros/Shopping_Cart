// api/controllers/cart.controller
//const userService = require('../../services/user.service');
const cartService = require('../../services/cart.service');

/*
class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json({ message: "success", data: users });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.json({ message: "success", data: user });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    async createUser(req, res) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json({ message: "success", data: newUser });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async updateUser(req, res) {
        try {
            const result = await userService.updateUser(req.params.id, req.body);
            if (result.changes === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: "success", changes: result.changes });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const result = await userService.deleteUser(req.params.id);
            if (result.changes === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: "deleted", changes: result.changes });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}*/

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
            const result = await cartService.updateItemInCart(req.params.id, req.body);
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
            res.status(204).json({ message: "No Xontent"});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async deleteCartItem(req, res) {
        try {
            const result = await cartService.deleteCartItem(req.params.id, req.body);
            res.json({ result });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

//module.exports = new UserController();
module.exports = new CartController();
