const mysql = require('mysql2/promise');

// Use createPool instead of createConnection
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "MySQL", // Ensure the password is correct
    database: "school",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10, // Limit for connections in the pool
    queueLimit: 0
});

// Export the pool (you can use `pool.query` to run queries)
module.exports = pool;
