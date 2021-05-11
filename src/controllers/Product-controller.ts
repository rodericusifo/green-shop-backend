import { Response, NextFunction } from 'express';
import { ICustomRequest } from '../interfaces/CustomRequest-interface';
import { ProductModel } from '../models/Product-model';

class ProductController {
    static async readAll(
        _req: ICustomRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const foundAllProduct = await ProductModel.find(
                {},
                '_id name price description imageURL'
            );
            if (foundAllProduct.length < 1) {
                throw { name: 'Products not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'All Products found',
                data: { Products: foundAllProduct },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }

    static async readOne(
        req: ICustomRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const foundOneProduct = await ProductModel.findOne(
                { _id: req.params.productID },
                '_id name price description imageURL'
            );
            if (!foundOneProduct) {
                throw { name: 'Product not Found' };
            }
            res.status(200).json({
                success: true,
                message: 'Product found',
                data: { Product: foundOneProduct },
                status: 'OK',
                statusCode: 200
            });
        } catch (err) {
            next(err);
        }
    }
}

export { ProductController };
