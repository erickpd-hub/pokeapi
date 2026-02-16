<script setup>
import PokemonListView from './views/PokemonListView.vue';
import './assets/styles/pokedex.css';
</script>

<template>
  <div id="app" class="app-transition">
    <!-- Pokedex Header Hook -->
    <header class="pokedex-header">
      <div class="main-led"></div>
      <div class="small-leds">
        <div class="led red"></div>
        <div class="led yellow"></div>
        <div class="led green"></div>
      </div>
      <div class="pokedex-title">
        <h1>POKÉDEX</h1>
      </div>
      <div class="header-decoration">
        <span class="caution-label">CAUTION: HIGH VOLTAGE</span>
      </div>
    </header>

    <main class="pokedex-container">
      <div class="pokedex-screen neo-card">
        <PokemonListView />
      </div>
    </main>
    
    <footer class="pokedex-footer neobrutalist-footer">
      <div class="vent-system">
        <div class="footer-vent"></div>
        <div class="footer-vent"></div>
        <div class="footer-vent"></div>
      </div>
      <div class="footer-content">
        <p class="branding">VUE 3 FRAMEWORK // PRUEBA POKEAPI</p>

      </div>
    </footer>
  </div>
</template>

<style>
/* Global Layout Adjustments */
.pokedex-title h1 {
  color: white;
  font-size: 2rem;
  letter-spacing: 4px;
  font-weight: 900;
  text-shadow: 4px 4px 0px var(--pokedex-black);
}

.header-decoration {
  margin-left: auto;
  border: 2px solid var(--pokedex-black);
  padding: 5px 10px;
  background: var(--pokedex-yellow);
  transform: rotate(2deg);
}

.caution-label {
  font-family: monospace;
  font-weight: 900;
  font-size: 0.7rem;
  color: var(--pokedex-black);
}

.neobrutalist-footer {
  background-color: var(--pokedex-red);
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  border-top: 15px solid var(--pokedex-black);
  box-shadow: inset 0 10px 0 var(--pokedex-dark-red);
}

.vent-system {
  display: flex;
  gap: 15px;
}

.footer-vent {
  width: 120px;
  height: 12px;
  background-color: var(--pokedex-black);
  border-radius: 6px;
}

.footer-content {
  text-align: center;
}

.branding {
  color: var(--pokedex-white);
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.copyright {
  color: rgba(255,255,255,0.7);
  font-size: 0.8rem;
  font-family: monospace;
}

/* Base fade-in for screen content */
.pokedex-screen > * {
  animation: slide-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@media (max-width: 600px) {
  .pokedex-header {
    padding: 15px;
    justify-content: center;
    gap: 10px;
  }

  .main-led, .small-leds, .header-decoration {
    display: none;
  }

  .pokedex-title h1 {
    font-size: 1.5rem;
    letter-spacing: 2px;
  }
}

/* Page Transitions */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.1);
  filter: blur(10px);
}

.app-transition {
  animation: appAppear 1s both;
}

@keyframes appAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
