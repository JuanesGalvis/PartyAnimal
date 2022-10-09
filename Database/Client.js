const { ObjectId } = require('mongodb');
const MongoDB = require('./Mongo');

class Clients extends MongoDB {

    constructor() {
        super();
      }
    
    /** C */
    async createClient(data) {
      return this.connect().then((db) => {
        return db.collection('Clientes').insertOne(data);
      });
    }

    /** R - ALL */
    async getAllClients() {
      return this.connect().then((db) => {
        return db.collection('Clientes').find().toArray();
      });
    }
    
    /** R - ONE */
    async getOneClient(Id) {
      return this.connect().then((db) => {
        return db.collection('Clientes').findOne({_id: ObjectId(Id)});
      });
    }

    /** U */
    async updateClient(Id, data) {
      return this.connect().then((db) => {
        return db.collection('Clientes').updateOne({_id: ObjectId(Id)}, {$set: {...data}});
      });
    }

    /** D */
    async deleteClient(Id) {
      return this.connect().then((db) => {
        return db.collection('Clientes').deleteOne({_id: ObjectId(Id)});
      });
    }

    async getReportClient(IdClient) {
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

  async getReportAll() {
    let pipeline = [
      {
        '$lookup': {
          'from': 'Medicamentos', 
          'localField': 'Medicamentos', 
          'foreignField': '_id', 
          'as': 'Medicamentos'
        }
      }, {
        '$lookup': {
          'from': 'Clientes', 
          'localField': 'Id_Cliente', 
          'foreignField': '_id', 
          'as': 'Id_Cliente'
        }
      }
    ];

    return this.connect().then((db) => {
      return db.collection('Mascotas').aggregate(pipeline).toArray();
    });

  }
}

module.exports = Clients;