const mongoose = require('mongoose');
const Product = require('./model/Product');
const productsData = require('../frontend/src/data/productsData');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecom', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
    return Product.deleteMany({});
})
.then(() => {
    return Product.insertMany(productsData);
})
.then(() => {
    console.log('Products inserted successfully');
})
.catch(err => {
    console.error('Error inserting products:', err);
})
.finally(() => {
    mongoose.connection.close();
});
