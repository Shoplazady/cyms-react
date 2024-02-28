const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'Trrsk',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

function generateOrderNumber() {
    // Generate a random 6-digit number
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const queryPromise = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results, fields) => {
            if (error) {
                console.error('Database error:', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, file.fieldname === 'profilePic' ? 'public/uploads/user_pic' : 'public/uploads/images_order');
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

app.get('/api/admin/users/options', async (req, res) => {
    try {
        const usersQuery = await queryPromise(`
            SELECT id, first_name, last_name
            FROM users
            WHERE level = 1
        `);

        res.status(200).json({ users: usersQuery });
    } catch (error) {
        console.error('Error retrieving user data for select options:', error);
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

app.put('/api/admin/updateuser/:userId', upload.single('profilePic'), async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUserData = req.body;

        // Check if a file was uploaded
        if (req.file) {
            // Update the 'picture' field with the new file path
            updatedUserData.picture = req.file.filename;
        }

        // Use a conditional update based on whether a file was uploaded
        const updateQuery = await queryPromise(
            req.file
                ? 'UPDATE users SET first_name=?, last_name=?, email=?, position=?, agency=?, tel_num=?, picture=? WHERE id=?'
                : 'UPDATE users SET first_name=?, last_name=?, email=?, position=?, agency=?, tel_num=? WHERE id=?',
            req.file
                ? [updatedUserData.first_name, updatedUserData.last_name, updatedUserData.email, updatedUserData.position, updatedUserData.agency, updatedUserData.tel_num, updatedUserData.picture, userId]
                : [updatedUserData.first_name, updatedUserData.last_name, updatedUserData.email, updatedUserData.position, updatedUserData.agency, updatedUserData.tel_num, userId]
        );

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


        const picture_path = req.file ? `/uploads/user_pic/${req.file.filename}` : null;


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

app.get('/api/admin/job', async (req, res) => {
    try {

        const result = await queryPromise('SELECT * FROM job_position');


        res.status(200).json({ jobs: result, totalJobs: result.length });
    } catch (error) {
        console.error('Error fetching job data:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.post('/api/admin/addjob', async (req, res) => {
    try {
        const { job_name, job_status } = req.body;

        // Check if the job name is provided
        const existingJob = await queryPromise('SELECT * FROM job_position WHERE job_name = ?', [job_name]);

        if (existingJob && existingJob.length > 0) {
            return res.status(400).json({ error: 'Job name already exists.' });
        }

        // Insert the job into the database
        const result = await queryPromise('INSERT INTO job_position (job_name, job_status, job_create) VALUES (?, ?, NOW())', [job_name, job_status]);

        if (result.affectedRows === 1) {
            res.status(201).json({ success: true, message: 'Job created successfully.' });
        } else {
            res.status(500).json({ error: 'Error adding job position.' });
        }
    } catch (error) {
        console.error('Error adding job position:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.put('/api/admin/job/updateStatus/:jobId', async (req, res) => {
    try {
        const jobId = req.params.jobId;

        // Fetch the current job status from the database
        const currentStatusQuery = await queryPromise('SELECT job_status FROM job_position WHERE job_id = ?', [jobId]);

        if (!currentStatusQuery || currentStatusQuery.length === 0) {
            return res.status(404).json({ error: 'Job not found.' });
        }

        const currentStatus = currentStatusQuery[0].job_status;

        // Toggle the status
        const updatedStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

        // Update the job status in the database
        const updateQuery = 'UPDATE job_position SET job_status = ? WHERE job_id = ?';
        await queryPromise(updateQuery, [updatedStatus, jobId]);

        res.status(200).json({ success: true, message: 'Job status updated successfully.', updatedStatus });
    } catch (error) {
        console.error('Error updating job status:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.delete('/api/admin/deletejob/:jobId', async (req, res) => {
    const jobId = req.params.userId;
    console.log('Received request to delete job with ID:', jobId);

    try {
        // Check if the user with the specified userId exists
        const jobResult = await queryPromise('SELECT * FROM job_position WHERE job_id = ?', [jobId]);

        if (!jobResult || jobResult.length === 0) {
            return res.status(404).json({ error: 'Job position not found.' });
        }

        // Delete the user
        await queryPromise('DELETE FROM job_position WHERE job_id = ?', [jobId]);

        res.status(200).json({ success: true, message: 'Job position deleted successfully.' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.get('/api/admin/category', async (req, res) => {
    try {

        const result = await queryPromise('SELECT * FROM category');


        res.status(200).json({ categories: result, totalCategories: result.length });
    } catch (error) {
        console.error('Error fetching job data:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.post('/api/admin/addcategory', async (req, res) => {
    try {
        const { category_name, category_status } = req.body;

        // Check if the job name is provided
        const existingJob = await queryPromise('SELECT * FROM category WHERE cat_name = ?', [category_name]);

        if (existingJob && existingJob.length > 0) {
            return res.status(400).json({ error: 'Category already exists.' });
        }

        // Insert the job into the database
        const result = await queryPromise('INSERT INTO category (cat_name, cat_status, cat_create) VALUES (?, ?, NOW())', [category_name, category_status]);

        if (result.affectedRows === 1) {
            res.status(201).json({ success: true, message: 'Category created successfully.' });
        } else {
            res.status(500).json({ error: 'Error adding category.' });
        }
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.put('/api/admin/category/updateStatus/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        // Fetch the current job status from the database
        const currentStatusQuery = await queryPromise('SELECT cat_status FROM category WHERE cat_id = ?', [categoryId]);

        if (!currentStatusQuery || currentStatusQuery.length === 0) {
            return res.status(404).json({ error: 'category not found.' });
        }

        const currentStatus = currentStatusQuery[0].cat_status;

        // Toggle the status
        const updatedStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

        // Update the job status in the database
        const updateQuery = 'UPDATE category SET cat_status = ? WHERE cat_id = ?';
        await queryPromise(updateQuery, [updatedStatus, categoryId]);

        res.status(200).json({ success: true, message: 'Category status updated successfully.', updatedStatus });
    } catch (error) {
        console.error('Error updating categoey status:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.delete('/api/admin/deletecategory/:categoryId', async (req, res) => {
    const categoryId = req.params.userId;
    console.log('Received request to delete category with ID:', categoryId);

    try {
        // Check if the user with the specified userId exists
        const categoryResult = await queryPromise('SELECT * FROM category WHERE cat_id = ?', [categoryId]);

        if (!categoryResult || categoryResult.length === 0) {
            return res.status(404).json({ error: 'category not found.' });
        }

        // Delete the user
        await queryPromise('DELETE FROM category WHERE cat_id', [categoryId]);

        res.status(200).json({ success: true, message: 'Category deleted successfully.' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.get('/api/admin/orders', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const ordersPerPage = parseInt(req.query.ordersPerPage) || 10;
        const searchTerm = req.query.searchTerm || '';


        // Calculate offset
        const offset = (page - 1) * ordersPerPage;

        // Query to get paginated and filtered orders with user details and total price for each order
        const ordersQuery = await queryPromise(`
            SELECT
                orders.order_id,
                orders.user_id AS order_uid,
                orders.order_num,
                users.first_name,
                users.last_name,
                DATE_FORMAT(orders.order_create, '%Y-%m-%d %H:%i:%s') AS order_create,
                orders.order_state,
                orders.order_status,
                SUM(order_detail.detail_price * order_detail.detail_quantity) as total_price
            FROM
                orders
                JOIN users ON orders.user_id = users.id
                JOIN order_detail ON orders.order_id = order_detail.order_id
            WHERE
                users.first_name LIKE ? OR users.last_name LIKE ? OR orders.order_num LIKE ?
            GROUP BY
                orders.order_id
            ORDER BY orders.order_create DESC
            LIMIT ? OFFSET ?`,
            [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, ordersPerPage, offset]
        );

        // Query to get total number of filtered orders
        const totalOrdersQuery = await queryPromise(`
            SELECT COUNT(DISTINCT orders.order_id) as total
            FROM orders
            JOIN users ON orders.user_id = users.id
            JOIN order_detail ON orders.order_id = order_detail.order_id
            WHERE users.first_name LIKE ? OR users.last_name LIKE ? OR orders.order_num LIKE ?`,
            [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
        );
        const totalOrders = totalOrdersQuery[0].total;

        // Calculate total pages
        const totalPages = Math.ceil(totalOrders / ordersPerPage);

        // Send response with filtered order data, total orders, and total pages
        res.status(200).json({
            orders: ordersQuery,
            totalOrders,
            totalPages,
        });
    } catch (error) {
        console.error('Error retrieving order data:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.get('/api/admin/order/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const orderQuery = await queryPromise('SELECT * FROM orders WHERE order_id = ?', [orderId]);
        const orderDetailsQuery = await queryPromise('SELECT * FROM order_detail WHERE order_id = ?', [orderId]);

        res.status(200).json({ order: orderQuery[0], orderDetails: orderDetailsQuery });
    } catch (error) {
        console.error('Error fetching order data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/admin/detail/:detailId', async (req, res) => {
    try {
        const detailId = req.params.detailId;
        const detailQuery = await queryPromise('SELECT * FROM order_detail WHERE order_id = ?', [detailId]);

        res.status(200).json({ details: detailQuery, totaldetails: detailQuery.length });
    } catch (error) {
        console.error('Error fetching detail data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/admin/createorderanduploadimages', upload.array('detailPath'), async (req, res) => {
    try {
        const { userId, orders: ordersString } = req.body;
        const orders = JSON.parse(ordersString);


        // First, create the order
        const orderNum = generateOrderNumber();
        const insertOrderQuery = await queryPromise('INSERT INTO orders (order_num, user_id, order_status, order_state, order_create) VALUES (?, ?, ?, ?, NOW())', [orderNum, userId, 'Inactive', 'pending']);
        const orderId = insertOrderQuery.insertId;

        const insertOrderDetailsQuery = await Promise.all(
            orders.map(async (order, index) => {
                const { itemName, quantity, price, link } = order;
                const detailPath = req.files[index] ? `/uploads/images_order/${req.files[index].filename}` : null;
                const insertDetailQuery = await queryPromise('INSERT INTO order_detail (order_id, detail_name, detail_quantity, detail_price, detail_url, detail_path, detail_create) VALUES (?, ?, ?, ?, ?, ?, NOW())', [orderId, itemName, quantity, price, link, detailPath]);
                return insertDetailQuery.insertId; // Return the detail_id
            })
        );

        res.status(200).json({ message: 'Order created successfully!', orderId, detailIds: insertOrderDetailsQuery });
    } catch (error) {
        console.error('Error creating order and details:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.put('/api/admin/order/updateStatus/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;

        // Fetch the current job status from the database
        const currentStatusQuery = await queryPromise('SELECT order_status FROM orders WHERE order_id = ?', [orderId]);

        if (!currentStatusQuery || currentStatusQuery.length === 0) {
            return res.status(404).json({ error: 'order not found.' });
        }

        const currentStatus = currentStatusQuery[0].order_status;

        // Toggle the status
        const updatedStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

        // Update the job status in the database
        const updateQuery = 'UPDATE orders SET order_status = ? WHERE order_id = ?';
        await queryPromise(updateQuery, [updatedStatus, orderId]);

        res.status(200).json({ success: true, message: 'Order status updated successfully.', updatedStatus });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.delete('/api/admin/deleteorder/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    console.log('Received request to delete order with ID:', orderId);

    try {

        const orderResult = await queryPromise('SELECT * FROM orders WHERE order_id = ?', [orderId]);

        if (!orderResult || orderResult.length === 0) {
            return res.status(404).json({ error: 'Order not found.' });
        }


        await queryPromise('DELETE FROM order_detail WHERE order_id = ?', [orderId]);


        await queryPromise('DELETE FROM orders WHERE order_id = ?', [orderId]);

        res.status(200).json({ success: true, message: 'Order and related details deleted successfully.' });
    } catch (error) {
        console.error('Error deleting order and details:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.put('/api/admin/editdetailimages', upload.array('picture'), async (req, res) => {
    try {
        
        const detailId = req.body.detail_id;
        const userId = req.body.userId;
        const orderId = req.body.orderId;
        const ordersString = req.body.orders;
        const orders = JSON.parse(ordersString);

        // Handle file uploads
        const uploadedFiles = req.files || [];

        console.log(req.body);
        console.log(req.files);

        res.status(200).json({ message: 'Details updated successfully!' });
    } catch (error) {
        console.error('Error updating details:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});