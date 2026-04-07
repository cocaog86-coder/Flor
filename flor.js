// flor.js
document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  let isRestarting = false;
  
  // Función para reiniciar todas las animaciones
  const restartAnimations = () => {
    if (isRestarting) return;
    isRestarting = true;
    console.log('Reiniciando animaciones...');
    
    // 1. Eliminar la clase blooming si existe
    html.classList.remove('blooming');
    
    // 2. Forzar un reflow accediendo a propiedades de estilo
    html.getBoundingClientRect(); // Esto fuerza al navegador a recalcular estilos
    
    // 3. Crear un elemento de respaldo para asegurar que las animaciones se reinicien
    const style = document.createElement('style');
    style.textContent = `
      /* Forzar reinicio de animaciones */
      .scene::before, .scene::after, html::before,
      body::before, body::after, html::after {
        animation: none !important;
        -webkit-animation: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // 4. Pequeño retraso para asegurar que los cambios se apliquen
    setTimeout(() => {
      // Eliminar el estilo temporal
      style.remove();
      // Volver a agregar la clase blooming
      html.classList.add('blooming');
      isRestarting = false;
      console.log('Animación reiniciada');
    }, 100);
  };
  
  // Agregar eventos de interacción compatibles con iPhone Safari
  ['click', 'touchstart', 'pointerdown'].forEach((eventName) => {
    window.addEventListener(eventName, restartAnimations, { passive: true });
  });
  
  // Mostrar la flor al cargar (con un pequeño retraso)
  setTimeout(() => {
    html.classList.add('blooming');
    console.log('Flor cargada inicialmente');
  }, 100);
});