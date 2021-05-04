"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
var mongoose_1 = require("mongoose");
// Order Schema
var orderSchema = new mongoose_1.Schema({
    buyer: {
        name: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        phoneNumber: { type: String, required: true, trim: true }
    },
    User: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    total: { type: Number, min: 0, default: 0 },
    Carts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Cart' }]
}, { timestamps: true });
// Order Model
var OrderModel = mongoose_1.model('Order', orderSchema);
exports.OrderModel = OrderModel;
