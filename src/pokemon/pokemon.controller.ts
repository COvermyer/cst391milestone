import { Request, RequestHandler, Response } from 'express';
import { Pokemon } from './pokemon.model';
import * as pokemonDao from './pokemon.dao';
import { OkPacket } from 'mysql';
import { parse } from 'dotenv';

// getAllPokemon controller function to get all pokemon or a pokemon by id if id query parameter is provided
export const getAllPokemon: RequestHandler = async (req: Request, res: Response) => {
    try {
        let pokemon;
        let pokemonId = parseInt(req.query.id as string); // try to cast query parameter to number, if it fails it will be NaN

        if (Number.isNaN(pokemonId)) {
            // If pokemonId is NaN, it means no valid id query parameter was provided, so we fetch all pokemon
            pokemon = await pokemonDao.getAllPokemon();
        } else {
            // If pokemonId is a valid number, we fetch the pokemon with that id
            pokemon = await pokemonDao.getPokemonById(pokemonId);
        }

        // send 200 response with the fetched pokemon
        res.status(200).json(pokemon);
        console.log("[pokemon.controller][getAllPokemon] Pokemon fetched successfully");

    } catch (error) {
        console.error("[pokemon.controller][getAllPokemon] Error fetching Pokemon:", error);
        res.status(500).json({ message: 'Error fetching Pokemon', error });
    }
};

export const getPokemonById: RequestHandler = async (req: Request, res: Response) => {
    try {
        let pokemonId = parseInt(req.params.id as string);
        if (Number.isNaN(pokemonId)) {
            res.status(400).json({ message: 'Invalid Pokemon ID' });
            return;
        }
        const pokemon = await pokemonDao.getPokemonById(pokemonId);
        if (!pokemon || pokemon.length === 0) {
            res.status(404).json({ message: 'Pokemon not found' });
            return;
        }
        
        res.status(200).json(pokemon);
        console.log("[pokemon.controller][getPokemonById] Pokemon fetched successfully");
    } catch (error) {
        console.error("[pokemon.controller][getPokemonById] Error fetching Pokemon:", error);
        res.status(500).json({ message: 'Error fetching Pokemon', error });
    }
};

// updatePokemon controller function to update a pokemon by id
export const updatePokemon: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await pokemonDao.updatePokemon(req.body);
        if (okPacket.affectedRows > 0) {
            res.status(200).json({ message: 'Pokemon updated successfully' });
            console.log("[pokemon.controller][updatePokemon] Pokemon updated successfully");
        } else {
            res.status(404).json({ message: 'Pokemon not found' });
            console.log("[pokemon.controller][updatePokemon] Pokemon not found");
        }
    } catch (error) {
        console.error("[pokemon.controller][updatePokemon] Error updating Pokemon:", error);
        res.status(500).json({ message: 'Error updating Pokemon', error });
    }
};

/// deletePokemon controller function to delete a pokemon by id
export const deletePokemon: RequestHandler = async (req: Request, res: Response) => {
    try {
        let pokemonId = parseInt(req.params.id as string);
        
        // validate pokemonId is a number
        if (Number.isNaN(pokemonId)) {
            // send 400 response if pokemonId is not a number for invalid input
            res.status(400).json({ message: 'Invalid Pokemon ID' });
            console.log("[pokemon.controller][deletePokemon] Invalid Pokemon ID");
            return;
        }

        const okPacket: OkPacket = await pokemonDao.deletePokemon(pokemonId);

        if (okPacket.affectedRows > 0) {
            // if at least one row was affected, delete was successful, send 200 response
            res.status(200).json({ message: 'Pokemon deleted successfully' });
            console.log("[pokemon.controller][deletePokemon] Pokemon deleted successfully");
        } else {
            // if no rows were affected, pokemon was not found, send 404 response
            res.status(404).json({ message: 'Pokemon not found' });
            console.log("[pokemon.controller][deletePokemon] Pokemon not found");
        }
    } catch (error) {
        // Internal server error, send 500 response
        console.error("[pokemon.controller][deletePokemon] Error deleting Pokemon:", error);
        res.status(500).json({ message: 'Error deleting Pokemon', error });
    }
};