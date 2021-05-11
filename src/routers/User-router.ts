import { Router } from 'express';
import { UserController } from '../controllers/User-controller';

class RUser {
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
        // User Register
        this._router.post('/register', UserController.register);
        // User Login
        this._router.post('/login', UserController.login);
    }
}

const userRouter = new RUser(Router()).router;

export { userRouter };
