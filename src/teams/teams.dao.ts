import { OkPacket } from "mysql";
import { execute } from "../services/mysql.connector";
import { Team } from "./teams.model";
import { Pokemon } from "../pokemon/pokemon.model";
import { teamQueries } from "./teams.queries";

export const getAllTeams = async () => {
    return execute<Team[]>(teamQueries.getAllTeams, []);
};

export const getTeamById = async (id: number) => {
    return execute<Team[]>(teamQueries.getTeamById, [id]);
};

export const createTeam = async (team: Team) => {
    return execute<OkPacket>(teamQueries.createTeam, [team.name, team.trainerName, team.description]);
};

export const updateTeam = async (team: Team) => {
    return execute<OkPacket>(teamQueries.updateTeam, [team.name, team.trainerName, team.description, team.id]);
};

export const deleteTeam = async (id: number) => {
    return execute<OkPacket>(teamQueries.deleteTeam, [id]);
};

export const addPokemonToTeam = async (pokemon: Pokemon, teamId: number) => {
    return execute<OkPacket>(teamQueries.addPokemonToTeam, [teamId, pokemon.name, pokemon.level, pokemon.hp, pokemon.attack, pokemon.defense, pokemon.role, pokemon.imageUrl, pokemon.type1, pokemon.type2, pokemon.heldItem]);
};

export const removePokemonFromTeam = async (pokemonId: number, teamId: number) => {
    return execute<OkPacket>(teamQueries.removePokemonFromTeam, [teamId, pokemonId]);
};

export const getPokemonByTeamId = async (teamId: number) => {
    return execute<Pokemon[]>(teamQueries.getPokemonByTeamId, [teamId]);
};