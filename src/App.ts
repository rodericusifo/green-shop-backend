import express, { Application, Response } from 'express';
import { DatabaseConfiguration } from './configs/DB-config';
import { ICustomRequest } from './interfaces/CustomRequest-interface';
import { centralRouter } from './routers/Central-router';
import cors from 'cors';

// Connect to Database
DatabaseConfiguration.connectDB();

class App {
    private _framework: Application;
    // App Constructor
    constructor(framework: Application) {
        this._framework = framework;
        this._settings();
        this._router();
        this._middlewares();
    }
    // Properties Getter
    public get framework(): Application {
        return this._framework;
    }
    // Properties Setter
    public set framework(value: Application) {
        this._framework = value;
    }
    // Other Methods
    private _settings(): void {
        // Views Setting
        this._framework.set('views', __dirname + '/views');
        this._framework.set('view engine', 'ejs');
    }
    private _router(): void {
        // Root Route
        this._framework.get('/', (_req: ICustomRequest, res: Response) => {
            res.status(200).render('index');
        });
    }
    private _middlewares(): void {
        // CORS Enable
        this._framework.use(cors());
        // Express Middleware Built-in for bodyparser
        this._framework.use(express.json());
        this._framework.use(express.urlencoded({ extended: true }));
        // Central Router
        this._framework.use(centralRouter);
    }
}

const app = new App(express()).framework;

export { app };
