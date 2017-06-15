'use strict';
import express = require('express');
import * as path from 'path';

export class IndexRouter {
    public indexRouter: express.Router;
    constructor() {
        this.indexRouter = express.Router();
    }
    public getIndex(req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.send('Hello from Express index!');
    }
}
