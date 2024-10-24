// script.js

// Seleccionamos todas las divisiones de usuarios
const usuarios = document.querySelectorAll('.usuario');

usuarios.forEach(usuario => {
    const numero = usuario.querySelector('.numero');
    const botonAumentar = usuario.querySelector('.aumentar');
    const botonDisminuir = usuario.querySelector('.disminuir');
    const botonGuardar = usuario.querySelector('.guardar');
    
    const usuarioId = usuario.id; // Usaremos el ID de usuario para identificarlo en la base de datos
    let valorActual = 0;

    // Al cargar la página, obtenemos el valor guardado en el backend
    fetch(`http://localhost:3000/contador/${usuarioId}`)
        .then(response => response.json())
        .then(data => {
            valorActual = data.valor;
            numero.textContent = valorActual;
        });

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

    // Función para guardar el valor en el backend
    botonGuardar.addEventListener('click', () => {
        fetch('http://localhost:3000/contador', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuarioId, valor: valorActual })
        })
        .then(response => response.json())
        .then(data => {
            alert(`El valor del Usuario ${usuarioId} se ha guardado: ${valorActual}`);
        })
        .catch(error => {
            console.error('Error al guardar el valor:', error);
        });
    });
});
