<script setup>
import { computed } from 'vue';

const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  }
});

const mainType = computed(() => props.pokemon.types[0]);

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

const cardStyle = computed(() => ({
  backgroundColor: typeColors[mainType.value] + '22', // Light version for bg
  borderColor: typeColors[mainType.value]
}));

const formattedId = computed(() => {
  return '#' + props.pokemon.id.toString().padStart(3, '0');
});
</script>

<template>
  <div class="pokemon-card neo-card" :style="cardStyle">
    <div class="card-header">
      <span class="pokemon-id">{{ formattedId }}</span>
      <h3 class="pokemon-name">{{ pokemon.name }}</h3>
    </div>
    
    <div class="image-container">
      <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
    </div>
    
    <div class="card-footer">
      <div class="types">
        <span 
          v-for="type in pokemon.types" 
          :key="type" 
          class="type-badge"
          :style="{ backgroundColor: typeColors[type], border: '3px solid var(--pokedex-black)' }"
        >
          {{ type }}
        </span>
      </div>
      
      <div class="stats-brief neo-stats">
        <div class="stat-item">
          <span class="label">HT</span>
          <span class="value">{{ pokemon.height }}M</span>
        </div>
        <div class="stat-item">
          <span class="label">WT</span>
          <span class="value">{{ pokemon.weight }}KG</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokemon-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.pokemon-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    rgba(0,0,0,0.05),
    rgba(0,0,0,0.05) 10px,
    transparent 10px,
    transparent 20px
  );
  pointer-events: none;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  z-index: 1;
}

.pokemon-id {
  font-family: 'Bungee', cursive;
  color: var(--pokedex-black);
  font-weight: 900;
  font-size: 0.9rem;
  background: var(--pokedex-white);
  padding: 2px 8px;
  border: 3px solid var(--pokedex-black);
}

.pokemon-name {
  text-transform: uppercase;
  font-weight: 900;
  font-size: 1.4rem;
  line-height: 1;
  text-align: right;
  word-break: break-word;
  color: var(--pokedex-black);
  text-shadow: 2px 2px 0px var(--pokedex-white);
}

.image-container {
  background: var(--pokedex-white);
  border: 4px solid var(--pokedex-black);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 15px 0;
  position: relative;
  box-shadow: 4px 4px 0px var(--pokedex-black);
  z-index: 1;
}

.pokemon-image {
  width: 100%;
  max-width: 160px;
  height: auto;
  filter: drop-shadow(4px 4px 0px rgba(0,0,0,0.1));
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pokemon-card:hover .pokemon-image {
  transform: scale(1.2) rotate(5deg);
}

.card-footer {
  margin-top: auto;
  z-index: 1;
}

.types {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}

.neo-stats {
  display: flex;
  justify-content: space-between;
  background: var(--pokedex-black);
  padding: 10px;
  margin: 0 -5px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--pokedex-white);
}

.stat-item .label {
  font-size: 0.8rem;
  font-family: 'Bungee', cursive;
  opacity: 0.8;
}

.stat-item .value {
  font-size: 1rem;
  font-weight: 900;
}
</style>
