// Crear el servidor
const express = require('express');
const App = express();
// CORS
const CORS = require('cors');
App.use(CORS());
// Variables de entorno
require('dotenv').config();

const { ResponseAPI } = require('./Middleware/Response');

// Utilizar JSON en la API
App.use(express.json());

App.use(require('./Routes/Admin.controller'));
App.use(require('./Routes/Customers.controller'));
App.use(require('./Routes/Pets.controller'));
App.use(require('./Routes/Medicines.controller'));
App.use(require('./Middleware/Response'))

// Ruta inicial o de bienvenida
App.get('/', (req, res) => {
    res.send("🐶 PARTY ANIMAL 😺");
})

// Puerto a escuchar
App.listen( process.env.PORT || 3000 ,() => {
    console.log("Servidor corriendo en el puerto: " + process.env.PORT || 3000);
})