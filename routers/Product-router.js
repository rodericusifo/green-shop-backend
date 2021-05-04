"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
var express_1 = require("express");
var Product_controller_1 = require("../controllers/Product-controller");
var RProduct = /** @class */ (function () {
    // Central Router Constructor
    function RProduct(router) {
        this._router = router;
        this._routers();
    }
    Object.defineProperty(RProduct.prototype, "router", {
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
    RProduct.prototype._routers = function () {
        // Product List
        this._router.get('/list', Product_controller_1.ProductController.readAll);
        // Product Detail
        this.router.get('/:productID/detail', Product_controller_1.ProductController.readOne);
    };
    return RProduct;
}());
var productRouter = new RProduct(express_1.Router()).router;
exports.productRouter = productRouter;
