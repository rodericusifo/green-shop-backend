import { Router } from 'express';
import { ProductController } from '../controllers/Product-controller';

class RProduct {
    private _router: Router;
    // Central Router Constructor
    constructor(router: Router) {
        this._router = router;
        this._routers();
    }
    // Properties Getter
    public get router(): Router {
        return this._router;
    }
    // Properties Setter
    public set router(value: Router) {
        this._router = value;
    }
    // Other Methods
    private _routers(): void {
        // Product List
        this._router.get('/list', ProductController.readAll);
        // Product Detail
        this.router.get('/:productID/detail', ProductController.readOne);
    }
}

const productRouter = new RProduct(Router()).router;

export { productRouter };
