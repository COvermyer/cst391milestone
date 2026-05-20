import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import logger from './middleware/logger.middleware';
import cors from 'cors';
import pokemonRouter from './pokemon/pokemon.router';
import teamRouter from './teams/teams.router';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use('/', [pokemonRouter, teamRouter]);

app.get('/', (req: Request, res: Response) => {
    res.send('Milestone Project API');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});

if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}