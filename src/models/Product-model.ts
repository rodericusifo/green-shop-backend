import { Schema, Model, model } from 'mongoose';
import { IProduct } from '../interfaces/Product-interface';

// Product Schema
const productSchema = new Schema(
    {
        name: { type: String, trim: true, required: true, unique: true },
        price: { type: Number, required: true, min: 0 },
        description: { type: String, default: '', trim: true },
        imageURL: { type: String, default: '', trim: true },
        Carts: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
    },
    { timestamps: true }
);

// Product Model
const ProductModel: Model<IProduct> = model<IProduct>('Product', productSchema);

export { ProductModel };
