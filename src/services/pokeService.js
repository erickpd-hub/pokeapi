import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const pokeService = {
  /**
   * Fetches a paginated list of Pokemon.
   * @param {number} limit - Number of Pokemon per page.
   * @param {number} offset - Number of Pokemon to skip.
   */
  async getPokemonList(limit = 20, offset = 0) {
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemon`, {
        params: { limit, offset }
      });
      
      // The basic list only returns names and detail URLs.
      // We need to fetch details for each to get images and types.
      const detailedListPromises = response.data.results.map(pokemon => 
        this.getPokemonDetails(pokemon.name)
      );
      
      const detailedResults = await Promise.all(detailedListPromises);
      
      return {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
        results: detailedResults
      };
    } catch (error) {
      console.error('Error fetching pokemon list:', error);
      throw error;
    }
  },

  /**
   * Fetches full details for a specific Pokemon by name or ID.
   * @param {string|number} identifier - Pokemon name or ID.
   */
  async getPokemonDetails(identifier) {
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemon/${identifier.toString().toLowerCase()}`);
      return {
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.other['official-artwork'].front_default || response.data.sprites.front_default,
        types: response.data.types.map(t => t.type.name),
        height: response.data.height / 10, // In meters
        weight: response.data.weight / 10, // In kg
        abilities: response.data.abilities.map(a => a.ability.name),
        stats: response.data.stats.map(s => ({
          name: s.stat.name,
          value: s.base_stat
        }))
      };
    } catch (error) {
      console.error(`Error fetching details for ${identifier}:`, error);
      throw error;
    }
  }
};
