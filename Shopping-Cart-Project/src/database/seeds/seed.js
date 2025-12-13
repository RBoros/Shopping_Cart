// seed.js 
const dbPromise = require('../../config/database');

async function seed() {
    try {
        const db = await dbPromise;
        
        console.log('Deleting existing carts...');
        await db.run('DELETE FROM carts');
        await db.run('DELETE FROM sqlite_sequence WHERE name = ?', 'carts');

        console.log('Deleting existing cart_items...');
        await db.run('DELETE FROM cart_items');
        await db.run('DELETE FROM sqlite_sequence WHERE name = ?', 'cart_items');

        console.log('Inserting 3 fake carts...');
        console.log('Inserting 9 fake cart_items...');


        const insertPromises1 = [];
        const insertPromises2 = [];

        for (let i = 0; i < 3; i++) {
            const userId = i;
            const cartId = "cart_" + userId;
            const now = new Date();

            const formatted =
            now.getFullYear() + '-' +
            String(now.getMonth() + 1).padStart(2, '0') + '-' +
            String(now.getDate()).padStart(2, '0') + ' ' +
            String(now.getHours()).padStart(2, '0') + ':' +
            String(now.getMinutes()).padStart(2, '0') + ':' +
            String(now.getSeconds()).padStart(2, '0');

            const sql1 = 'INSERT INTO carts (cart_id, user_id, added_at) VALUES (?, ?, ?)';
            insertPromises1.push(db.run(sql1, [cartId, userId, formatted]));

            for(let j = 0; j < 3; j++) {
                const product_id = String.fromCharCode(j + 65);
                const cart_item_id = cartId + "_item_" + product_id;
                const quantity = Math.floor(Math.random() * 5) + 1;
                const sql2 = 'INSERT INTO cart_items (cart_item_id, cart_id, product_id, quantity) VALUES (?, ?, ?, ?)';
                insertPromises2.push(db.run(sql2, [cart_item_id, cartId, product_id, quantity]));
            }
        }

        await Promise.all(insertPromises1);
        await Promise.all(insertPromises2);

        console.log('Database seeded with fake data!');

    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        const db = await dbPromise;
        await db.close();
        console.log('Database connection closed.');
    }
}

seed();
