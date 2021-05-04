"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.centralRouter = void 0;
var express_1 = require("express");
var Cart_router_1 = require("./Cart-router");
var Order_router_1 = require("./Order-router");
var Product_router_1 = require("./Product-router");
var User_router_1 = require("./User-router");
var ErrorHandler_middleware_1 = require("../middlewares/ErrorHandler-middleware");
var RCentral = /** @class */ (function () {
    // Central Router Constructor
    function RCentral(router) {
        this._router = router;
        this._middlewares();
    }
    Object.defineProperty(RCentral.prototype, "router", {
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
    RCentral.prototype._middlewares = function () {
        // Product Router
        this._router.use('/products', Product_router_1.productRouter);
        // User Router
        this._router.use('/users', User_router_1.userRouter);
        // Cart Router
        this._router.use('/users', Cart_router_1.cartRouter);
        // Order Router
        this._router.use('/users', Order_router_1.orderRouter);
        // Error Handler
        this._router.use(ErrorHandler_middleware_1.ErrorHandler.handleErrors);
    };
    return RCentral;
}());
var centralRouter = new RCentral(express_1.Router()).router;
exports.centralRouter = centralRouter;
