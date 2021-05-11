import { Schema, Model, model } from 'mongoose';
import { IOrder } from '../interfaces/Order-interface';

// Order Schema
const orderSchema = new Schema(
    {
        buyer: {
            name: { type: String, required: true, trim: true },
            address: { type: String, required: true, trim: true },
            phoneNumber: { type: String, required: true, trim: true }
        },
        User: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        total: { type: Number, min: 0, default: 0 },
        Carts: [{ type: Schema.Types.ObjectId, ref: 'Cart' }]
    },
    { timestamps: true }
);

// Order Model
const OrderModel: Model<IOrder> = model<IOrder>('Order', orderSchema);

export { OrderModel };
