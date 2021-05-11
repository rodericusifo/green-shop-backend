import { Router } from 'express';
import { CartController } from '../controllers/Cart-controller';
import { JWTAuthorization } from '../middlewares/JWTAuthorization-middleware';

class RCart {
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
        // Cart Create
        this._router.post(
            '/:userID/carts/create',
            [JWTAuthorization.authorization],
            CartController.createOne
        );
        // Cart List
        this._router.get(
            '/:userID/carts/list',
            [JWTAuthorization.authorization],
            CartController.readAll
        );
        // Cart Edit
        this.router.put(
            '/:userID/carts/:cartID/edit',
            [JWTAuthorization.authorization],
            CartController.updateOne
        );
        // Cart Delete
        this._router.delete(
            '/:userID/carts/:cartID/delete',
            [JWTAuthorization.authorization],
            CartController.deleteOne
        );
    }
}

const cartRouter = new RCart(Router()).router;

export { cartRouter };
