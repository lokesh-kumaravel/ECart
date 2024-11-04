const express = require('express');
const User = require('../model/User'); // Make sure your User model is defined with the necessary fields
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    console.log("Incoming Request Body:", req.body); // Log incoming data
    const { username, email, password } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user instance with hashed password
        const userData = { username, email, password: hashedPassword };
        const user = new User(userData);

        // Save the user to the database
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error saving user:", error); // Log the error
        res.status(400).json({ message: 'Error creating user', error });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    console.log("Incoming Request Body:", req.body); // Log incoming data
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error("Error during login:", error); // Log the error
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;


// const express = require('express');
// const User = require('../model/User');

// const router = express.Router();

// router.post('/register', async (req, res) => {
//     console.log("Incoming Request Body:", req.body); // Log incoming data
//     const { username, email, password } = req.body;

//     const userData = { username, email, password };
//     const user = new User(userData);

//     try {
//         const savedUser = await user.save();
//         res.status(201).json(savedUser);
//     } catch (error) {
//         console.error("Error saving user:", error); // Log the error
//         res.status(400).json({ message: 'Error creating user', error });
//     }
// });


// router.post('/login', async (req, res) => {
//     console.log("Incoming Request Body:", req.body); // Log incoming data
//     const { email, password } = req.body;

//     const userData = { email, password };
//     const user = new User(userData);

//     try {
//         const savedUser = await user.save();
//         res.status(201).json(savedUser);
//     } catch (error) {
//         console.error("Error saving user:", error); // Log the error
//         res.status(400).json({ message: 'Error creating user', error });
//     }
// });


// module.exports = router;
