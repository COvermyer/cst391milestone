import { Router } from 'express';
import * as pokemonController from './pokemon.controller';

const router = Router();

router
    .route('/pokemon')
    .get(pokemonController.getAllPokemon);

router
    .route('/pokemon')
    .put(pokemonController.updatePokemon);    

router
    .route('/pokemon/:id')
    .get(pokemonController.getPokemonById);

router
    .route('/pokemon/:id')
    .delete(pokemonController.deletePokemon);

export default router;