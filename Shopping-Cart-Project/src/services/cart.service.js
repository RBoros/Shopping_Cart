// services/cart.service.js
//const userRepository = require('../repositories/user.repository');
const cartRepository = require('../repositories/cart.repository');

/*
class UserService {
    async getAllUsers() {
        // Here you could add business logic, e.g., check user permissions
        return await userRepository.findAll();
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async createUser(userData) {
        // Example of business logic: validate email format
        if (!userData.email || !userData.email.includes('@')) {
            throw new Error('Invalid email format');
        }
        // Example of business logic: check for duplicate email
        // Note: The database already has a UNIQUE constraint, but doing it here
        // allows for a friendlier error message.
        return await userRepository.create(userData);
    }

    async updateUser(id, userData) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return await userRepository.update(id, userData);
    }

    async deleteUser(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return await userRepository.delete(id);
    }
}*/

class CartService {
    async getAllCartItems(cartData) {
        const result = await cartRepository.findAll(cartData);
        if(!result.cart_items) {
            result.cart_items = [];
        }
        return result;
    }

    async addItemToCart(cartData) {
        return await cartRepository.addItem(cartData);
    }

    async updateItemInCart(productId, cartData) {
        const item = await cartRepository.updateItem(productId, cartData);
        
        if(item.updatedCartItems.quantity <= 0) {
            return await cartRepository.deleteCartItem(productId, cartData);
        }
        return item;
        
    }

    async deleteCart(cartData) {
        return await cartRepository.deleteCart(cartData);
    }

    async deleteCartItem(productId, cartData) {
        return await cartRepository.deleteCartItem(productId, cartData);
    }
}
//module.exports = new UserService();
module.exports = new CartService();
