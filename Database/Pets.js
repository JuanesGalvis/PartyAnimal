const { ObjectId } = require('mongodb');
const MongoDB = require('./Mongo');

class Pets extends MongoDB {

    constructor() {
        super();
    }

    async getPets(IdOwner) {

        let pipeline = [
            {
              '$match': {
                '_id': new ObjectId(IdOwner)
              }
            }, {
              '$lookup': {
                'from': 'Mascotas', 
                'localField': 'Mascotas', 
                'foreignField': '_id', 
                'as': 'Mascotas'
              }
            }, {
              '$project': {
                'Mascotas': 1
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

module.exports = Pets;