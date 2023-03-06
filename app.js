const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');

dotenv.config({ path: './.env' });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse url encoded bodies
app.use(express.urlencoded({ extended: false }));
// Parse json bodies
app.use(express.json());

app.use(cookieParser());

app.set("View Engine", 'hbs');

db.connect( (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MYSQL Connected...");
    }
})

// Define routes 
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(5000, () => {
    console.log("Server running on port 5000")
});