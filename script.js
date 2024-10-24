// script.js

// Seleccionamos todas las divisiones de usuarios
const usuarios = document.querySelectorAll('.usuario');

usuarios.forEach(usuario => {
    // Seleccionamos los elementos dentro de cada usuario
    const numero = usuario.querySelector('.numero');
    const botonAumentar = usuario.querySelector('.aumentar');
    const botonDisminuir = usuario.querySelector('.disminuir');

    // Inicializamos el valor actual del número en 0
    let valorActual = 0;

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
});
