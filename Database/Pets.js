const { ObjectId } = require('mongodb');
const MongoDB = require('./Mongo');

class Pets extends MongoDB {

    constructor() {
        super();
    }

    async getPets(IdOwner) {

        return this.connect().then((db) => {
          try {
            return db.collection('Mascotas').find({ Id_Cliente: ObjectId(IdOwner) }).toArray();
          } catch (err) {
            return undefined;
          }
        });
      }

}

module.exports = Pets;