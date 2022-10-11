const { MongoClient, ServerApiVersion, ObjectId,  } = require('mongodb');

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASW}@${process.env.DATABASE_NAME}.8t4t4k6.mongodb.net/?retryWrites=true&w=majority`;

const { CustomerMongoSchema } = require('./Models/Customer.schema');
const { PetMongoSchema } = require('./Models/Pet.schema');
const { MedicineMongoSchema } = require('./Models/Medicine.schema');

class MongoDB {
  
  // Generar el cliente de MongoDB para aplicar el patrón Singleton
  constructor() {
    
    this.client = new MongoClient(uri, 
        { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    
    // Nombre base de datos
    this.name = 'dataAnimals';
  }

  connect() {

    // Validar si hay creada una conexión o es necesario crear una (Singleton)
    if (!this.connection) {

      this.connection = new Promise((resolve, reject)=>{
        this.client.connect(err => {
          if (err) {
            reject(err);
          }
          console.log('Base de datos conectada correctamente');
          resolve(this.client.db(this.name));
        });
      })
    }
    return this.connection;
  }

  /** METODOS */

  async CreateCollections () {
    
    return this.connect().then((db) => {

      

      
      db.createCollection("Mascotas", PetMongoSchema);
      db.createCollection("Medicamentos", MedicineMongoSchema);
      
    });
  }

  /** BACKUP - EXCEL */
  async dataExcel(data, collection) {
    return this.connect().then(async (db) => {

      let Collections = await db.listCollections().toArray();
      Collections = Collections.map((item) => {
        return item.name;
      })

      if (Collections.includes(collection)) {
        await db.dropCollection(collection);
      }

      // switch (collection) {
      //   case "Clientes":
      //     await db.createCollection(collection, CustomerMongoSchema);
      //     break;
      //   case "Mascotas":
      //     await db.createCollection(collection, PetMongoSchema);
      //     break;
      //   case "Medicamentos":
      //     await db.createCollection(collection, MedicineMongoSchema);
      //     break;
      // }
      
      return db.collection(collection).insertMany([...data]);

    });

  }
}

module.exports = MongoDB;