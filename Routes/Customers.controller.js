const express = require('express');
const CustomersRouter = express.Router();

const { json2xml } = require('xml-js');
const { GenerateHTML } = require('../Lib/SaxonJS');

const Client = require('../Database/Client');
const CustomerClient = new Client();

/** CREATE CLIENT */
CustomersRouter.post('/new_customer', async (req, res, next) => {

    let result = await CustomerClient.createClient(req.body);
    req.result = result;
    req.message = "USUARIO CREADO CON ÉXITO"
    next();
})

/** READ ALL CLIENTS */
CustomersRouter.get('/customers', async (req, res, next) => {

    let result = await CustomerClient.getAllClients();
    req.result = result;
    req.message = "INFO DE TODOS LOS USUARIOS"
    next();
})

/** READ ONE CLIENT */
CustomersRouter.get('/customer/:id', async (req, res, next) => {

    let result = await CustomerClient.getOneClient(req.params.id);
    req.result = result;
    req.message = "INFO DE UN USUARIO EN ESPECIFICO"
    next();
})

/** UPDATE CLIENT */
CustomersRouter.put('/customer/:id', async (req, res, next) => {

    let result = await CustomerClient.updateClient(req.params.id, req.body)
    req.result = result;
    req.message = "USUARIO ACTUALIZADO CON ÉXITO"
    next();
})

/** DELETE CLIENT */
CustomersRouter.delete('/customer/:id', async (req, res, next) => {

    let result = await CustomerClient.deleteClient(req.params.id);
    req.result = result;
    req.message = "USUARIO ELIMINADO CON ÉXITO"
    next();
})

/** REPORT - XML */

CustomersRouter.get('/report/:idClient', async (req, res) => {

    let resultJSON = await CustomerClient.getReportClient(req.params.idClient);

    if (resultJSON == undefined) {
        res.status(404).json({
            message: "OH NO 404 😂"
        });
    } else {
        let XML = json2xml(JSON.stringify(resultJSON), { compact: true, spaces: 4 });

        let i = 0;

        XML = '<?xml version="1.0" encoding="UTF-8"?><Reporte>' + XML;

        while (XML.includes(`<${i}>`)) {

            XML = XML.replace(`<${i}>`, "<Mascota>");
            XML = XML.replace(`</${i}>`, "</Mascota>");
            i++;
        }

        XML = XML + "</Reporte>"

        let HTML = await GenerateHTML(XML, 'Client');
        res.status(200).send(String(HTML));
    }
})

CustomersRouter.get('/report_all', async (req, res) => {

    let result = await CustomerClient.getReportAll();

    let XML = json2xml(JSON.stringify(result), { compact: true, spaces: 4 });
    let i = 0;

    XML = '<?xml version="1.0" encoding="UTF-8"?><Reporte>' + XML;

    while (XML.includes(`<${i}>`)) {

        XML = XML.replace(`<${i}>`, "<Mascota>");
        XML = XML.replace(`</${i}>`, "</Mascota>");
        i++;
    }

    XML = XML + "</Reporte>"

    let HTML = await GenerateHTML(XML, 'General');
    res.status(200).send(String(HTML));
})

module.exports = CustomersRouter;