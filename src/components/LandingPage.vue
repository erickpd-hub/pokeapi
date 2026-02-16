<script setup>
const emit = defineEmits(['start']);
</script>

<template>
  <div class="landing-page">
    <div class="spline-container">
      <spline-viewer url="https://prod.spline.design/Q2CRxUDIcNEGJClt/scene.splinecode"></spline-viewer>
    </div>
    
    <div class="overlay">
      <div class="center-ui">
        <button @click="emit('start')" class="minimal-btn center-btn">
          <span>INGRESAR</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: #000;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.spline-container {
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.center-ui {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 250px; /* Offset below the sphere area */
  pointer-events: auto;
}

.top-left-ui {
  position: absolute;
  top: 40px;
  left: 40px;
  pointer-events: auto;
  animation: slideFromLeft 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.minimal-btn {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.8rem 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  letter-spacing: 4px;
  cursor: pointer;
  transition: all 0.4s ease;
  backdrop-filter: blur(5px);
}

.minimal-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #fff;
  letter-spacing: 6px;
}

.top-left-btn {
  border: none;
  padding: 0;
  font-weight: 900;
  font-size: 1.2rem;
  letter-spacing: 8px;
}

.top-left-btn:hover {
  background: transparent;
  letter-spacing: 12px;
  text-shadow: 0 0 10px rgba(255,255,255,0.5);
}

@keyframes slideFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 600px) {
  .top-left-ui {
    top: 20px;
    left: 20px;
  }
  .top-left-btn {
    font-size: 1rem;
    letter-spacing: 4px;
  }
}
</style>
