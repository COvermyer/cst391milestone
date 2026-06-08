import { Request, RequestHandler, Response } from "express";
// import { Team } from "./teams.model";
import { Pokemon } from "../pokemon/pokemon.model";
import * as teamsDao from "./teams.dao";
// import * as pokemonDao from "../pokemon/pokemon.dao";
import { OkPacket } from "mysql";

export const getAllTeams: RequestHandler = async (req: Request, res: Response) => {
    try {
        let teams;
        let teamId = parseInt(req.query.teamId as string);

        if (Number.isNaN(teamId)) {
            teams = await teamsDao.getAllTeams();
        } else {
            teams = await teamsDao.getTeamById(Number(teamId));
        }

        if (!teams || teams.length === 0) {
            res.status(404).json({ error: 'No teams found' });
            return;
        }

        console.log("[teams.controller][getAllTeams] Retrieved teams successfully");
        res.status(200).json(teams);
    } catch (error) {
        console.error("[teams.controller][getAllTeams] Error fetching teams:", error);
        res.status(500).json({ error: 'Failed to retrieve teams' });
    }
};

export const getTeamById: RequestHandler = async (req: Request, res: Response) => {
    try {
        let teamId = parseInt(req.params.id as string);
        if (Number.isNaN(teamId)) {
            res.status(400).json({ error: 'Invalid team ID' });
            return;
        }
        const team = await teamsDao.getTeamById(teamId);
        if (!team || team.length === 0) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }

        console.log("[teams.controller][getTeamById] Retrieved team by ID successfully:", teamId);
        res.status(200).json(team[0]);
    } catch (error) {
        console.error("[teams.controller][getTeamById] Error fetching team by ID:", error);
        res.status(500).json({ error: 'Failed to retrieve team' });
    }
};

export const createTeam: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await teamsDao.createTeam(req.body);
        console.log("[teams.controller][createTeam] Team created successfully with ID:", okPacket.insertId);
        res.status(201).json({ message: 'Team created successfully', teamId: okPacket.insertId });
    } catch (error) {
        console.error("[teams.controller][createTeam] Error creating team:", error);
        res.status(500).json({ error: 'Failed to create team' });
    }
};

export const updateTeam: RequestHandler = async (req: Request, res: Response) => {
    try {
        let teamId = parseInt(req.params.id as string);
        if (Number.isNaN(teamId)) {
            res.status(400).json({ error: 'Invalid team ID' });
            return;
        }

        const okPacket: OkPacket = await teamsDao.updateTeam(teamId, req.body);
        console.log("[teams.controller][updateTeam] Team updated successfully with ID:", teamId);
        res.status(200).json({ message: 'Team updated successfully', teamId: teamId });
    } catch (error) {
        console.error("[teams.controller][updateTeam] Error updating team:", error);
        res.status(500).json({ error: 'Failed to update team' });
    }
};

export const deleteTeam: RequestHandler = async (req: Request, res: Response) => {
    try {
        let teamId = parseInt(req.params.id as string);
        if (Number.isNaN(teamId)) {
            res.status(400).json({ error: 'Invalid team ID' });
            return;
        }

        const okPacket: OkPacket = await teamsDao.deleteTeam(teamId);
        console.log("[teams.controller][deleteTeam] Team deleted successfully with ID:", teamId);
        res.status(200).json({ message: 'Team deleted successfully', teamId: teamId });

    } catch (error) {
        console.error("[teams.controller][deleteTeam] Error deleting team:", error);
        res.status(500).json({ error: 'Failed to delete team' });
    }
};

export const addPokemonToTeam: RequestHandler = async (req: Request, res: Response) => {
    try {
        let teamId = parseInt(req.params.teamId as string);
        if (Number.isNaN(teamId)) {
            res.status(400).json({ error: 'Invalid team ID' });
            return;
        }

        const pokemon: Pokemon = req.body;
        const okPacket: OkPacket = await teamsDao.addPokemonToTeam(pokemon, teamId);
        console.log("[teams.controller][addPokemonToTeam] Pokemon added successfully to team ID:", teamId);
        res.status(201).json({ message: 'Pokemon added to team successfully', pokemonId: okPacket.insertId });
    
    } catch (error) {
        console.error("[teams.controller][addPokemonToTeam] Error adding Pokemon to team:", error);
        res.status(500).json({ error: 'Failed to add Pokemon to team' });
    }
};

export const removePokemonFromTeam: RequestHandler = async (req: Request, res: Response) => {
    try {
        let teamId = parseInt(req.params.teamId as string);
        let pokemonId = parseInt(req.params.pokemonId as string);
        if (Number.isNaN(teamId) || Number.isNaN(pokemonId)) {
            res.status(400).json({ error: 'Invalid team ID or Pokemon ID' });
            return;
        }

        const okPacket: OkPacket = await teamsDao.removePokemonFromTeam(pokemonId, teamId);
        console.log("[teams.controller][removePokemonFromTeam] Pokemon removed successfully from team ID:", teamId);
        res.status(200).json({ message: 'Pokemon removed from team successfully', pokemonId: pokemonId });
    } catch (error) {
        console.error("[teams.controller][removePokemonFromTeam] Error removing Pokemon from team:", error);
        res.status(500).json({ error: 'Failed to remove Pokemon from team' });
    }
};

export const getPokemonByTeamId: RequestHandler = async (req: Request, res: Response) => {
    try {
        let teamId = parseInt(req.params.teamId as string);
        if (Number.isNaN(teamId)) {
            res.status(400).json({ error: 'Invalid team ID' });
            return;
        }

        const pokemon: Pokemon[] = await teamsDao.getPokemonByTeamId(teamId);
        console.log("[teams.controller][getPokemonByTeamId] Retrieved Pokemon for team ID successfully:", teamId);
        res.status(200).json(pokemon);
    } catch (error) {
        console.error("[teams.controller][getPokemonByTeamId] Error fetching Pokemon for team:", error);
        res.status(500).json({ error: 'Failed to retrieve Pokemon for team' });
    }
};
