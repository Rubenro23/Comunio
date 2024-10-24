// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB (si estás usando MongoDB Atlas, cambia la URI)
mongoose.connect('mongodb://localhost:27017/contadores', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Definir el esquema del contador
const ContadorSchema = new mongoose.Schema({
    usuarioId: String,
    valor: Number
});

const Contador = mongoose.model('Contador', ContadorSchema);

// Ruta para obtener el contador de un usuario
app.get('/contador/:usuarioId', async (req, res) => {
    try {
        const contador = await Contador.findOne({ usuarioId: req.params.usuarioId });
        if (contador) {
            res.json(contador);
        } else {
            // Si no hay contador en la base de datos, devolvemos 0
            res.json({ usuarioId: req.params.usuarioId, valor: 0 });
        }
    } catch (err) {
        res.status(500).send('Error al obtener el contador');
    }
});

// Ruta para actualizar o guardar el contador de un usuario
app.post('/contador', async (req, res) => {
    const { usuarioId, valor } = req.body;
    try {
        let contador = await Contador.findOne({ usuarioId });
        if (contador) {
            contador.valor = valor;
            await contador.save();
        } else {
            contador = new Contador({ usuarioId, valor });
            await contador.save();
        }
        res.json({ message: 'Valor guardado correctamente' });
    } catch (err) {
        res.status(500).send('Error al guardar el valor');
    }
});

// Escuchar en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
