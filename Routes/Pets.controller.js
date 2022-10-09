const express = require('express');
const PetsRouter = express.Router();

const Client = require('../Database/Pets');
const PetsClient = new Client();

/** CREATE PET */
PetsRouter.post('/new_pet', async (req, res, next ) => {

    let result = await PetsClient.createPet(req.body);
    req.result = result;
    req.message = "MASCOTA CREADA CON ÉXITO"
    next();
})

/** READ ALL PETS */
PetsRouter.get('/pets/:idOwner', async (req, res, next) => {

    let result = await PetsClient.getPets(req.params.idOwner)

    req.result = result;
    req.message = "INFO DE TODOS LAS MASCOTAS"
    next();

})

/** READ ONE PET */
PetsRouter.get('/pet/:idPet', async (req, res, next ) => {

    let result = await PetsClient.getOnePet(req.params.idPet);
    req.result = result;
    req.message = "INFO DE UNA MASCOTA"
    next();
})

/** UPDATE PET */
PetsRouter.put('/pet/:id', async (req, res, next ) => {

    let result = await PetsClient.updatePet(req.params.id, req.body);
    req.result = result;
    req.message = "MASCOTA ACTUALIZADA CON ÉXITO"
    next();
})

/** DELETE PET */
PetsRouter.delete('/pet/:id', async (req, res, next ) => {

    let result = await PetsClient.deletePet(req.params.id);
    req.result = result;
    req.message = "MASCOTA ELIMINADA CON ÉXITO"
    next();
})
module.exports = PetsRouter;