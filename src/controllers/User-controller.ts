import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { Response, NextFunction } from 'express';
import { ICustomRequest } from '../interfaces/CustomRequest-interface';
import { UserModel } from '../models/User-model';

class UserController {
    static async register(
        req: ICustomRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            if (!req.body.email || !req.body.password) {
                throw { name: 'Email and Password Required' };
            }
            if (req.body.email) {
                if (!validator.isEmail(req.body.email)) {
                    throw { name: 'Invalid Email' };
                }
            }
            const registerUser = {
                email: req.body.email,
                password: req.body.password
            };
            if (req.body.password) {
                registerUser.password = await bcrypt.hash(req.body.password, 8);
            }
            const newUser = new UserModel(registerUser);
            await newUser.save();
            res.status(201).json({
                success: true,
                message: 'Registration Success',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req: ICustomRequest, res: Response, next: NextFunction) {
        try {
            if (!req.body.email || !req.body.password) {
                throw { name: 'Email and Password Required' };
            }
            if (req.body.email) {
                if (!validator.isEmail(req.body.email)) {
                    throw { name: 'Invalid Email' };
                }
            }
            const loginUser = {
                email: req.body.email,
                password: req.body.password
            };
            const foundOneUser = await UserModel.findOne({
                email: loginUser.email
            });
            // When user not found
            if (!foundOneUser) {
                throw { name: `Combination doesn't Match` };
            }
            const isPasswordValid = await bcrypt.compare(
                loginUser.password,
                foundOneUser.password
            );
            // When User password is wrong
            if (!isPasswordValid) {
                throw { name: `Combination doesn't Match` };
            }
            // Get Access Token
            const accessToken = jwt.sign(
                { id: foundOneUser._id },
                process.env.SECRET_KEY!
            );
            res.status(200).json({
                success: true,
                message: 'Login Success',
                data: {
                    User: await UserModel.findOne(
                        { email: loginUser.email },
                        '_id'
                    ),
                    Authorization: `Bearer ${accessToken}`
                },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { UserController };
