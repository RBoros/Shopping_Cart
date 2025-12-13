// services/cart.service.js
const cartRepository = require('../repositories/cart.repository');

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

module.exports = new CartService();
