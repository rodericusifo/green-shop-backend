"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfiguration = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var DatabaseConfiguration = /** @class */ (function () {
    function DatabaseConfiguration() {
    }
    DatabaseConfiguration.connectDB = function () {
        var pathURI = process.env.DB_HOST;
        var connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        };
        // do connection
        mongoose_1.default.connect(pathURI, connectionOptions);
        // failed to connect
        mongoose_1.default.connection.on('error', console.error.bind(console, 'connection error:'));
        // successfully connect
        mongoose_1.default.connection.once('open', function () {
            console.log('Successfully connected to database');
        });
    };
    return DatabaseConfiguration;
}());
exports.DatabaseConfiguration = DatabaseConfiguration;
