import { Schema, Model, model } from 'mongoose';
import { ICart } from '../interfaces/Cart-interface';

// Cart Schema
const cartSchema = new Schema(
    {
        quantity: { type: Number, min: 1, required: true },
        amount: { type: Number, min: 0, required: true },
        Product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        User: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        Order: { type: Schema.Types.ObjectId, ref: 'Order' }
    },
    { timestamps: true }
);

// Cart Model
const CartModel: Model<ICart> = model<ICart>('Cart', cartSchema);

export { CartModel };
