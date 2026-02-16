<script setup>
import { ref } from 'vue';
import { Search } from 'lucide-vue-next';

const emit = defineEmits(['search']);
const searchQuery = ref('');

const handleSearch = () => {
  emit('search', searchQuery.value);
};

const clearSearch = () => {
  searchQuery.value = '';
  emit('search', '');
};
</script>

<template>
  <div class="search-container">
    <div class="search-input-wrapper">
      <Search class="search-icon" :size="20" />
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Nombre o ID del Pokémon..." 
        @keyup.enter="handleSearch"
      />
      <button v-if="searchQuery" @click="clearSearch" class="clear-btn">&times;</button>
    </div>
    <button @click="handleSearch" class="search-submit">BUSCAR</button>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  gap: 15px;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  border: 4px solid var(--pokedex-black);
  background: var(--pokedex-white);
  box-shadow: 6px 6px 0px var(--pokedex-black);
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.search-input-wrapper:focus-within {
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px 0px var(--pokedex-black);
}

.search-icon {
  position: absolute;
  left: 15px;
  color: var(--pokedex-black);
}

input {
  width: 100%;
  padding: 15px 15px 15px 50px;
  border: none;
  background: transparent;
  font-size: 1.2rem;
  font-weight: 800;
  outline: none;
  font-family: inherit;
  color: var(--pokedex-black);
}

input::placeholder {
  color: var(--text-muted);
  font-weight: 400;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.clear-btn {
  position: absolute;
  right: 15px;
  background: var(--pokedex-black);
  border: none;
  font-size: 1.2rem;
  color: var(--pokedex-white);
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-submit {
  background-color: var(--pokedex-blue);
  color: var(--pokedex-black);
  border: 4px solid var(--pokedex-black);
  padding: 0 30px;
  font-family: 'Bungee', cursive;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 6px 6px 0px var(--pokedex-black);
  transition: all 0.1s;
  position: relative;
}

.search-submit:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px var(--pokedex-black);
}

.search-submit:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px var(--pokedex-black);
}

@media (max-width: 600px) {
  .search-container {
    flex-direction: column;
    gap: 20px;
  }
  
  .search-submit {
    padding: 15px;
  }
}
</style>
