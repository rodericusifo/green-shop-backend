import { Document } from 'mongoose';

interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    imageURL: string;
    Carts: string[];
}

export { IProduct };
