const excelToJson = require('convert-excel-to-json');
const { readFileSync } = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb');
 
function ConvertExcelToJSON() {
    
    let file = path.join(process.cwd(), 'DataOriginal.xlsx');

    const result = excelToJson({
        source: readFileSync(file),
        header: {
            rows: 1
        }
    });
    
    let { Clientes, Mascotas, Medicamentos } = result;
    let AuxClientes = [...Clientes];

    Medicamentos = Medicamentos.map((item) => {
        return {
            _id: ObjectId(),
            "Id": String(item.A),
            "Nombre": item.B,
            "Descripcion": item.C,
            "Dosis": item.D
        }
    })
    
    Clientes = Clientes.map((item) => {
        return {
            _id: ObjectId(),
            "Cedula": item.A,
            "Nombres": item.B,
            "Apellidos": item.C,
            "Direccion": item.D,
            "Telefono": String(item.E)
        }
    })

    Mascotas = Mascotas.map((item) => {
        return {
            _id: ObjectId(),
            "Id": String(item.A),
            "Nombre": item.B,
            "Raza": item.C,
            "Edad": String(item.D),
            "Peso": String(item.E),
            "Medicamentos": Medicamentos.filter((medicamento) => {
                if (String(item.F).split(".").includes(String(medicamento.Id))) {
                    return medicamento;
                }
            }).map((item) => item._id ),
            "Id_Cliente": Clientes[AuxClientes.findIndex((itemClient) => String(itemClient.F).includes(item.A))]._id
        }
    })

    return { Clientes, Mascotas, Medicamentos }
}

module.exports = { ConvertExcelToJSON };