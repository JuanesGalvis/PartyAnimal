const express = require('express');
const MedicinesRouter = express.Router();

const Client = require('../Database/Medicines');
const MedicinesClient = new Client();

/** CREATE MEDICINE */
MedicinesRouter.post('/new_medicine', async (req, res, next) => {

    let result = await MedicinesClient.createMedicine(req.body);
    req.result = result;
    req.message = "MEDICINA CREADA EXITOSAMENTE"
    next();
})

/** READ ALL MEDICINES IN GENERAL */
MedicinesRouter.get('/medicines', async (req, res, next) => {

    let result = await MedicinesClient.getAllMedicines()

    req.result = result;
    req.message = "INFO DE TODOS LOS MEDICAMENTOS EN GENERAL"
    next();
})

/** READ ALL MEDICINES */
MedicinesRouter.get('/medicines/:idPet', async (req, res, next) => {

    let result = await MedicinesClient.getMedicines(req.params.idPet)

    req.result = result;
    req.message = "INFO DE TODOS LOS MEDICAMENTOS DE UNA MASCOTA"
    next();
})

/** READ ONE MEDICINE */
MedicinesRouter.get('/medicine/:id', async (req, res, next) => {

    let result = await MedicinesClient.getOneMedicine(req.params.id);
    req.result = result;
    req.message = "INFO DE UNA MEDICINA EN ESPECIFICO"
    next();
})

/** UPDATE MEDICINE */
MedicinesRouter.put('/medicine/:id', async (req, res, next) => {

    let result = await MedicinesClient.updateMedicine(req.params.id, req.body);
    req.result = result;
    req.message = "MEDICINA ACTUALIZADA EXITOSAMENTE"
    next();
})

/** DELETE MEDICINE */
MedicinesRouter.delete('/medicine/:id', async (req, res, next) => {

    let result = await MedicinesClient.deleteMedicine(req.params.id);
    req.result = result;
    req.message = "MEDICINA ELIMINADA EXITOSAMENTE"
    next();
})

/** QUIT MEDICINE - PET */
MedicinesRouter.put('/medicines/:idPet/:idMedicine', async (req, res, next) => {

    let result = await MedicinesClient.quitMedicine(req.params.idPet, req.params.idMedicine);
    req.result = result;
    req.message = "MEDICINA QUITADA EXITOSAMENTE"
    next();
})

module.exports = MedicinesRouter;