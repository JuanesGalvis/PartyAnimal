const express = require('express');
const MedicinesRouter = express.Router();

const Client = require('../Database/Medicines');
const MedicinesClient = new Client();

/** CREATE MEDICINE */
MedicinesRouter.post('/new_medicine', async (req, res, next) => {

    // let result = await MedicinesClient;
    // req.result = result;
    // req.message = "INFO DE TODOS LOS USUARIOS"
    // next();
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
    req.message = "INFO DE TODOS LOS MEDICAMENTOS"
    next();
})

/** READ ONE MEDICINE */
MedicinesRouter.get('/medicines/:idPet/:idMedicine', async (req, res, next) => {

    // let result = await MedicinesClient;
    // req.result = result;
    // req.message = "INFO DE TODOS LOS USUARIOS"
    // next();
})

/** UPDATE MEDICINE */
MedicinesRouter.put('/medicine/:id', async (req, res, next) => {

    // let result = await MedicinesClient;
    // req.result = result;
    // req.message = "INFO DE TODOS LOS USUARIOS"
    // next();
})

/** DELETE CLIENT */
MedicinesRouter.delete('/medicine/:id', async (req, res, next) => {

    // let result = await MedicinesClient;
    // req.result = result;
    // req.message = "INFO DE TODOS LOS USUARIOS"
    // next();
})

module.exports = MedicinesRouter;