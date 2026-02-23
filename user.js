const { json } = require("express");
const { MongoClient } = require("mongodb");


class user {
  constructor() {
    this.url = "mongodb://localhost:27017";
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
    const collection = db.collection("Users");
    return db;
  }
  async insertuser(newuser) {
    let check = await this.checkuser(newuser.username, newuser.email);
    //console.log(check)
    if (check.length > 0) {
      return -1;
    } else {
      const db = await this.Connect();
      //console.log('connected')
      await db.collection("Users").insertOne(newuser, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(result)
        }
        //this.Close()
        //this.Close()
      });
      this.Close();
      return 1;
    }
  }

  async checkuser(username, email) {
    const db = await this.Connect();
    const collection = db.collection("Users");
    // console.log('connected')
    var finds = await collection
      .find({ username: username, email: email })
      .toArray();
    // console.log(finds);
    //this.Close()
    this.Close();
    return finds;
  }
}
module.exports =user
