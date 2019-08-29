import { Router } from 'express';

import { indexController } from '../controllers/index.Controller'

class IndexRoutes {
    
    public router: Router = Router();

    constructor() {
        this.settings();
    }

    settings(): void {
        this.router.get('/', indexController.index );
    }

}

const indexRoutes = new IndexRoutes();

export default indexRoutes.router;