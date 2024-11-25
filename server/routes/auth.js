const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Customers } = require('../models');

const SECRET_KEY = "your_secret_key"; // Replace with a secure key

// Login Endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Customers.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: "User not found" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.customer_id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

// Signup Endpoint
router.post('/signup', async (req, res) => {
    const { name, email, password, phoneNo, age, role } = req.body;

    try {
        console.log("Signup request body:", req.body); // Log incoming request

        // Check if the email is already in use
        const existingUser = await Customers.findOne({ where: { email } });
        if (existingUser) {
            console.log("Email already in use:", email);
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const newUser = await Customers.create({
            name,
            email,
            password: hashedPassword,
            phoneNo,
            age: age ? parseInt(age) : null, // Convert age to integer or set to null if empty
            role: role || 'user', // Default to 'user' role
        });

        console.log("User created successfully:", newUser);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Signup failed" });
    }
});


// Middleware for authentication
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: "No token provided" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

// Middleware for role-based authorization
const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Forbidden" });
    }
    next();
};

// Example Protected Route
router.get('/admin/data', authenticate, authorize(['admin']), (req, res) => {
    res.json({ message: "This is admin-only data" });
});

module.exports = { router, authenticate, authorize };
