"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
var Cart_model_1 = require("../models/Cart-model");
var Product_model_1 = require("../models/Product-model");
var User_model_1 = require("../models/User-model");
var CartController = /** @class */ (function () {
    function CartController() {
    }
    CartController.createOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var foundOneProduct, createOneCart, newCart, savedCart, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!req.body.quantity || !req.body.ProductID) {
                            throw { name: 'Quantity and Product ID Required' };
                        }
                        return [4 /*yield*/, Product_model_1.ProductModel.findOne({
                                _id: req.body.ProductID
                            })];
                    case 1:
                        foundOneProduct = _a.sent();
                        createOneCart = {
                            quantity: req.body.quantity,
                            Product: req.body.ProductID,
                            User: req.params.userID
                        };
                        if (req.body.quantity && req.body.ProductID) {
                            createOneCart.amount =
                                req.body.quantity * foundOneProduct.price;
                        }
                        newCart = new Cart_model_1.CartModel(createOneCart);
                        return [4 /*yield*/, newCart.save()];
                    case 2:
                        savedCart = _a.sent();
                        return [4 /*yield*/, User_model_1.UserModel.findOneAndUpdate({ _id: savedCart.User }, { $push: { Carts: savedCart._id } }, { new: true })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, Product_model_1.ProductModel.findOneAndUpdate({ _id: savedCart.Product }, { $push: { Carts: savedCart._id } }, { new: true })];
                    case 4:
                        _a.sent();
                        res.status(201).json({
                            success: true,
                            message: 'Cart Created',
                            status: 'Created',
                            statusCode: 201
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        next(err_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CartController.readAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var foundAllCart, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Cart_model_1.CartModel.find({ User: req.params.userID }, '_id quantity amount Product').populate('Product', '_id name price description imageURL')];
                    case 1:
                        foundAllCart = _a.sent();
                        if (foundAllCart.length < 1) {
                            throw { name: 'Carts not Found' };
                        }
                        res.status(200).json({
                            success: true,
                            message: 'All Carts found',
                            data: { Carts: foundAllCart },
                            status: 'OK',
                            statusCode: 200
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        next(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CartController.updateOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var foundOneCart, foundOneProduct, updateOneCart, key, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, Cart_model_1.CartModel.findOne({
                                _id: req.params.cartID
                            })];
                    case 1:
                        foundOneCart = _a.sent();
                        if (!foundOneCart) {
                            throw { name: 'Cart was Deleted' };
                        }
                        return [4 /*yield*/, Product_model_1.ProductModel.findOne({
                                _id: foundOneCart.Product
                            })];
                    case 2:
                        foundOneProduct = _a.sent();
                        updateOneCart = {
                            quantity: req.body.quantity
                        };
                        if (req.body.quantity) {
                            updateOneCart.amount =
                                req.body.quantity * foundOneProduct.price;
                        }
                        for (key in updateOneCart) {
                            if (!updateOneCart[key]) {
                                delete updateOneCart[key];
                            }
                        }
                        return [4 /*yield*/, Cart_model_1.CartModel.findOneAndUpdate({ _id: req.params.cartID, User: req.params.userID }, updateOneCart, { new: true })];
                    case 3:
                        _a.sent();
                        res.status(200).json({
                            success: true,
                            message: 'Edit cart success',
                            status: 'OK',
                            statusCode: 200
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        next(err_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CartController.deleteOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedOneCart, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, Cart_model_1.CartModel.findOneAndDelete({
                                _id: req.params.cartID,
                                User: req.params.userID
                            })];
                    case 1:
                        deletedOneCart = _a.sent();
                        if (!deletedOneCart) {
                            throw { name: 'Cart was Deleted' };
                        }
                        return [4 /*yield*/, User_model_1.UserModel.findOneAndUpdate({ _id: deletedOneCart.User }, { $pull: { Carts: deletedOneCart._id } }, { new: true })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Product_model_1.ProductModel.findOneAndUpdate({ _id: deletedOneCart.Product }, { $pull: { Carts: deletedOneCart._id } }, { new: true })];
                    case 3:
                        _a.sent();
                        res.status(200).json({
                            success: true,
                            message: 'Delete cart success',
                            status: 'OK',
                            statusCode: 200
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        next(err_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return CartController;
}());
exports.CartController = CartController;
