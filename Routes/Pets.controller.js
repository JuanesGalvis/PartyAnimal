const express = require('express');
const PetsRouter = express.Router();

const Client = require('../Database/Pets');
const PetsClient = new Client();

/** CREATE PET */
PetsRouter.post('/new_pet', async (req, res, next ) => {

    // let result = await PetsClient;
    // req.result = result;
    // req.message = "INFO DE TODOS LOS USUARIOS"
    // next();
})

/** READ ALL PETS */
PetsRouter.get('/pets/:idOwner', async (req, res, next) => {

    let result = await PetsClient.getPets(req.params.idOwner)

    req.result = result;
    req.message = "INFO DE TODOS LAS MASCOTAS"
    next();

})

/** READ ONE PET */
PetsRouter.get('/pets/:idOwner/:idPet', async (req, res, next ) => {

    // let result = await PetsClient;
    // req.result = result;
    // req.message = "INFO DE TODOS LOS USUARIOS"
    // next();
})

/** UPDATE MEDICINE */
PetsRouter.put('/pet/:id', async (req, res, next ) => {

    // let result = await PetsClient;
    // req.result = result;
    // req.message = "INFO DE TODOS LOS USUARIOS"
    // next();
})

/** DELETE CLIENT */
PetsRouter.delete('/pet/:id', async (req, res, next ) => {

    // let result = await PetsClient;
    // req.result = result;
    // req.message = "INFO DE TODOS LOS USUARIOS"
    // next();
})
module.exports = PetsRouter;