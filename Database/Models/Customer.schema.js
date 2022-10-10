const CustomerMongoSchema = {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          title: "Clientes de la veterinaria",
          properties: {
             Cedula: {
                bsonType: "string",
                description: "'Cedula' must be a string and is required"
             },
             Nombres: {
                bsonType: "string",
                description: "'Nombres' must be a string and is required"
             },
             Apellidos: {
                bsonType: "string",
                description: "'Apellidos' must be a string and is required"
             },
             Direccion: {
                bsonType: "string",
                description: "'Direccion' must be a string and is required"
             },
             Telefono: {
                bsonType: "string",
                description: "'Telefono' must be a string and is required"
             }
          }
       }
    }
 }

 module.exports = { CustomerMongoSchema };