import request from 'supertest';
import { app } from '../../../../src/App';

const createCart = async (
    userID: string,
    authorization: string,
    cart: { quantity?: number; ProductID?: string }
) => {
    const cartCreated = await request(app)
        .post(`/users/${userID}/carts/create`)
        .set('Authorization', `${authorization}`)
        .send(cart);
    return cartCreated;
};

const listCart = async (userID: string, authorization: string) => {
    const cartList = await request(app)
        .get(`/users/${userID}/carts/list`)
        .set('Authorization', `${authorization}`);
    return cartList;
};

const editCart = async (
    userID: string,
    cartID: string,
    authorization: string,
    cart: { quantity?: number }
) => {
    const cartEdited = await request(app)
        .put(`/users/${userID}/carts/${cartID}/edit`)
        .set('Authorization', `${authorization}`)
        .send(cart);
    return cartEdited;
};

const deleteCart = async (
    userID: string,
    cartID: string,
    authorization: string
) => {
    const cartDeleted = await request(app)
        .delete(`/users/${userID}/carts/${cartID}/delete`)
        .set('Authorization', `${authorization}`);
    return cartDeleted;
};

export { createCart, listCart, editCart, deleteCart };
