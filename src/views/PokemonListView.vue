<script setup>
import { onMounted } from 'vue';
import { usePokemon } from '../composables/usePokemon';
import PokemonCard from '../components/PokemonCard.vue';
import SearchBar from '../components/SearchBar.vue';
import { ChevronLeft, ChevronRight, AlertCircle, RefreshCw, Smartphone } from 'lucide-vue-next';

const { 
  pokemonList, 
  loading, 
  error, 
  currentPage, 
  totalPages, 
  fetchPokemonList, 
  searchPokemon 
} = usePokemon();

onMounted(() => {
  fetchPokemonList();
});

const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    fetchPokemonList(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
</script>

<template>
  <div class="pokedex-view">
    <SearchBar @search="searchPokemon" />

    <!-- Loading State -->
    <div v-if="loading" class="state-container loading-state">
      <div class="spinner"></div>
      <p>Cargando datos de la base de datos de Pokémon...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="state-container error-state">
      <AlertCircle :size="48" color="var(--pokedex-red)" />
      <h3>¡Uy! Algo salió mal</h3>
      <p>{{ error }}</p>
      <button @click="fetchPokemonList(1)" class="retry-btn">
        <RefreshCw :size="16" /> Reintentar
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="pokemonList.length === 0" class="state-container empty-state">
      <Smartphone :size="48" />
      <h3>No se encontraron resultados</h3>
      <p>Intenta buscar con otro nombre o ID.</p>
      <button @click="fetchPokemonList(1)" class="retry-btn">Ver todos</button>
    </div>

    <!-- Pokemon Grid -->
    <div v-else class="content-fade-in">
      <div class="pokemon-grid">
        <PokemonCard 
          v-for="pokemon in pokemonList" 
          :key="pokemon.id" 
          :pokemon="pokemon" 
        />
      </div>

      <!-- Pagination (Only show if not a single result search) -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          :disabled="currentPage === 1" 
          @click="handlePageChange(currentPage - 1)"
          class="page-btn"
        >
          <ChevronLeft />
        </button>
        
        <span class="page-info">
          PÁGINA {{ currentPage }} DE {{ totalPages }}
        </span>
        
        <button 
          :disabled="currentPage === totalPages" 
          @click="handlePageChange(currentPage + 1)"
          class="page-btn"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokedex-view {
  display: flex;
  flex-direction: column;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  background: var(--pokedex-white);
  border: 6px solid var(--pokedex-black);
  box-shadow: 10px 10px 0px var(--pokedex-black);
  border-radius: 0;
  min-height: 400px;
  margin-bottom: 40px;
}

.state-container h3 {
  margin: 20px 0 15px;
  font-weight: 900;
  font-size: 2rem;
  letter-spacing: -1px;
}

.state-container p {
  color: var(--text-muted);
  font-size: 1.1rem;
  font-weight: 700;
}

.spinner {
  width: 70px;
  height: 70px;
  border: 8px solid var(--pokedex-black);
  border-top-color: var(--pokedex-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 25px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: 30px;
  padding: 15px 35px;
  background-color: var(--pokedex-yellow);
  color: var(--pokedex-black);
  border: 4px solid var(--pokedex-black);
  box-shadow: 6px 6px 0px var(--pokedex-black);
  font-family: 'Bungee', cursive;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.1s;
}

.retry-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px var(--pokedex-black);
}

.retry-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px var(--pokedex-black);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 40px;
  padding: 30px;
  background: var(--pokedex-black);
  border: 4px solid var(--pokedex-black);
}

.page-btn {
  background-color: var(--pokedex-white);
  color: var(--pokedex-black);
  border: 4px solid var(--pokedex-black);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 4px 4px 0px var(--pokedex-red);
  transition: all 0.1s;
}

.page-btn:hover:not(:disabled) {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--pokedex-red);
}

.page-btn:active:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 0px 0px 0px var(--pokedex-red);
}

.page-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
  box-shadow: none;
}

.page-info {
  font-family: 'Bungee', cursive;
  font-weight: 900;
  font-size: 1.2rem;
  color: var(--pokedex-white);
  letter-spacing: 2px;
}

.content-fade-in {
  animation: slide-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@media (max-width: 600px) {
  .pokemon-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .page-info {
    font-size: 0.9rem;
  }
}
</style>
