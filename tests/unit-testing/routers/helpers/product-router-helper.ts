import request from 'supertest';
import { app } from '../../../../src/App';

const listProduct = async () => {
    const productList = await request(app).get('/products/list');
    return productList;
};

const detailProduct = async (productID: string) => {
    const productDetail = await request(app).get(
        `/products/${productID}/detail`
    );
    return productDetail;
};

export { listProduct, detailProduct };
