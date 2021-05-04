"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var DB_config_1 = require("./configs/DB-config");
var Central_router_1 = require("./routers/Central-router");
var cors_1 = __importDefault(require("cors"));
// Connect to Database
DB_config_1.DatabaseConfiguration.connectDB();
var App = /** @class */ (function () {
    // App Constructor
    function App(framework) {
        this._framework = framework;
        this._settings();
        this._router();
        this._middlewares();
    }
    Object.defineProperty(App.prototype, "framework", {
        // Properties Getter
        get: function () {
            return this._framework;
        },
        // Properties Setter
        set: function (value) {
            this._framework = value;
        },
        enumerable: false,
        configurable: true
    });
    // Other Methods
    App.prototype._settings = function () {
        // Views Setting
        this._framework.set('views', __dirname + '/views');
        this._framework.set('view engine', 'ejs');
    };
    App.prototype._router = function () {
        // Root Route
        this._framework.get('/', function (_req, res) {
            res.status(200).render('index');
        });
    };
    App.prototype._middlewares = function () {
        // CORS Enable
        this._framework.use(cors_1.default());
        // Express Middleware Built-in for bodyparser
        this._framework.use(express_1.default.json());
        this._framework.use(express_1.default.urlencoded({ extended: true }));
        // Central Router
        this._framework.use(Central_router_1.centralRouter);
    };
    return App;
}());
var app = new App(express_1.default()).framework;
exports.app = app;
