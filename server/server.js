const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Use environment variables for sensitive data
    database: 'Trrsk',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

const queryPromise = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Your API endpoint for handling registration
app.post('/api/register', async (req, res) => {
    const { first_name, last_name, position, agency, tel_num, email, password } = req.body;

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if the email already exists
        const result = await queryPromise('SELECT * FROM users WHERE email = ?', [email]);

        if (!result || result.length === 0) {
            // If the email is not registered, proceed with the registration
            await queryPromise('INSERT INTO users (first_name, last_name, position, agency, tel_num, email, password, level, date_create) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())', [first_name, last_name, position, agency, tel_num, email, hashedPassword, 1]);

            res.status(201).json({ success: true, message: 'User registered successfully.' });
        } else {
            const existingUser = result[0];
            console.log('Existing user:', existingUser);
            return res.status(400).json({ error: 'Email is already registered.' });
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Your API endpoint for handling login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email and password match a user in the database
        const result = await queryPromise('SELECT * FROM users WHERE email = ?', [email]);

        if (!result || result.length === 0) {
            // If no matching user found, respond with an error
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const userData = result[0];

        // Check if the provided password matches the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Respond with the user data
        res.status(200).json(userData);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Add a new route to retrieve user data
app.get('/api/users', async (req, res) => {
    try {
        // Fetch user data from the database
        const users = await queryPromise('SELECT first_name, last_name, email, position, agency, tel_num FROM users');

        // Send the user data as a response
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
