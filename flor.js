// flor.js
document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const scene = document.querySelector('.scene');
  let isRestarting = false;

  // Función para reiniciar todas las animaciones
  const restartAnimations = () => {
    if (isRestarting) return;
    isRestarting = true;

    // 1. Quitar la clase para detener animaciones
    html.classList.remove('blooming');

    // 2. Forzar reflow accediendo a una propiedad de layout del elemento animado
    //    Usar .scene en lugar de html es más confiable en Safari
    void scene.offsetWidth;

    // 3. Volver a agregar la clase en el siguiente frame de pintura
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        html.classList.add('blooming');
        isRestarting = false;
      });
    });
  };

  // Registrar solo 'pointerdown' que cubre mouse, touch y stylus de forma unificada.
  // En Safari iOS también funciona correctamente con { passive: true }.
  window.addEventListener('pointerdown', restartAnimations, { passive: true });

  // Mostrar la flor al cargar
  requestAnimationFrame(() => {
    html.classList.add('blooming');
  });
});