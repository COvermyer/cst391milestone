import { Router } from 'express';
import * as teamsController from './teams.controller';

const router = Router();

router
    .route('/teams')
    .get(teamsController.getAllTeams);

router
    .route('/teams')
    .post(teamsController.createTeam)

router
    .route('/teams/:id')
    .put(teamsController.updateTeam);
      
router
    .route('/teams/:id')
    .get(teamsController.getTeamById);

router
    .route('/teams/:id')
    .delete(teamsController.deleteTeam);

router
    .route('/teams/:teamId/pokemon')
    .get(teamsController.getPokemonByTeamId);

router
    .route('/teams/:teamId/pokemon')
    .post(teamsController.addPokemonToTeam);

router
    .route('/teams/:teamId/pokemon/:pokemonId')
    .delete(teamsController.removePokemonFromTeam); // Depreciate this endpoint?

router
    .route('/teams/search')
    .get((req, res) => { res.send("Search function TBD"); }) // Placeholder for future routes

export default router;