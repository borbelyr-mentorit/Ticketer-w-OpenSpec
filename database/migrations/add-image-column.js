const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '..', '..', 'Ticketer.db.sqlite');

function migrateDatabaseAddImageColumn() {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error connecting to the SQLite database:', err.message);
            return;
        }
        console.log('Connected to the SQLite database for migration.');
    });

    db.serialize(() => {
        // Enable foreign keys
        db.run('PRAGMA foreign_keys = ON');

        // Check if image column already exists
        db.all("PRAGMA table_info(Events)", (err, rows) => {
            if (err) {
                console.error('Error checking Events table structure:', err.message);
                db.close();
                return;
            }

            const imageColumnExists = rows.some(row => row.name === 'image');

            if (imageColumnExists) {
                console.log('Image column already exists in Events table.');
                db.close();
                return;
            }

            // Add image column to Events table
            db.run('ALTER TABLE Events ADD COLUMN image TEXT NULL', (err) => {
                if (err) {
                    console.error('Error adding image column to Events table:', err.message);
                } else {
                    console.log('Successfully added image column to Events table.');
                }

                db.close((err) => {
                    if (err) {
                        console.error('Error closing the database connection:', err.message);
                    } else {
                        console.log('Database connection closed.');
                    }
                });
            });
        });
    });
}

if (require.main === module) {
    migrateDatabaseAddImageColumn();
}

module.exports = migrateDatabaseAddImageColumn;
