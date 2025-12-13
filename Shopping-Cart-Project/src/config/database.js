// database.js (Using the 'sqlite' package)
const sqlite3 = require('sqlite3');
const { open } = require('sqlite'); // Use 'open' from the sqlite package

const path = require('path'); // 1. Import the 'path' module

// 2. Build the path relative to the current file's directory
const DBSOURCE = path.join(__dirname, '../../db.sqlite');
console.log('DBSOURCE =', DBSOURCE);
console.log('Resolved path =', path.resolve(DBSOURCE));

async function setupDatabase() {
    try {
        const db = await open({
            filename: DBSOURCE,
            driver: sqlite3.Database
        });

        console.log('Connected to the SQLite database.');
        // use .exec() for statements that don't return rows
        await db.exec(`
            CREATE TABLE IF NOT EXISTS carts (
            cart_id TEXT PRIMARY KEY,
            user_id TEXT UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            added_at DATETIME
            );

            CREATE TABLE IF NOT EXISTS cart_items (
            cart_item_id TEXT PRIMARY KEY,
            cart_id TEXT,
            product_id TEXT,
            quantity INTEGER,
            added_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE,
            UNIQUE (cart_id, product_id) 
            );    
        `);

        return db;
    } catch (err) {
        console.error('Error connecting to the database', err.message);
        throw err;
    }
}

module.exports = setupDatabase();
