import { Response, NextFunction } from 'express';
import { ICustomRequest } from '../interfaces/CustomRequest-interface';
import { CartModel } from '../models/Cart-model';
import { OrderModel } from '../models/Order-model';
import { UserModel } from '../models/User-model';

class OrderController {
    static async createOne(
        req: ICustomRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            if (
                !req.body.buyerName ||
                !req.body.buyerAddress ||
                !req.body.buyerPhoneNumber
            ) {
                throw {
                    name:
                        'Buyer Name, Buyer Address, and Buyer Phone Number Required'
                };
            }
            const foundAllCart = await CartModel.find({
                User: req.params.userID
            });
            if (foundAllCart.length < 1) {
                throw { name: 'Carts not Found for Order' };
            }
            const createOneOrder = {
                buyer: {
                    name: req.body.buyerName,
                    address: req.body.buyerAddress,
                    phoneNumber: req.body.buyerPhoneNumber
                },
                User: req.params.userID
            };
            const newOrder = new OrderModel(createOneOrder);
            const savedOrder = await newOrder.save();
            await UserModel.findOneAndUpdate(
                { _id: savedOrder.User },
                { $push: { Orders: savedOrder._id } },
                { new: true }
            );
            foundAllCart.forEach(async (Cart) => {
                await CartModel.findOneAndUpdate(
                    {
                        _id: Cart._id,
                        User: Cart.User
                    },
                    { $unset: { User: 1 }, Order: savedOrder._id },
                    { new: true }
                );
                await UserModel.findOneAndUpdate(
                    { _id: savedOrder.User },
                    { $pull: { Carts: Cart._id } },
                    {
                        new: true
                    }
                );
                await OrderModel.findOneAndUpdate(
                    {
                        _id: savedOrder._id,
                        User: savedOrder.User
                    },
                    {
                        $push: { Carts: Cart._id },
                        $inc: { total: Cart.amount }
                    }
                );
            });
            res.status(201).json({
                success: true,
                message: 'Order Created',
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
            const foundAllOrder = await OrderModel.find(
                { User: req.params.userID },
                '_id total Carts buyer'
            ).populate({
                path: 'Carts',
                select: '_id quantity amount Product',
                populate: {
                    path: 'Product',
                    select: '_id name price description imageURL'
                }
            });
            if (foundAllOrder.length < 1) {
                throw { name: 'Orders not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'All Orders found',
                data: { Orders: foundAllOrder },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { OrderController };
