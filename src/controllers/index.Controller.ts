import {Request, Response } from 'express';

class IndexController {

    public index( req:Request, res:Response ){
        res.json({
            text: `API is api/${process.env.APP_NAME}`,
        })
    }
}

export const indexController = new IndexController();

