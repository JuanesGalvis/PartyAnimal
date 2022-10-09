const { ObjectId } = require('mongodb');
const MongoDB = require('./Mongo');

class Pets extends MongoDB {

    constructor() {
        super();
    }

    /** C */
    async createPet(data) {

      let newPetFormat = {
        ...data,
        Medicamentos: data.Medicamentos.map((item) => {
          return ObjectId(item)
        }),
        Id_Cliente: ObjectId(data.Id_Cliente)
      }

      return this.connect().then((db) => {
        return db.collection('Mascotas').insertOne(newPetFormat);
      });
    }

    /** R - ALL */
    async getPets(IdOwner) {

        return this.connect().then((db) => {
          try {
            return db.collection('Mascotas').find({ Id_Cliente: ObjectId(IdOwner) }).toArray();
          } catch (err) {
            return undefined;
          }
        });
    }

    /** R - ONE */
    async getOnePet(Id) {
      return this.connect().then((db) => {
        return db.collection('Mascotas').findOne({_id: ObjectId(Id)});
      });
    }

    /** U */
    async updatePet(Id, data) {

      let PetFormat = {
        ...data,
        Medicamentos: data.Medicamentos.map((item) => {
          return ObjectId(item)
        }),
        Id_Cliente: ObjectId(data.Id_Cliente)
      }

      return this.connect().then((db) => {
        return db.collection('Mascotas').updateOne({_id: ObjectId(Id)}, {$set: {...PetFormat}});
      });
    }

    /** D */
    async deletePet(Id) {
      return this.connect().then((db) => {
        return db.collection('Mascotas').deleteOne({_id: ObjectId(Id)});
      });
    }

}

module.exports = Pets;