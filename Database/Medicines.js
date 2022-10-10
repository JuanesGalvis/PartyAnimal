const { ObjectId } = require('mongodb');
const MongoDB = require('./Mongo');

class Medicines extends MongoDB {

  constructor() {
    super();
  }

  async getMedicines(IdPet) {

    try {

      let pipeline = [
        {
          '$match': {
            '_id': new ObjectId(IdPet)
          }
        }, {
          '$lookup': {
            'from': 'Medicamentos',
            'localField': 'Medicamentos',
            'foreignField': '_id',
            'as': 'Medicamentos'
          }
        }, {
          '$project': {
            'Medicamentos': 1
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

  async getAllMedicines() {
    return this.connect().then((db) => {
      return db.collection('Medicamentos').find().toArray();
    });
  }

}

module.exports = Medicines;