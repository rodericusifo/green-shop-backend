"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
var express_1 = require("express");
var Cart_controller_1 = require("../controllers/Cart-controller");
var JWTAuthorization_middleware_1 = require("../middlewares/JWTAuthorization-middleware");
var RCart = /** @class */ (function () {
    // Central Router Constructor
    function RCart(router) {
        this._router = router;
        this._routers();
    }
    Object.defineProperty(RCart.prototype, "router", {
        // Properties Getter
        get: function () {
            return this._router;
        },
        // Properties Setter
        set: function (value) {
            this._router = value;
        },
        enumerable: false,
        configurable: true
    });
    // Other Methods
    RCart.prototype._routers = function () {
        // JWTAuthorization - Access Token Verification
        this._router.use(JWTAuthorization_middleware_1.JWTAuthorization.verifyAccessToken);
        // Cart Create
        this._router.post('/:userID/carts/create', [JWTAuthorization_middleware_1.JWTAuthorization.authorization], Cart_controller_1.CartController.createOne);
        // Cart List
        this._router.get('/:userID/carts/list', [JWTAuthorization_middleware_1.JWTAuthorization.authorization], Cart_controller_1.CartController.readAll);
        // Cart Edit
        this.router.put('/:userID/carts/:cartID/edit', [JWTAuthorization_middleware_1.JWTAuthorization.authorization], Cart_controller_1.CartController.updateOne);
        // Cart Delete
        this._router.delete('/:userID/carts/:cartID/delete', [JWTAuthorization_middleware_1.JWTAuthorization.authorization], Cart_controller_1.CartController.deleteOne);
    };
    return RCart;
}());
var cartRouter = new RCart(express_1.Router()).router;
exports.cartRouter = cartRouter;
