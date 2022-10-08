const express = require('express');
const PetsRouter = express.Router();

const Client = require('../Database/Pets');
const PetsClient = new Client();

PetsRouter.get('/pets/:idOwner', async (req, res) => {

    let result = await PetsClient.getPets(req.params.idOwner)

    res.json({
        result
    });

})

module.exports = PetsRouter;