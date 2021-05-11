import { Router } from 'express';
import { cartRouter } from './Cart-router';
import { orderRouter } from './Order-router';
import { productRouter } from './Product-router';
import { userRouter } from './User-router';
import { ErrorHandler } from '../middlewares/ErrorHandler-middleware';

class RCentral {
    private _router: Router;
    // Central Router Constructor
    constructor(router: Router) {
        this._router = router;
        this._middlewares();
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
    private _middlewares(): void {
        // Product Router
        this._router.use('/products', productRouter);
        // User Router
        this._router.use('/users', userRouter);
        // Cart Router
        this._router.use('/users', cartRouter);
        // Order Router
        this._router.use('/users', orderRouter);
        // Error Handler
        this._router.use(ErrorHandler.handleErrors);
    }
}

const centralRouter = new RCentral(Router()).router;

export { centralRouter };
