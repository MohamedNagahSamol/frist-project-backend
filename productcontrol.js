const { json } = require("express");
const { MongoClient } = require("mongodb");


class productcontrol {
  constructor() {
    this.url = "mongodb://localhost:27017/simpleShope";
    // Database Name
    this.dbName = "simpleShope";
  }
 async Close() {
   await this.client.close();
  }
  async Connect() {
    this.client = new MongoClient(this.url);
  
    await this.client.connect();
   // console.log("Connected successfully to server");
    const db = this.client.db(this.dbName);
    const collection = db.collection("prodect");
    //console.log(db)
    return db;
  }
  async insersProduct(newProdect) {
    const db = await this.Connect();
    //console.log('connected')
   await db.collection("prodect").insertOne(newProdect, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result)
      }
      //this.Close()
      //this.Close()
    });
    this.Close()
  }
  async getAllProduct() {
    const db = await this.Connect();
    const collection = db.collection("prodect");
    // console.log('connected')
    let finds = await collection.find().toArray();
   // console.log(finds);
    //this.Close()
    this.Close()
    //return finds
    return finds;
  }
    async getAllProductById(id) {
    const db = await this.Connect();
    const collection = db.collection("prodect");
    // console.log('connected')
    var finds = await collection.find({_id:id}).toArray();
   // console.log(finds);
    //this.Close()
    this.Close()
    return finds
    }
    async removeprodect(prodect){
    const db = await this.Connect();
    const collection = db.collection("prodect");;
    var rem= await collection.deleteOne({_id:prodect._id})
    // console.log(rem);
     this.Close()
     return rem
    }
  
}

module.exports = productcontrol;
