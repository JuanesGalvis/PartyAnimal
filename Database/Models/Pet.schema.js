const { ObjectId } = require('mongodb');

const PetMongoSchema = {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          title: "Clientes de la veterinaria",
          properties: {
             Id: {
                bsonType: "string",
                description: "'Id' must be a string and is required"
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
                bsonType: "string",
                description: "'Edad' must be a string and is required"
             },
             Peso: {
                bsonType: "string",
                description: "'Peso' must be a string and is required"
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