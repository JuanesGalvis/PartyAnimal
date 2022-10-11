// Crear el servidor
const express = require('express');
const App = express();

// CORS
const CORS = require('cors');

let optionsRoutesCORS = {
  origin: function (origin, callback) {
      if (origin === "https://party-animal.vercel.app") {
        callback(null, true)
      } else {
        callback("ERROR DE CORS - NO VIENES DEL ORIGEN PERMITIDO")
      }}
};

// Variables de entorno
require('dotenv').config();

// Utilizar JSON en la API
App.use(express.json());

// Ruta inicial o de bienvenida
App.get('/', CORS(), (req, res) => {
    res.send("🐶 PARTY ANIMAL 😺");
})

App.use(require('./Routes/Admin.controller'));
App.use(CORS(optionsRoutesCORS), require('./Routes/Customers.controller'));
App.use(CORS(optionsRoutesCORS), require('./Routes/Pets.controller'));
App.use(CORS(optionsRoutesCORS), require('./Routes/Medicines.controller'));
App.use(require('./Middleware/Response'))

// Puerto a escuchar
App.listen( process.env.PORT || 3000 ,() => {
    console.log("Servidor corriendo en el puerto: " + process.env.PORT || 3000);
})