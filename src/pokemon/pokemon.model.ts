export interface Pokemon {
    id: number;
    teamId: number;
    name: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    role: string;
    imageUrl: string;
    type1: string;
    type2: string;
    heldItem: string;
}