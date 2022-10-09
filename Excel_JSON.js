const excelToJson = require('convert-excel-to-json');
const { ObjectId } = require('mongodb');
 
function ConvertExcelToJSON() {
    
    const result = excelToJson({
        sourceFile: './Data/DataOriginal.xlsx',
        header: {
            rows: 1
        }
    });
    
    let { Clientes, Mascotas, Medicamentos } = result;
    let AuxClientes = [...Clientes];

    Medicamentos = Medicamentos.map((item) => {
        return {
            _id: ObjectId(),
            "Id": item.A,
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
            "Telefono": item.E
        }
    })

    Mascotas = Mascotas.map((item) => {
        return {
            _id: ObjectId(),
            "Id": item.A,
            "Nombre": item.B,
            "Raza": item.C,
            "Edad": item.D,
            "Peso": item.E,
            "Medicamentos": Medicamentos.filter((medicamento) => {
                if (String(item.F).split(".").includes(String(medicamento.Id))) {
                    return medicamento;
                }
            }).map((item) => item._id ),
            "Id_Cliente": Clientes[AuxClientes.findIndex((itemClient) => String(itemClient.F).includes(item.A))]._id
        }
    })

    console.log(Clientes);
    console.log(Mascotas);
    console.log(Medicamentos);

    return { Clientes, Mascotas, Medicamentos }
}

ConvertExcelToJSON();

module.exports = { ConvertExcelToJSON };