const express = require('express');
const MedicinesRouter = express.Router();

const Client = require('../Database/Medicines');
const MedicinesClient = new Client();

MedicinesRouter.get('/medicines/:idPet', async (req, res) => {

    let result = await MedicinesClient.getMedicines(req.params.idPet)

    res.json({
        result
    });

})

module.exports = MedicinesRouter;