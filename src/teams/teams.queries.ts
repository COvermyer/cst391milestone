import { getTeamById } from "./teams.dao";

export const teamQueries = {
    getAllTeams: 'SELECT * FROM teams',
    getTeamById: 'SELECT * FROM teams WHERE id = ?',
    createTeam: 'INSERT INTO teams (name, trainer_name, description) VALUES (?, ?, ?)',
    updateTeam: 'UPDATE teams SET name = ?, trainer_name = ?, description = ? WHERE id = ?',
    deleteTeam: 'DELETE FROM teams WHERE id = ?',
    
    
    
    
    addPokemonToTeam: 'INSERT INTO pokemon (team_id, name, level, hp, attack, defense, role, image_url, type1, type2, held_item) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    removePokemonFromTeam: 'DELETE FROM pokemon WHERE team_id = ? AND id = ?',
    getPokemonByTeamId: 'SELECT * FROM pokemon WHERE team_id = ?'
};