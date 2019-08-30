import {Request, Response } from 'express';
import pool from '../database';

class GamesController {
    
    public async games( req:Request, res:Response ): Promise<any> {
       const games = await pool.query('call games.getGames()');
       if( games.length > 0 ){
           return res.json({
               status: true,
               games: games[0]
            });
        }

        res.status(404).json({
            status: false,
            message: 'No hay juegos'
        })
        
        
    }
    
    public async game( req:Request, res:Response ): Promise<any> {
        const { id } = req.params;
        const game = await pool.query('call games.getGame(?)', [id]);
        if( game.length > 0 ) {
            return res.json({
                status: true,
                game: game[0][0]
            });
        }

        res.status(404).json({
            status: false,
            message: 'No existe el juego'
        })
        
    }

    public async create( req: Request, res: Response ): Promise<void> {
        const game = req.body;
        await pool.query('call addGame(?,?,?) ', [game.title, game.description, game.image]);
        res.json({
            message: 'Games add',
            status: true
        });
    }

    public async delete( req: Request, res: Response ): Promise<void> {
        const { id } = req.params;
        const game = await pool.query('call deleteGame(?)', [id]);
        res.json({
            message: 'Se ha eliminado correctamente'
        });
    }

    public async update( req: Request, res: Response ): Promise<void> {
        const { id } = req.params;
        const body = req.body;
        await pool.query('call updateGame(?,?,?,?)', [id, body.title, body.description, body.image]);
        res.json({
            message: 'Se ha actulizado correctamente'
        });
    }
}

const gamesController = new GamesController();

export default gamesController;

