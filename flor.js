// flor.js
document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  
  // Función para reiniciar todas las animaciones
  const restartAnimations = () => {
    console.log('Reiniciando animaciones...');
    
    // 1. Eliminar la clase blooming si existe
    html.classList.remove('blooming');
    
    // 2. Forzar un reflow accediendo a propiedades de estilo
    void html.offsetHeight; // Esto fuerza al navegador a recalcular estilos
    
    // 3. Crear un elemento de respaldo para asegurar que las animaciones se reinicien
    // Eliminar y volver a agregar los estilos de los pseudo-elementos
    const style = document.createElement('style');
    style.textContent = `
      /* Forzar reinicio de animaciones */
      head::before, head::after, html::before,
      body::before, body::after, html::after {
        animation: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // 4. Pequeño retraso para asegurar que los cambios se apliquen
    setTimeout(() => {
      // Eliminar el estilo temporal
      style.remove();
      // Volver a agregar la clase blooming
      html.classList.add('blooming');
      console.log('Animación reiniciada');
    }, 50);
  };
  
  // Agregar evento de clic
  window.addEventListener('click', restartAnimations);
  
  // Mostrar la flor al cargar (con un pequeño retraso)
  setTimeout(() => {
    html.classList.add('blooming');
    console.log('Flor cargada inicialmente');
  }, 100);
});