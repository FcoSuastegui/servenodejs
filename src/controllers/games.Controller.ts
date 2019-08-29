import {Request, Response } from 'express';
import pool from '../database';

class GamesController {
    
    public async games( req:Request, res:Response ): Promise<any> {
       const games = await pool.query('SELECT * FROM games');
       if( games.length > 0 ){
           return res.json({
               status: true,
               games: games
            });
        }

        res.status(404).json({
            status: false,
            message: 'No hay juegos'
        })
        
        
    }
    
    public async game( req:Request, res:Response ): Promise<any> {
        const { id } = req.params;
        const game = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if( game.length > 0 ) {
            return res.json({
                status: true,
                game: game[0]
            });
        }

        res.status(404).json({
            status: false,
            message: 'No existe el juego'
        })
        
    }

    public async create( req: Request, res: Response ): Promise<void> {
        await pool.query('INSERT INTO games SET ?', [req.body]);
        res.json({
            message: 'Games add',
            status: true
        });
    }

    public async delete( req: Request, res: Response ): Promise<void> {
        const { id } = req.params;
        const game = await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({
            message: 'Se ha eliminado correctamente'
        });
    }

    public async update( req: Request, res: Response ): Promise<void> {
        const { id } = req.params;
        const body = req.body;
        await pool.query('UPDATE games SET ? WHERE id = ?', [body, id]);
        res.json({
            message: 'Se ha actulizado correctamente'
        });
    }
}

const gamesController = new GamesController();

export default gamesController;

