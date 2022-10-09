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
      try {
        let pipeline = [
          {
            '$match': {
              'Id_Cliente': new ObjectId(IdClient)
            }
          }, {
            '$lookup': {
              'from': 'Medicamentos', 
              'localField': 'Medicamentos', 
              'foreignField': '_id', 
              'as': 'Medicamentos'
            }
          }
        ]

        return this.connect().then((db) => {
            return db.collection('Mascotas').aggregate(pipeline).toArray();
          });
      } catch (error) {
        return undefined;
      }
    }
}

module.exports = Clients;