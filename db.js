// import mysql from 'mysql2';
import postgres from "postgres";

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// })

const connectionString = process.env.DATABASE_URL;
const db = postgres(connectionString)

// db.connect((err) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log("DB connected");
// })

export default db;