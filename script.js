// script.js

// Seleccionamos todas las divisiones de usuarios
const usuarios = document.querySelectorAll('.usuario');

usuarios.forEach(usuario => {
    const numero = usuario.querySelector('.numero');
    const botonAumentar = usuario.querySelector('.aumentar');
    const botonDisminuir = usuario.querySelector('.disminuir');
    const botonGuardar = usuario.querySelector('.guardar');
    
    const usuarioId = usuario.id; // Usaremos el ID de usuario para guardar su valor en localStorage
    let valorActual = 0;

    // Al cargar la página, verificamos si hay un valor guardado en localStorage
    if (localStorage.getItem(usuarioId)) {
        valorActual = parseInt(localStorage.getItem(usuarioId));
        numero.textContent = valorActual;
    }

    // Función para aumentar el valor
    botonAumentar.addEventListener('click', () => {
        valorActual++;
        numero.textContent = valorActual;
    });

    // Función para disminuir el valor
    botonDisminuir.addEventListener('click', () => {
        valorActual--;
        numero.textContent = valorActual;
    });

    // Función para guardar el valor actual en localStorage
    botonGuardar.addEventListener('click', () => {
        localStorage.setItem(usuarioId, valorActual);
        alert(`El valor del Usuario ${usuarioId} se ha guardado: ${valorActual}`);
    });
});
