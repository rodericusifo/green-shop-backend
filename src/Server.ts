import { Application } from 'express';
import { app } from './App';

class Server {
    private _app: Application;
    private _port: number;
    // Server Constructor
    constructor(app: Application, port: number) {
        this._app = app;
        this._port = port;
        this._listener();
    }
    // Properties Getter
    public get app(): Application {
        return this._app;
    }
    public get port(): number {
        return this._port;
    }
    // Properties Setter
    public set app(value: Application) {
        this._app = value;
    }
    public set port(value: number) {
        this._port = value;
    }
    // Other Methods
    private _listener() {
        this._app.listen(this._port, () => {
            console.log(`listening on http://localhost:${this._port}`);
        });
    }
}

new Server(app, Number(process.env.PORT!));
