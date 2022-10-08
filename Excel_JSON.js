const excelToJson = require('convert-excel-to-json');
const { ObjectId } = require('mongodb');
 
function ConvertExcelToJSON() {
    
    const result = excelToJson({
        sourceFile: './Data/DataOriginal.xlsx'
    });
    
    let { Clientes, Mascotas, Medicamentos } = result;
    
    Medicamentos.shift();
    Medicamentos = Medicamentos.map((item) => {
        return {
            _id: ObjectId(),
            "Id": item.A,
            "Nombre": item.B,
            "Descripcion": item.C,
            "Dosis": item.D
        }
    })
    
    Mascotas.shift();
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
            }).map((item) => item._id )
        }
    })
    
    Clientes.shift();
    Clientes = Clientes.map((item) => {
        return {
            _id: ObjectId(),
            "Cedula": item.A,
            "Nombres": item.B,
            "Apellidos": item.C,
            "Direccion": item.D,
            "Telefono": item.E,
            "Mascotas": Mascotas.filter((mascota) => {
                if (String(item.F).split(".").includes(String(mascota.Id))) {
                    return mascota;
                }
            }).map((item) => item._id )
        }
    })

    return { Clientes, Mascotas, Medicamentos }
}

module.exports = { ConvertExcelToJSON };