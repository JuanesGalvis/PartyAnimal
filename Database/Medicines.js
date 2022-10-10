const { ObjectId } = require('mongodb');
const MongoDB = require('./Mongo');

class Medicines extends MongoDB {

  constructor() {
    super();
  }

  /** C */
  async createMedicine(data) {

    return this.connect().then((db) => {
      return db.collection('Medicamentos').insertOne(data);
    });
  }

  /** R - ALL ONE PET */
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

  /** U */
  async updateMedicine(Id, data) {

    return this.connect().then((db) => {
      return db.collection('Medicamentos').updateOne({_id: ObjectId(Id)}, {$set: {...data}});
    });
  }

  /** D */
  async deleteMedicine(Id) {
    return this.connect().then(async (db) => {

      let pipeline = [
        {
          '$match': {
            'Medicamentos': new ObjectId(Id)
          }
        }
      ]

      let PetsWithMedicine = await db.collection('Mascotas').aggregate(pipeline).toArray();
      PetsWithMedicine.forEach(async (item) => {
        await db.collection('Mascotas').updateOne({_id: ObjectId(item._id)}, { $pull: { 'Medicamentos': ObjectId(Id) }});
      })

      return db.collection('Medicamentos').deleteOne({_id: ObjectId(Id)});
    });
  }

  /** R - ALL MEDICINES */
  async getAllMedicines() {
    return this.connect().then((db) => {
      return db.collection('Medicamentos').find().toArray();
    });
  }

  /** D - MEDICINE - PET */
  async quitMedicine(IdPet, IdMedicine) {
    return this.connect().then((db) => {
      return db.collection('Mascotas').updateOne({_id: ObjectId(IdPet)}, { $pull: { 'Medicamentos': ObjectId(IdMedicine) }});
    });
  }

}

module.exports = Medicines;