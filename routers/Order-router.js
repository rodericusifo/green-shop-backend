"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
var express_1 = require("express");
var Order_controller_1 = require("../controllers/Order-controller");
var JWTAuthorization_middleware_1 = require("../middlewares/JWTAuthorization-middleware");
var ROrder = /** @class */ (function () {
    // Central Router Constructor
    function ROrder(router) {
        this._router = router;
        this._routers();
    }
    Object.defineProperty(ROrder.prototype, "router", {
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
    ROrder.prototype._routers = function () {
        // JWTAuthorization - Access Token Verification
        this._router.use(JWTAuthorization_middleware_1.JWTAuthorization.verifyAccessToken);
        // Order Create
        this._router.post('/:userID/orders/create', [JWTAuthorization_middleware_1.JWTAuthorization.authorization], Order_controller_1.OrderController.createOne);
        // Order List
        this._router.get('/:userID/orders/list', [JWTAuthorization_middleware_1.JWTAuthorization.authorization], Order_controller_1.OrderController.readAll);
    };
    return ROrder;
}());
var orderRouter = new ROrder(express_1.Router()).router;
exports.orderRouter = orderRouter;
