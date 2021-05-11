import request from 'supertest';
import { CartModel } from '../../../src/models/Cart-model';
import { UserModel } from '../../../src/models/User-model';
import {
    createCart,
    deleteCart,
    editCart,
    listCart
} from './helpers/cart-router-helper';
import { listProduct } from './helpers/product-router-helper';
import { loginUser, registerUser } from './helpers/user-router-helper';

describe('POST /users/:userID/carts/create - Create Cart Endpoint', () => {
    let userLoggedResponse: request.Response;
    let productListResponse: request.Response;
    beforeEach(async () => {
        const userRegistered = await registerUser({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(userRegistered.status).toEqual(201);
        const userLogged = await loginUser({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(userLogged.status).toEqual(200);
        const productList = await listProduct();
        expect(productList.status).toEqual(200);
        userLoggedResponse = userLogged;
        productListResponse = productList;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await CartModel.deleteMany();
    });
    it('Should be able to create cart', async () => {
        const cartCreated = await createCart(
            userLoggedResponse.body.data.User._id,
            userLoggedResponse.body.data.Authorization,
            {
                quantity: 1,
                ProductID: productListResponse.body.data.Products[2]._id
            }
        );
        expect(cartCreated.status).toEqual(201);
        expect(cartCreated.body).toEqual({
            success: true,
            message: 'Cart Created',
            status: 'Created',
            statusCode: 201
        });
    });
});

describe('GET /users/:userID/carts/list - List Cart Endpoint', () => {
    let userLoggedResponse: request.Response;
    beforeEach(async () => {
        const userRegistered = await registerUser({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(userRegistered.status).toEqual(201);
        const userLogged = await loginUser({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(userLogged.status).toEqual(200);
        const productList = await listProduct();
        expect(productList.status).toEqual(200);
        const cartCreated = await createCart(
            userLogged.body.data.User._id,
            userLogged.body.data.Authorization,
            {
                quantity: 1,
                ProductID: productList.body.data.Products[2]._id
            }
        );
        expect(cartCreated.status).toEqual(201);
        userLoggedResponse = userLogged;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await CartModel.deleteMany();
    });
    it('Should be able to see list cart', async () => {
        const cartList = await listCart(
            userLoggedResponse.body.data.User._id,
            userLoggedResponse.body.data.Authorization
        );
        expect(cartList.status).toEqual(200);
        expect(cartList.body).toEqual({
            success: true,
            message: 'All Carts found',
            data: { Carts: cartList.body.data.Carts },
            status: 'OK',
            statusCode: 200
        });
    });
});

describe('PUT /users/:userID/carts/:cartID/edit - Edit Cart Endpoint', () => {
    let userLoggedResponse: request.Response;
    let cartListResponse: request.Response;
    beforeEach(async () => {
        const userRegistered = await registerUser({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(userRegistered.status).toEqual(201);
        const userLogged = await loginUser({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(userLogged.status).toEqual(200);
        const productList = await listProduct();
        expect(productList.status).toEqual(200);
        const cartCreated = await createCart(
            userLogged.body.data.User._id,
            userLogged.body.data.Authorization,
            {
                quantity: 1,
                ProductID: productList.body.data.Products[2]._id
            }
        );
        expect(cartCreated.status).toEqual(201);
        const cartList = await listCart(
            userLogged.body.data.User._id,
            userLogged.body.data.Authorization
        );
        expect(cartList.status).toEqual(200);
        userLoggedResponse = userLogged;
        cartListResponse = cartList;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await CartModel.deleteMany();
    });
    it('Should able to edit cart', async () => {
        const cartEdited = await editCart(
            userLoggedResponse.body.data.User._id,
            cartListResponse.body.data.Carts[0]._id,
            userLoggedResponse.body.data.Authorization,
            {
                quantity: 3
            }
        );
        expect(cartEdited.status).toEqual(200);
        expect(cartEdited.body).toEqual({
            success: true,
            message: 'Edit cart success',
            status: 'OK',
            statusCode: 200
        });
    });
});

describe('DELETE /users/:userID/carts/:cartID/delete - Delete Cart Endpoint', () => {
    let userLoggedResponse: request.Response;
    let cartListResponse: request.Response;
    beforeEach(async () => {
        const userRegistered = await registerUser({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(userRegistered.status).toEqual(201);
        const userLogged = await loginUser({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(userLogged.status).toEqual(200);
        const productList = await listProduct();
        expect(productList.status).toEqual(200);
        const cartCreated = await createCart(
            userLogged.body.data.User._id,
            userLogged.body.data.Authorization,
            {
                quantity: 1,
                ProductID: productList.body.data.Products[2]._id
            }
        );
        expect(cartCreated.status).toEqual(201);
        const cartList = await listCart(
            userLogged.body.data.User._id,
            userLogged.body.data.Authorization
        );
        expect(cartList.status).toEqual(200);
        userLoggedResponse = userLogged;
        cartListResponse = cartList;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await CartModel.deleteMany();
    });
    it('Should be able to delete cart', async () => {
        const cartDeleted = await deleteCart(
            userLoggedResponse.body.data.User._id,
            cartListResponse.body.data.Carts[0]._id,
            userLoggedResponse.body.data.Authorization
        );
        expect(cartDeleted.status).toEqual(200);
        expect(cartDeleted.body).toEqual({
            success: true,
            message: 'Delete cart success',
            status: 'OK',
            statusCode: 200
        });
    });
});
