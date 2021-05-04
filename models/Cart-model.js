"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
var mongoose_1 = require("mongoose");
// Cart Schema
var cartSchema = new mongoose_1.Schema({
    quantity: { type: Number, min: 1, required: true },
    amount: { type: Number, min: 0, required: true },
    Product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    User: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    Order: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Order' }
}, { timestamps: true });
// Cart Model
var CartModel = mongoose_1.model('Cart', cartSchema);
exports.CartModel = CartModel;
