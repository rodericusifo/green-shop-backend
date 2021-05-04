"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var mongoose_1 = require("mongoose");
// Product Schema
var productSchema = new mongoose_1.Schema({
    name: { type: String, trim: true, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: '', trim: true },
    imageURL: { type: String, default: '', trim: true },
    Carts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Cart' }],
}, { timestamps: true });
// Product Model
var ProductModel = mongoose_1.model('Product', productSchema);
exports.ProductModel = ProductModel;
