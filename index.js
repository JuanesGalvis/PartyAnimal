// Crear el servidor
const express = require('express');
const App = express();
// CORS
const CORS = require('cors');
App.use(CORS());
// Variables de entorno
require('dotenv').config();

// Utilizar JSON en la API
App.use(express.json());

App.use(require('./Controller/Admin.controller'));
App.use(require('./Controller/Customers.controller'));
App.use(require('./Controller/Pets.controller'));
App.use(require('./Controller/Medicines.controller'));

// Ruta inicial o de bienvenida
App.get('/', (req, res) => {
    res.send("BIENVENIDOS AL BACKEND");
})

// Puerto a escuchar
App.listen( process.env.PORT || 3000 ,() => {
    console.log("Servidor corriendo en el puerto: " + process.env.PORT || 3000);
})