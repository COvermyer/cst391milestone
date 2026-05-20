import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Pokemon } from './pokemon.model';
import { pokemonQueries } from './pokemon.queries';

export const getAllPokemon = async () => {
    return execute<Pokemon[]>(pokemonQueries.getAllPokemon, []);
}

export const getPokemonById = async (id: number) => {
    return execute<Pokemon[]>(pokemonQueries.getPokemonById, [id]);
}

export const updatePokemon = async (pokemon: Pokemon) => {
    return execute<OkPacket>(pokemonQueries.updatePokemon, 
        [pokemon.name, pokemon.level, pokemon.hp, pokemon.attack, pokemon.defense, pokemon.role, 
            pokemon.imageUrl, pokemon.type1, pokemon.type2, pokemon.heldItem, pokemon.id]);
}

export const deletePokemon = async (id: number) => {
    return execute<OkPacket>(pokemonQueries.deletePokemon, [id]);
}