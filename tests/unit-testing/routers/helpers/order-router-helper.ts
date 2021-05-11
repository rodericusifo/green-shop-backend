import request from 'supertest';
import { app } from '../../../../src/App';

const createOrder = async (
    userID: string,
    authorization: string,
    order: {
        buyerName?: string;
        buyerAddress?: string;
        buyerPhoneNumber?: string;
    }
) => {
    const orderCreated = await request(app)
        .post(`/users/${userID}/orders/create`)
        .set('Authorization', `${authorization}`)
        .send(order);
    return orderCreated;
};

const listOrder = async (userID: string, authorization: string) => {
    const orderList = await request(app)
        .get(`/users/${userID}/orders/list`)
        .set('Authorization', `${authorization}`);
    return orderList;
};

export { createOrder, listOrder };
