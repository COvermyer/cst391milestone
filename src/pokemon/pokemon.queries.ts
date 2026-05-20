export const pokemonQueries = {
    getAllPokemon: 'SELECT * FROM pokemon',
    getPokemonById: 'SELECT * FROM pokemon WHERE id = ?',
    updatePokemon: 'UPDATE pokemon SET name = ?, level = ?, hp = ?, attack = ?, defense = ?, role = ?, image_url = ?, type1 = ?, type2 = ?, held_item = ? WHERE id = ?',
    deletePokemon: 'DELETE FROM pokemon WHERE id = ?'
}