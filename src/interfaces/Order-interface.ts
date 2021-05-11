import { Document } from 'mongoose';

interface IOrder extends Document {
    buyer: {
        name: string;
        address: string;
        phoneNumber: string;
    };
    User: string;
    total: number;
    Carts: string[];
}

export { IOrder };
