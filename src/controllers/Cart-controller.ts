import { Response, NextFunction } from 'express';
import { ICustomRequest } from '../interfaces/CustomRequest-interface';
import { CartModel } from '../models/Cart-model';
import { ProductModel } from '../models/Product-model';
import { UserModel } from '../models/User-model';

class CartController {
    static async createOne(
        req: ICustomRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            if (!req.body.quantity || !req.body.ProductID) {
                throw { name: 'Quantity and Product ID Required' };
            }
            const foundOneProduct = await ProductModel.findOne({
                _id: req.body.ProductID
            });
            if(!foundOneProduct) {
                throw {name: 'Product not Found for Cart'}
            }
            const createOneCart: { [key: string]: number | string } = {
                quantity: req.body.quantity,
                Product: req.body.ProductID,
                User: req.params.userID
            };
            if (req.body.quantity && req.body.ProductID) {
                createOneCart.amount =
                    req.body.quantity * foundOneProduct!.price;
            }
            const newCart = new CartModel(createOneCart);
            const savedCart = await newCart.save();
            await UserModel.findOneAndUpdate(
                { _id: savedCart.User },
                { $push: { Carts: savedCart._id } },
                { new: true }
            );
            await ProductModel.findOneAndUpdate(
                { _id: savedCart.Product },
                { $push: { Carts: savedCart._id } },
                { new: true }
            );
            res.status(201).json({
                success: true,
                message: 'Cart Created',
                status: 'Created',
                statusCode: 201
            });
        } catch (err) {
            next(err);
        }
    }

    static async readAll(
        req: ICustomRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const foundAllCart = await CartModel.find(
                { User: req.params.userID },
                '_id quantity amount Product'
            ).populate('Product', '_id name price description imageURL');
            if (foundAllCart.length < 1) {
                throw { name: 'Carts not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'All Carts found',
                data: { Carts: foundAllCart },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }

    static async updateOne(
        req: ICustomRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const foundOneCart = await CartModel.findOne({
                _id: req.params.cartID
            });
            if (!foundOneCart) {
                throw { name: 'Cart was Deleted' };
            }
            const foundOneProduct = await ProductModel.findOne({
                _id: foundOneCart!.Product
            });
            const updateOneCart: { [key: string]: string | number } = {
                quantity: req.body.quantity
            };
            if (req.body.quantity) {
                updateOneCart.amount =
                    req.body.quantity * foundOneProduct!.price;
            }
            for (const key in updateOneCart) {
                if (!updateOneCart[key]) {
                    delete updateOneCart[key];
                }
            }
            await CartModel.findOneAndUpdate(
                { _id: req.params.cartID, User: req.params.userID },
                updateOneCart,
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: 'Edit cart success',
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteOne(
        req: ICustomRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const deletedOneCart = await CartModel.findOneAndDelete({
                _id: req.params.cartID,
                User: req.params.userID
            });
            if (!deletedOneCart) {
                throw { name: 'Cart was Deleted' };
            }
            await UserModel.findOneAndUpdate(
                { _id: deletedOneCart!.User },
                { $pull: { Carts: deletedOneCart!._id } },
                { new: true }
            );
            await ProductModel.findOneAndUpdate(
                { _id: deletedOneCart!.Product },
                { $pull: { Carts: deletedOneCart!._id } },
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: 'Delete cart success',
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { CartController };
