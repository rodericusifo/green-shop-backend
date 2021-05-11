import request from 'supertest';
import { CartModel } from '../../../src/models/Cart-model';
import { OrderModel } from '../../../src/models/Order-model';
import { UserModel } from '../../../src/models/User-model';
import { createCart } from './helpers/cart-router-helper';
import { createOrder, listOrder } from './helpers/order-router-helper';
import { listProduct } from './helpers/product-router-helper';
import { loginUser, registerUser } from './helpers/user-router-helper';

describe('POST /users/:userID/orders/create - Create Order Endpoint', () => {
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
        await OrderModel.deleteMany();
    });
    it('Should be able to create order', async () => {
        const orderCreated = await createOrder(
            userLoggedResponse.body.data.User._id,
            userLoggedResponse.body.data.Authorization,
            {
                buyerName: 'Rodericus Ifo Krista',
                buyerAddress: 'Tarakan Street',
                buyerPhoneNumber: '0895601214950'
            }
        );
        expect(orderCreated.status).toEqual(201);
        expect(orderCreated.body).toEqual({
            success: true,
            message: 'Order Created',
            status: 'Created',
            statusCode: 201
        });
    });
});

describe('GET /users/:userID/orders/list - List Order Endpoint', () => {
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
        const orderCreated = await createOrder(
            userLogged.body.data.User._id,
            userLogged.body.data.Authorization,
            {
                buyerName: 'Rodericus Ifo Krista',
                buyerAddress: 'Tarakan Street',
                buyerPhoneNumber: '0895601214950'
            }
        );
        expect(orderCreated.status).toEqual(201);
        userLoggedResponse = userLogged;
    });
    afterEach(async () => {
        await UserModel.deleteMany();
        await CartModel.deleteMany();
        await OrderModel.deleteMany();
    });
    it('Should be able to see list order', async () => {
        const orderList = await listOrder(
            userLoggedResponse.body.data.User._id,
            userLoggedResponse.body.data.Authorization
        );
        expect(orderList.status).toEqual(200);
        expect(orderList.body).toEqual({
            success: true,
            message: 'All Orders found',
            data: { Orders: orderList.body.data.Orders },
            status: 'OK',
            statusCode: 200
        });
    });
});
