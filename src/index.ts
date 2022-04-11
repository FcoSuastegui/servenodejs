import express, { Application } from 'express';
import morgan from 'morgan'
import cors from 'cors';
import dotenv from 'dotenv'



import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.settings();
        this.routes();
    }

    settings(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false }));
    }

    routes(): void {
        this.app.use(indexRoutes);
        this.app.use('/api/games', gamesRoutes);
    }

    middlewares(): void {
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }

    start(): void {
        this.app.listen(this.app.get('port'), ()=> {
            console.log('SERVER ON PORT:', this.app.get('port'));
        });
    }


}


dotenv.config()
const server = new Server();
server.start();
