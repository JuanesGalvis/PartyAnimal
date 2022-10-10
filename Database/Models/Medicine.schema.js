const MedicineMongoSchema = {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          title: "Clientes de la veterinaria",
          properties: {
             Id: {
                bsonType: "int",
                description: "'Id' must be a int and is required"
             },
             Nombre: {
                bsonType: "string",
                description: "'Nombre' must be a string and is required"
             },
             Descripcion: {
                bsonType: "string",
                description: "'Descripcion' must be a string and is required"
             },
             Dosis: {
                bsonType: "string",
                description: "'Dosis' must be a string and is required"
             }
          }
       }
    }
 }

 module.exports = { MedicineMongoSchema };