"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var validator_1 = __importDefault(require("validator"));
var mongoose_1 = require("mongoose");
// User Schema
var userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: [validator_1.default.isEmail, 'Please fill a valid email address']
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    Carts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Cart' }],
    Orders: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });
// User Model
var UserModel = mongoose_1.model('User', userSchema);
exports.UserModel = UserModel;
