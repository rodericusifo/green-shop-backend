import { Document } from 'mongoose';

interface ICart extends Document {
    quantity: number;
    amount: number;
    Product: string;
    User: string;
    Order: string;
}

export { ICart };
