const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const productRoutes = require('./routes/productRoutes');
const UserRoutes = require('./routes/UserRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecom', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Use Product Routes
app.use('/api/products', productRoutes);
app.use('/api/users',UserRoutes )
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
