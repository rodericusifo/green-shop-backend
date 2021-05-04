"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
var User_controller_1 = require("../controllers/User-controller");
var RUser = /** @class */ (function () {
    // Central Router Constructor
    function RUser(router) {
        this._router = router;
        this._routers();
    }
    Object.defineProperty(RUser.prototype, "router", {
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
    RUser.prototype._routers = function () {
        // User Register
        this._router.post('/register', User_controller_1.UserController.register);
        // User Login
        this._router.post('/login', User_controller_1.UserController.login);
    };
    return RUser;
}());
var userRouter = new RUser(express_1.Router()).router;
exports.userRouter = userRouter;
