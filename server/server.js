const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Trrsk',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Your API endpoint for handling registration
app.post('/api/register', (req, res) => {
    const {
        first_name,
        last_name,
        position,
        agency,
        tel_num,
        email,
        password,
    } = req.body;

    console.log('Received registration request:', req.body);

    // Insert data into the users table
    const query = `
    INSERT INTO users (first_name, last_name, position, agency, tel_num, email, password, level, date_create)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

    db.query(
        query,
        [first_name, last_name, position, agency, tel_num, email, password, '1'], // '1' for default level, adjust as needed
        (err, results) => {
            if (err) {
                console.error('Error inserting data into the database:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Data inserted successfully');
                res.json({ success: true });
            }
        }
    );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
