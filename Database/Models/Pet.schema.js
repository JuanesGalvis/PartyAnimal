const { ObjectId } = require('mongodb');

const PetMongoSchema = {
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
             Raza: {
                bsonType: "string",
                description: "'Raza' must be a string and is required"
             },
             Edad: {
                bsonType: "int",
                description: "'Edad' must be a int and is required"
             },
             Peso: {
                bsonType: "int",
                description: "'Peso' must be a int and is required"
             },
             Medicamentos: {
                bsonType: "array",
                description: "'Medicamentos' must be an array and is required"
             },
             Id_Cliente: {
                bsonType: "objectId",
                description: "'Id_Cliente' must be a objectId and is required"
             }
          }
       }
    }
 }

 module.exports = { PetMongoSchema };