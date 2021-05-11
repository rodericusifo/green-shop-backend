import { Request } from 'express';

interface ICustomRequest extends Request {
    userTokenID?: string;
}

export { ICustomRequest };
