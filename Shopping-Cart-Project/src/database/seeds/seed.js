// seed.js (with Faker)
const dbPromise = require('../../config/database');
//const { faker } = require('@faker-js/faker');

/*
async function seed() {
    try {
        const db = await dbPromise;

        console.log('Deleting existing users...');
        await db.run('DELETE FROM users');
        await db.run('DELETE FROM sqlite_sequence WHERE name = ?', 'users');

        console.log('Inserting 20 fake users...');

        const insertPromises = [];
        for (let i = 0; i < 20; i++) {
            const name = faker.person.fullName();
            const email = faker.internet.email({ firstName: name.split(' ')[0], provider: 'example.com' }); // More realistic emails

            const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
            insertPromises.push(db.run(sql, name, email));
        }

        await Promise.all(insertPromises);

        console.log('Database seeded with fake data!');

    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        const db = await dbPromise;
        await db.close();
        console.log('Database connection closed.');
    }
}*/
async function seed() {
    try {
        const db = await dbPromise;
        console.log('Deleting existing users...');
        await db.run('DELETE FROM users');
        await db.run('DELETE FROM sqlite_sequence WHERE name = ?', 'users');

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
            
            const sql1 = 'INSERT INTO carts (cart_id, user_id) VALUES (?, ?)';
            insertPromises1.push(db.run(sql1, [cartId, userId]));

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
