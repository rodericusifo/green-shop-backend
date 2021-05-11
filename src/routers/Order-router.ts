import { Router } from 'express';
import { OrderController } from '../controllers/Order-controller';
import { JWTAuthorization } from '../middlewares/JWTAuthorization-middleware';

class ROrder {
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
        // JWTAuthorization - Access Token Verification
        this._router.use(JWTAuthorization.verifyAccessToken);
        // Order Create
        this._router.post(
            '/:userID/orders/create',
            [JWTAuthorization.authorization],
            OrderController.createOne
        );
        // Order List
        this._router.get(
            '/:userID/orders/list',
            [JWTAuthorization.authorization],
            OrderController.readAll
        );
    }
}

const orderRouter = new ROrder(Router()).router;

export { orderRouter };
