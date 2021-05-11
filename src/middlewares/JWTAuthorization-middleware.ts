import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UserModel } from '../models/User-model';
import { IDecodedToken } from '../interfaces/DecodedToken-interface';
import { ICustomRequest } from '../interfaces/CustomRequest-interface';

class JWTAuthorization {
    static async verifyAccessToken(
        req: ICustomRequest,
        _res: Response,
        next: NextFunction
    ) {
        try {
            // When user doesn't input access token
            if (!req.header('Authorization')) {
                throw { name: 'Missing Access Token' };
            }
            const decoded = jwt.verify(
                req.header('Authorization')!.replace('Bearer ', ''),
                process.env.SECRET_KEY!
            ) as IDecodedToken;
            req.userTokenID = decoded.id;
            next();
        } catch (err) {
            next(err);
        }
    }

    static async authorization(
        req: ICustomRequest,
        _res: Response,
        next: NextFunction
    ) {
        try {
            const foundUser = await UserModel.findOne({ _id: req.userTokenID });
            // User not found, when do query using access token's ID from user model
            if (!foundUser) {
                throw { name: 'Access Token not Assosiated' };
            }
            if (String(foundUser._id) === req.params.userID) {
                next();
            } else {
                // When found user's ID not match with user's ID from params
                throw { name: 'Forbidden Access' };
            }
        } catch (err) {
            next(err);
        }
    }
}

export { JWTAuthorization };
