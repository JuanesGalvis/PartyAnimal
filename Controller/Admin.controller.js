const express = require('express');
const AdminRouter = express.Router();

const { ConvertExcelToJSON } = require('../Excel_JSON');
const MongoDB = require('../Database/Mongo');
const AdminClient = new MongoDB();

AdminRouter.get('/backup', async (req, res) => {

    let { Clientes, Mascotas, Medicamentos } = ConvertExcelToJSON();
    
    await AdminClient.dataExcel(Medicamentos, "Medicamentos");
    await AdminClient.dataExcel(Mascotas, "Mascotas");
    await AdminClient.dataExcel(Clientes, "Clientes");

    res.json({
      message: 'DATOS INSERTADOS CON ÉXITO'
    });

})

module.exports = AdminRouter;