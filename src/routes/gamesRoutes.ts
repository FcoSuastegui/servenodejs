import { Router } from 'express';
import gamesController from '../controllers/games.Controller';


class GamesRoutes {
    
    public router: Router = Router();

    constructor() {
        this.settings();
    }

    settings(): void {
        this.router.get('/', gamesController.games);
        this.router.get('/:id', gamesController.game);
        this.router.post('/add', gamesController.create);
        this.router.put('/update/:id', gamesController.update);
        this.router.delete('/delete/:id', gamesController.delete);
    }

}

const gamesRoutes = new GamesRoutes();

export default gamesRoutes.router;