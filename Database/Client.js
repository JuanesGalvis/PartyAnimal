const { ObjectId } = require('mongodb');
const MongoDB = require('./Mongo');

class Clients extends MongoDB {

    constructor() {
        super();
    }

    async getAllClients() {
        return this.connect().then((db) => {
          return db.collection('Clientes').find().toArray();
        });
      }

    async getReport(IdClient) {
      let pipeline = [
        {
          '$match': {
            '_id': new ObjectId(IdClient)
          }
        },
        {
          '$lookup': {
            'from': 'Mascotas', 
            'localField': 'Mascotas', 
            'foreignField': '_id', 
            'as': 'Mascotas'
          }
        }, {
          '$lookup': {
            'from': 'Medicamentos', 
            'localField': 'Mascotas.Medicamentos', 
            'foreignField': '_id', 
            'as': 'Medicamentos'
          }
        }, {
          $project: {
              'Mascotas.Medicamentos': 0
          }
        }
      ]

      return this.connect().then((db) => {
        return db.collection('Clientes').aggregate(pipeline).toArray();
      });
    }
}

module.exports = Clients;