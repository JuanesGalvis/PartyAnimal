const express = require('express');
const CustomersRouter = express.Router();

const { json2xml } = require('xml-js');

const Client = require('../Database/Client');
const CustomerClient = new Client();

/** CREATE CLIENT */
CustomersRouter.post('/new_customer', async (req, res, next ) => {

    // let result = await CustomerClient.getAllClients();
    // req.result = result;
    // req.message = "INFO DE TODOS LOS USUARIOS"
    // next();
})

/** READ ALL CLIENTS */
CustomersRouter.get('/customers', async (req, res, next ) => {

    let result = await CustomerClient.getAllClients();
    req.result = result;
    req.message = "INFO DE TODOS LOS USUARIOS"
    next();
})

/** READ ONE CLIENT */

/** CREATE CLIENT */
CustomersRouter.get('/customer/:id', async (req, res, next ) => {

    // let result = await CustomerClient.getAllClients();
    // req.result = result;
    // req.message = "INFO DE TODOS LOS USUARIOS"
    // next();
})

/** UPDATE CLIENT */
CustomersRouter.put('/customer/:id', async (req, res, next ) => {

    // let result = await CustomerClient.getAllClients();
    // req.result = result;
    // req.message = "INFO DE TODOS LOS USUARIOS"
    // next();
})

/** DELETE CLIENT */
CustomersRouter.delete('/customer/:id', async (req, res, next ) => {

    // let result = await CustomerClient.getAllClients();
    // req.result = result;
    // req.message = "INFO DE TODOS LOS USUARIOS"
    // next();
})

/** REPORT - XML */

CustomersRouter.get('/report/:idClient', async (req, res) => {
    
    let resultJSON = await CustomerClient.getReport(req.params.idClient);

    if (resultJSON == undefined) {
        res.status(404).json({
            message: "OH NO 404 😂"
        });
    } else {
        const resultXML = json2xml(JSON.stringify(resultJSON), { compact: true, spaces: 4 });
    
        res.header("Content-Type", "application/xml");
        res.status(200).send(resultXML);
    }
})

module.exports = CustomersRouter;