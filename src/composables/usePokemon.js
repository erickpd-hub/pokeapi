import { ref, computed } from 'vue';
import { pokeService } from '../services/pokeService';

export function usePokemon() {
    const pokemonList = ref([]);
    const selectedPokemon = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const totalCount = ref(0);
    const currentPage = ref(1);
    const itemsPerPage = 20;

    const fetchPokemonList = async (page = 1) => {
        loading.value = true;
        error.value = null;
        currentPage.value = page;
        const offset = (page - 1) * itemsPerPage;

        try {
            const data = await pokeService.getPokemonList(itemsPerPage, offset);
            pokemonList.value = data.results;
            totalCount.value = data.count;
        } catch (err) {
            error.value = 'Failed to load Pokemon list. Please try again.';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const searchPokemon = async (query) => {
        if (!query || query.trim() === '') {
            return fetchPokemonList(1);
        }

        loading.value = true;
        error.value = null;
        pokemonList.value = [];

        try {
            const details = await pokeService.getPokemonDetails(query.trim().toLowerCase());
            pokemonList.value = [details];
            totalCount.value = 1;
        } catch (err) {
            if (err.response && err.response.status === 404) {
                error.value = `No Pokemon found with name "${query}"`;
            } else {
                error.value = 'An error occurred while searching. Please try again.';
            }
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage));

    return {
        pokemonList,
        selectedPokemon,
        loading,
        error,
        totalCount,
        currentPage,
        totalPages,
        fetchPokemonList,
        searchPokemon
    };
}
