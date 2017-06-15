'use strict';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cors from 'cors';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import { log } from './logging/config';
import { IndexRouter } from './routes/indexRoute';
import { APIRouter } from './routes/apiRoutes';

class Server {

    public app: express.Application;
    private port: Number = 3000;
    private cookieSecret: string = 'ServerCookieString';
    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        log.info('Initiating Node/Express Server');
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        log.info('Setting config / middleware for node.');
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
        this.app.use(cors());
        this.app.use(cookieParser(this.cookieSecret));
        this.app.use(methodOverride());
        // catch 404 and forward to error handler
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            log.warn('Unfound page');
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }

    private routes(): void {
        const apiRouter: APIRouter = new APIRouter();
        const indexRouter: any = new IndexRouter();
        this.app.use('/api', apiRouter.applicationRouter);
        this.app.get('*', indexRouter.getIndex);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            log.info(`** Server Listening on port: ${this.port}  **`);
        });
    }
}
const server: Server = Server.bootstrap();
export default server.listen();
