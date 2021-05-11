import request from 'supertest';
import { listProduct, detailProduct } from './helpers/product-router-helper';

describe('GET /products/list - Product List Endpoint', () => {
    it('should be able get list product', async () => {
        const productList = await listProduct();
        expect(productList.status).toEqual(200);
        expect(productList.body).toEqual({
            success: true,
            message: 'All Products found',
            data: {
                Products: productList.body.data.Products
            },
            status: 'OK',
            statusCode: 200
        });
    });
});

describe('GET /products/:productID/detail - Product Detail Endpoint', () => {
    let productListResponse: request.Response;
    beforeEach(async () => {
        const productList = await listProduct();
        expect(productList.status).toEqual(200);
        productListResponse = productList;
    });
    it('should be able get detail product', async () => {
        const productDetail = await detailProduct(
            productListResponse.body.data.Products[2]._id
        );
        expect(productDetail.status).toEqual(200);
        expect(productDetail.body).toEqual({
            success: true,
            message: 'Product found',
            data: {
                Product: productDetail.body.data.Product
            },
            status: 'OK',
            statusCode: 200
        });
    });
    it('should can handle the error, if productID inputed wrong', async () => {
        const productDetail = await detailProduct(
            productListResponse.body.data.Products[2]._id.replace('0', '1')
        );
        expect(productDetail.status).toEqual(404);
        expect(productDetail.body).toEqual({
            success: false,
            message: 'Product not Found: Cannot find the product',
            status: 'Not Found',
            statusCode: 404
        });
    });
});
