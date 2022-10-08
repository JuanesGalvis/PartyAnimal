const express = require('express');
const CustomersRouter = express.Router();

const Client = require('../Database/Client');
const CustomerClient = new Client();

const { json2xml } = require('xml-js');

CustomersRouter.get('/customers', async (req, res) => {

    let result = await CustomerClient.getAllClients();

    res.json({
        result
    });

})

CustomersRouter.get('/report/:idClient', async (req, res) => {
    
    let resultJSON = await CustomerClient.getReport(req.params.idClient);

    console.log(JSON.stringify(resultJSON));

    const resultXML = json2xml(JSON.stringify(resultJSON), { compact: true, spaces: 4 });

    res.header("Content-Type", "application/xml");
    res.status(200).send(resultXML);

})

module.exports = CustomersRouter;