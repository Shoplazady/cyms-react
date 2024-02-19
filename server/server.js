const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user_pic', express.static(path.join(__dirname, 'user_pic')));

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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'user_pic');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

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
app.get('/api/admin/users', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const usersPerPage = parseInt(req.query.usersPerPage) || 10;
        const searchTerm = req.query.searchTerm || ''; // Retrieve the search term from the query parameters

        // Calculate offset
        const offset = (page - 1) * usersPerPage;

        // Query to get paginated and filtered users
        const usersQuery = await queryPromise('SELECT id, first_name, last_name, email, position, agency, tel_num FROM users WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? LIMIT ? OFFSET ?', [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, usersPerPage, offset]);

        // Query to get total number of filtered users
        const totalUsersQuery = await queryPromise('SELECT COUNT(*) as total FROM users WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?', [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);
        const totalUsers = totalUsersQuery[0].total;

        // Calculate total pages
        const totalPages = Math.ceil(totalUsers / usersPerPage);

        // Send response with filtered user data, total users, and total pages
        res.status(200).json({
            users: usersQuery,
            totalUsers,
            totalPages,
        });
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.get('/api/admin/getuser/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userQuery = await queryPromise('SELECT * FROM users WHERE id = ?', [userId]);

        if (userQuery.length > 0) {
            const userData = userQuery[0];
            res.status(200).json(userData);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/admin/updateuser/:userId', upload.single('profilePicture'), async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUserData = req.body;

        // Check if a file was uploaded
        if (req.file) {
            
            updatedUserData.picture = req.file.filename;
        }

        const updateQuery = await queryPromise('UPDATE users SET first_name=?, last_name=?, email=?, position=?, agency=?, tel_num=?, picture=? WHERE id=?',
            [updatedUserData.first_name, updatedUserData.last_name, updatedUserData.email, updatedUserData.position, updatedUserData.agency, updatedUserData.tel_num, updatedUserData.picture, userId]);

        if (updateQuery.affectedRows === 1) {
            res.status(200).json({ message: 'User updated successfully.' });
        } else {
            res.status(404).json({ error: 'User not found or unable to update.' });
        }
    } catch (error) {
        console.error('Error updating user data by ID:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.post('/api/admin/adduser', upload.single('profilePic'), async (req, res) => {
    const { first_name, last_name, position, agency, tel_num, email, password, level } = req.body;

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const picture_path = req.file ? `/user_pic/${req.file.filename}` : null;

        
        const result = await queryPromise('SELECT * FROM users WHERE email = ?', [email]);

        if (!result || result.length === 0) {
            
            await queryPromise('INSERT INTO users (first_name, last_name, position, agency, tel_num, email, password, level, picture_path, date_create) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())', [first_name, last_name, position, agency, tel_num, email, hashedPassword, level, picture_path]);

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

app.delete('/api/admin/deleteuser/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log('Received request to delete user with ID:', userId);

    try {
        // Check if the user with the specified userId exists
        const userResult = await queryPromise('SELECT * FROM users WHERE id = ?', [userId]);

        if (!userResult || userResult.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Delete the user
        await queryPromise('DELETE FROM users WHERE id = ?', [userId]);

        res.status(200).json({ success: true, message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});