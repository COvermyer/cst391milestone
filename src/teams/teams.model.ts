import { Pokemon } from "../pokemon/pokemon.model";

export interface Team {
    id: number;
    name: string;
    trainerName: string;
    description: string;
    createdAt: Date;
    pokemon: Pokemon[];
}