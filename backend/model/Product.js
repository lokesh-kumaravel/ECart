const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    tag: { type: String, required: false },
    tagline: { type: String, required: false },
    heroImage: { type: String, required: false }, 
    images: { type: [String], required: true },
    brand: { type: String, required: true },
    title: { type: String, required: true },
    info: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    connectivity: { type: String, required: true },
    finalPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    ratings: { type: Number, required: true, default: 0 },
    rateCount: { type: Number, required: true, default: 0 },
    path: { type: String, required: true },
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
