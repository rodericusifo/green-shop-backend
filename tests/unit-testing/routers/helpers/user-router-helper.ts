import request from 'supertest';
import { app } from '../../../../src/App';

const registerUser = async (user: { email?: string; password?: string }) => {
    const userRegistered = await request(app)
        .post('/users/register')
        .send(user);
    return userRegistered;
};

const loginUser = async (user: { email?: string; password?: string }) => {
    const userLogged = await request(app).post('/users/login').send(user);
    return userLogged;
};

export { registerUser, loginUser };
