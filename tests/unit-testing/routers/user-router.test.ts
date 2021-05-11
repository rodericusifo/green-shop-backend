import { UserModel } from '../../../src/models/User-model';
import { loginUser, registerUser } from './helpers/user-router-helper';

describe('POST /users/register - User Registration Endpoint', () => {
    afterEach(async () => {
        await UserModel.deleteMany();
    });
    it('Should be able to register', async () => {
        const userRegistered = await registerUser({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(userRegistered.status).toEqual(201);
        expect(userRegistered.body).toEqual({
            success: true,
            message: 'Registration Success',
            status: 'Created',
            statusCode: 201
        });
    });
    it(`Should can handle the error, if user doesn't input their email`, async () => {
        const userRegistered = await registerUser({
            password: '120399'
        });
        expect(userRegistered.status).toEqual(422);
        expect(userRegistered.body).toEqual({
            success: false,
            message:
                'Email and Password Required: Your email and password required to perform this action',
            status: 'Unprocessable Entity',
            statusCode: 422
        });
    });
    it(`Should can handle the error, if user doesn't input their password`, async () => {
        const userRegistered = await registerUser({
            email: 'rodericus1999@gmail.com'
        });
        expect(userRegistered.status).toEqual(422);
        expect(userRegistered.body).toEqual({
            success: false,
            message:
                'Email and Password Required: Your email and password required to perform this action',
            status: 'Unprocessable Entity',
            statusCode: 422
        });
    });
    it(`Should can handle the error, if user doesn't input their valid email address`, async () => {
        const userRegistered = await registerUser({
            email: 'rodericus1999',
            password: '120399'
        });
        expect(userRegistered.status).toEqual(422);
        expect(userRegistered.body).toEqual({
            success: false,
            message: 'Invalid Email: Please fill a valid email address',
            status: 'Unprocessable Entity',
            statusCode: 422
        });
    });
    it(`Should can handle the error, if user doesn't input their unique email address`, async () => {
        const userOneRegister = await registerUser({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(userOneRegister.status).toEqual(201);
        const userTwoRegister = await registerUser({
            email: 'rodericus1999@gmail.com',
            password: '211299'
        });
        expect(userTwoRegister.status).toEqual(422);
        expect(userTwoRegister.body).toEqual({
            success: false,
            message:
                'MongoError: Sorry this data has been used by another user, please enter another unique data',
            status: 'Unprocessable Entity',
            statusCode: 422
        });
    });
});

describe('POST /users/login - User Login Endpoint', () => {
    beforeEach(async () => {
        const userRegistered = await registerUser({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(userRegistered.status).toEqual(201);
    });
    afterEach(async () => {
        await UserModel.deleteMany();
    });
    it('Should be able to login', async () => {
        const userLogged = await loginUser({
            email: 'rodericus1999@gmail.com',
            password: '120399'
        });
        expect(userLogged.status).toEqual(200);
        expect(userLogged.body).toEqual({
            success: true,
            message: 'Login Success',
            data: {
                User: userLogged.body.data.User,
                Authorization: userLogged.body.data.Authorization
            },
            status: 'OK',
            statusCode: 200
        });
    });
    it(`Should can handle the error, if user doesn't input their email`, async () => {
        const userLogged = await loginUser({
            password: '120399'
        });
        expect(userLogged.status).toEqual(422);
        expect(userLogged.body).toEqual({
            success: false,
            message:
                'Email and Password Required: Your email and password required to perform this action',
            status: 'Unprocessable Entity',
            statusCode: 422
        });
    });
    it(`Should can handle the error, if user doesn't input their password`, async () => {
        const userLogged = await loginUser({
            email: 'rodericus1999@gmail.com'
        });
        expect(userLogged.status).toEqual(422);
        expect(userLogged.body).toEqual({
            success: false,
            message:
                'Email and Password Required: Your email and password required to perform this action',
            status: 'Unprocessable Entity',
            statusCode: 422
        });
    });
    it(`Should can handle the error, if user doesn't input their valid email address`, async () => {
        const userLogged = await loginUser({
            email: 'rodericus1999',
            password: '120399'
        });
        expect(userLogged.status).toEqual(422);
        expect(userLogged.body).toEqual({
            success: false,
            message: 'Invalid Email: Please fill a valid email address',
            status: 'Unprocessable Entity',
            statusCode: 422
        });
    });
    it(`Should can handle the error, if user input wrong email and correct password`, async () => {
        const userLogged = await loginUser({
            email: 'rodericus1203@gmail.com',
            password: '120399'
        });
        expect(userLogged.status).toEqual(401);
        expect(userLogged.body).toEqual({
            success: false,
            message:
                "Combination doesn't Match: Password combination with your (username or email) does not match",
            status: 'Unauthorized',
            statusCode: 401
        });
    });
    it(`Should can handle the error, if user input correct email and wrong password`, async () => {
        const userLogged = await loginUser({
            email: 'rodericus1999@gmail.com',
            password: '211299'
        });
        expect(userLogged.status).toEqual(401);
        expect(userLogged.body).toEqual({
            success: false,
            message:
                "Combination doesn't Match: Password combination with your (username or email) does not match",
            status: 'Unauthorized',
            statusCode: 401
        });
    });
});
