import validator from 'validator';
import { Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/User-interface';

// User Schema
const userSchema = new Schema(
    {
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            validate: [validator.isEmail, 'Please fill a valid email address']
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        Carts: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
        Orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
    },
    { timestamps: true }
);

// User Model
const UserModel: Model<IUser> = model<IUser>('User', userSchema);

export { UserModel };
