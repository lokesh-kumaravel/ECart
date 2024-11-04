const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Lokesh'; // Use a secure, environment-variable-based secret key

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Token should be after "Bearer"

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token verification failed', err });
        }
        req.user = user; // Attach user info to request for use in routes
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
