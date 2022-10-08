const { ObjectId } = require('mongodb');
const MongoDB = require('./Mongo');

class Medicines extends MongoDB {

    constructor() {
        super();
    }

    async getMedicines(IdPet) {

        let pipeline = [
          {
            '$match': {
              '_id': new ObjectId(IdPet)
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
          }
        ]

        return this.connect().then((db) => {
          return db.collection('Mascotas').aggregate(pipeline).toArray();
        });
      }

}

module.exports = Medicines;