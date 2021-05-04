"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.handleErrors = function (err, _req, res, _next) {
        var statusCode;
        var message;
        var status;
        // Error - Switch case
        switch (err.name) {
            case 'Carts not Found for Order':
                statusCode = 404;
                message = "Carts not Found for Order: Cannot find carts for order, so we can't create an order";
                status = 'Not Found';
                break;
            case 'Carts not Found':
                statusCode = 404;
                message = 'Carts not Found: Cannot find carts';
                status = 'Not Found';
                break;
            case 'Orders not Found':
                statusCode = 404;
                message = 'Orders not Found: Cannot find orders';
                status = 'Not Found';
                break;
            case 'Products not Found':
                statusCode = 404;
                message = 'Products not Found: Cannot find products';
                status = 'Not Found';
                break;
            case 'Product not Found':
                statusCode = 404;
                message = 'Product not Found: Cannot find the product';
                status = 'Not Found';
                break;
            case 'Buyer Name, Buyer Address, and Buyer Phone Number Required':
                statusCode = 422;
                message =
                    'Buyer Name, Buyer Address, and Buyer Phone Number Required: Order buyer name, buyer address, and buyer phone number required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case 'Cart was Deleted':
                statusCode = 404;
                message =
                    'Cart was Deleted: Cart was deleted, so we not able to perform an action to the cart';
                status = 'Not Found';
                break;
            case 'Quantity and Product ID Required':
                statusCode = 422;
                message =
                    'Quantity and Product ID Required: Cart quantity and product ID required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case "Combination doesn't Match":
                statusCode = 401;
                message = "Combination doesn't Match: Password combination with your (username or email) does not match";
                status = 'Unauthorized';
                break;
            case 'Invalid Email':
                statusCode = 422;
                message = 'Invalid Email: Please fill a valid email address';
                status = 'Unprocessable Entity';
                break;
            case 'Email and Password Required':
                statusCode = 422;
                message =
                    'Email and Password Required: Your email and password required to perform this action';
                status = 'Unprocessable Entity';
                break;
            case 'Forbidden Access':
                statusCode = 403;
                message =
                    'Forbidden Access: Sorry, access is restricted, make sure you use your own access token';
                status = 'Forbidden';
                break;
            case 'Access Token not Assosiated':
                statusCode = 401;
                message = "Access Token Not Assosiated: access token not assosiated with any account in this web, please do register again";
                status = 'Unauthorized';
                break;
            case 'Missing Access Token':
                statusCode = 401;
                message = "Missing Access Token: Please input your access token, if you doesn't have access token yet, do login first";
                status = 'Unauthorized';
                break;
            case 'JsonWebTokenError':
                statusCode = 401;
                message =
                    'JsonWebTokenError: Invalid access token, please check the validity of your access token';
                status = 'Unauthorized';
                break;
            case 'MongoError':
                statusCode = 422;
                message = "MongoError: Sorry this data has been used by another user, please enter another unique data";
                status = 'Unprocessable Entity';
                break;
            case 'ValidationError':
                statusCode = 422;
                message =
                    'ValidationError: Make sure you have filled all the required fields with the valid data';
                status = 'Unprocessable Entity';
                break;
            default:
                statusCode = 500;
                message = "Internal Server Error: Sorry, our server is in trouble";
                status = 'Internal Server Error';
                break;
        }
        // Send Response
        res.status(statusCode).json({
            success: false,
            message: message,
            status: status,
            statusCode: statusCode
        });
    };
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
