import express = require('express');

export class APIRouter {
    public applicationRouter: express.Router;
    constructor() {
        this.applicationRouter = express.Router();
        this.setGetRoutes();
        this.setPostRoutes();
    }

    private setGetRoutes(): void {
        this.applicationRouter.get('/', (request: express.Request, response: express.Response, next: express.NextFunction) => {
            response.send({
                firstName: 'The',
                lastName: 'Burge'
            });
        });
    }

    private setPostRoutes(): void {
        // All posts accessible from /api/signup etc
        this.applicationRouter.post('/signup', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.send({ success: true });
        });
    }
}
