import { Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    Carts: string[];
    Orders: string[];
}

export { IUser };
