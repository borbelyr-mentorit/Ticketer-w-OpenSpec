const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'Ticketer.db.sqlite');

function initializeDatabase() {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error connecting to the SQLite database:', err.message);
            return;
        }
        console.log('Connected to the SQLite database.');
    });

    db.serialize(() => {
        // Enable foreign keys
        db.run('PRAGMA foreign_keys = ON');

        // Events table
        db.run(`CREATE TABLE IF NOT EXISTS Events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            presenter TEXT NOT NULL,
            date TEXT NOT NULL,
            fromTime TEXT NOT NULL,
            toTime TEXT NOT NULL,
            description TEXT,
            ticketIdPrefix TEXT NOT NULL,
            image TEXT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating Events table:', err.message);
            } else {
                console.log('Events table created or already exists.');
            }
        });

        // TicketTypes table
        db.run(`CREATE TABLE IF NOT EXISTS TicketTypes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            eventId INTEGER NOT NULL,
            typeName TEXT NOT NULL,
            price REAL NOT NULL,
            maxQuantity INTEGER NOT NULL,
            soldQuantity INTEGER DEFAULT 0,
            FOREIGN KEY (eventId) REFERENCES Events (id) ON DELETE CASCADE
        )`, (err) => {
            if (err) {
                console.error('Error creating TicketTypes table:', err.message);
            } else {
                console.log('TicketTypes table created or already exists.');
            }
        });

        // SoldTickets table
        db.run(`CREATE TABLE IF NOT EXISTS SoldTickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticketTypeId INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            purchaseDate TEXT NOT NULL,
            UsedDate DATE,
            FOREIGN KEY (ticketTypeId) REFERENCES TicketTypes (id) ON DELETE CASCADE
        )`, (err) => {
            if (err) {
                console.error('Error creating SoldTickets table:', err.message);
            } else {
                console.log('SoldTickets table created or already exists.');
            }
        });
    });

    db.close((err) => {
        if (err) {
            console.error('Error closing the database connection:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
}

if (require.main === module) {
    initializeDatabase();
}

module.exports = initializeDatabase;
