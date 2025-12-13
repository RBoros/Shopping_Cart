// repositories/user.repository.js (Using the 'sqlite' package)
const { get } = require('../app.js');
const getDbPromise = require('../config/database.js'); // This is a promise now

/*
class UserRepository {
    async findAll() {
        const db = await getDbPromise; // Get the resolved db connection
        console.log('DB instance in findAll:', db); // Debugging line
        return await db.all("SELECT * FROM users");
    }

    async findById(id) {
        const db = await getDbPromise;
        // The '?' placeholder is automatically handled
        return await db.get("SELECT * FROM users WHERE id = ?", id);
    }

    async create(data) {
        const db = await getDbPromise;
        const result = await db.run(
            'INSERT INTO users (name, email) VALUES (?,?)',
            data.name, data.email // You can pass params directly
        );
        // The result object CONTAINS lastID and changes!
        return { id: result.lastID, ...data };
    }

    async update(id, data) {
        const db = await getDbPromise;
        const result = await db.run(
           `UPDATE users set name = COALESCE(?,name), email = COALESCE(?,email) WHERE id = ?`,
           data.name, data.email, id
        );
        return { changes: result.changes };
    }

    async delete(id) {
        const db = await getDbPromise;
        const result = await db.run('DELETE FROM users WHERE id = ?', id);
        return { changes: result.changes };
    }
}*/

class CartRepository {
    async findAll(cartData) {
        const db = await getDbPromise;
        const result1 = await db.get("SELECT * FROM carts WHERE user_id = ?", [cartData.user_id]);
        const result2 = await db.all("SELECT * FROM cart_items WHERE cart_id = ?", [result1.cart_id]);
        return {
            user_id: cartData.user_id,
            created_at: result1.created_at,
            added_at: result1.added_at,
            cart_items: result2 
        };
    }

    async addItem(cartData) {
        const db = await getDbPromise;
        const existingCart = await db.get("SELECT * FROM carts WHERE user_id = ?", [cartData.user_id]);
        let cartId;
        let cartItemId;
        if (!existingCart) {
            cartId = "cart_" + cartData.user_id;     
            const cartResult = await db.run(
                'INSERT INTO carts (cart_id, user_id) VALUES (?,?)',
                cartId, cartData.user_id
            ); 
        }else {
            cartId = existingCart.cart_id;
        }
        cartItemId = cartId +"_item_" + cartData.product_id;
        const existingItem = await db.get("SELECT * FROM cart_items WHERE cart_item_id = ?", [cartItemId]);
        if(!existingItem) {
            const cartResult = await db.run(
                'INSERT INTO cart_items (cart_item_id, cart_id, product_id, quantity) VALUES (?,?,?,?)',
                cartItemId, cartId, cartData.product_id, cartData.quantity
            );
        }else {
            const cartResult = await db.run(
                `UPDATE cart_items set quantity = quantity + ? WHERE cart_item_id = ?`,
                cartData.quantity, cartItemId
            );
        }
         
        const updatedCartItems = await db.get("SELECT * FROM cart_items WHERE cart_item_id = ?", [cartItemId]);
        const cartResult = await db.run(
            `UPDATE carts set added_at = ? WHERE user_id = ?`,
            updatedCartItems.added_at, cartData.user_id
        );  
        return { updatedCartItems };
    }

    async updateItem(productId, cartData) {
        const db = await getDbPromise;
        const cartID = await db.get("SELECT cart_id FROM carts WHERE user_id = ?", [cartData.user_id]);
    
        let cartItemId = cartID.cart_id + "_item_" + productId;
        
        const cartResult1 = await db.run(
           `UPDATE cart_items set quantity = ? WHERE cart_item_id = ?`,
           cartData.quantity, cartItemId
        );
        const updatedCartItems = await db.get(
           "SELECT * FROM cart_items WHERE cart_item_id = ?",
            [cartItemId]
        );

        const getAddDate = await db.get("SELECT added_at FROM cart_items WHERE cart_item_id = ?", [cartItemId]);
        const cartResult3 = await db.run(
            `UPDATE carts set added_at = ? WHERE user_id = ?`,
            getAddDate.added_at, cartData.user_id
        );  
        return { updatedCartItems }; 
    }
    
    async deleteCart(cartData) {
        const db = await getDbPromise;
        const cartID = await db.get("SELECT cart_id FROM carts WHERE user_id = ?", [cartData.user_id]);
        return await db.run('DELETE FROM cart_items WHERE cart_id = ?', cartID.cart_id);
        

    }

    async deleteCartItem(productId, cartData) {
        const db = await getDbPromise;
        const cartID = await db.get("SELECT cart_id FROM carts WHERE user_id = ?", [cartData.user_id]);
        const cartItemId = cartID.cart_id + "_item_" + productId;
        const cartResult1 = await db.run('DELETE FROM cart_items WHERE cart_item_id = ?', cartItemId);
        const updatedCartItems = await db.all("SELECT * FROM cart_items WHERE cart_id = ?", [cartID.cart_id]);
        return { updatedCartItems };
    }
}

//module.exports = new UserRepository();
module.exports = new CartRepository();

