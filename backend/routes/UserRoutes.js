const express = require('express');
const User = require('../model/User'); // Make sure your User model is defined with the necessary fields
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
// Registration Route
router.post('/register', async (req, res) => {
    console.log("Incoming Request Body:", req.body); // Log incoming data
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
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

const JWT_SECRET = 'Lokesh'; 

router.post('/login', async (req, res) => {
    console.log("Incoming Request Body:", req.body); 
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload: user ID and email
            JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Token expiration time
        );

        res.status(200).json({ message: 'Login successful', token }); // Return the token in the response
    } catch (error) {
        console.error("Error during login:", error); // Log the error
        res.status(500).json({ message: 'Internal server error', error });
    }
});

router.get('/profile', authenticateToken, (req, res) => {
    // Only accessible if the user is authenticated
    res.status(200).json({ message: 'Profile accessed', user: req.user });
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
