"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App");
var Server = /** @class */ (function () {
    // Server Constructor
    function Server(app, port) {
        this._app = app;
        this._port = port;
        this._listener();
    }
    Object.defineProperty(Server.prototype, "app", {
        // Properties Getter
        get: function () {
            return this._app;
        },
        // Properties Setter
        set: function (value) {
            this._app = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Server.prototype, "port", {
        get: function () {
            return this._port;
        },
        set: function (value) {
            this._port = value;
        },
        enumerable: false,
        configurable: true
    });
    // Other Methods
    Server.prototype._listener = function () {
        var _this = this;
        this._app.listen(this._port, function () {
            console.log("listening on http://localhost:" + _this._port);
        });
    };
    return Server;
}());
new Server(App_1.app, Number(process.env.PORT));
