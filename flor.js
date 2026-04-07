js
// flor.js
document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;

  let isTouch = false;

  // Función optimizada para reiniciar animaciones (compatible con Safari)
  const restartAnimations = () => {
    console.log('Reiniciando animaciones...');

    // 1. Quitar la clase
    html.classList.remove('blooming');

    // 2. Forzar reflow real (mejor que getBoundingClientRect en Safari)
    void html.offsetWidth;

    // 3. Volver a activar animación en el siguiente frame
    requestAnimationFrame(() => {
      html.classList.add('blooming');
      console.log('Animación reiniciada');
    });
  };

  // Eventos corregidos (evita doble ejecución en iPhone)
  window.addEventListener('touchstart', () => {
    isTouch = true;
    restartAnimations();
  });

  window.addEventListener('click', () => {
    if (!isTouch) restartAnimations();
    isTouch = false;
  });

  // Mostrar la flor al cargar
  setTimeout(() => {
    html.classList.add('blooming');
    console.log('Flor cargada inicialmente');
  }, 100);
});

