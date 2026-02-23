const productcontrol = require("./productcontrol");
const puser = require("./user");
const express = require("express");
const app = express();
const cors = require("cors");
const pcontrol = new productcontrol();
const user = new puser();
const valeditor = require("validator");
const bcrypt = require("bcrypt");

// pcontrol.Connect()
// .then(console.log)
// .catch(console.error)
//.finally(()=>pcontrol.Close())

//  var prd ={_id:2,name:'smartWatch',price:30,quantity:4}
//  pcontrol.insersProduct(prd)
//.finally(()=>{ pcontrol.Close()})

// pcontrol.getAllProductById(1)

//pcontrol.getAllProduct()

//pcontrol.removeprodect('smartWatch',30)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*", method: "*" }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});
app.post("/registar", async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    const newuser = {
      username: username,
      email: email,
      password: hashpassword,
      phone: phone,
    };

    user.insertuser(newuser).then((data) => {
      if (data == 1) {
        res.status(201).send("sucuss");
      } else {
        res.status(400).send("woring");
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
app.post('/login', async (req,res)=>{
  try{
   const { username, email, password, phone } = req.body;
   // const hashpassword = await bcrypt.hash(password, 10);
    user.checkuser(username,email).then(async (data)=>{
      if(data.length==1){
   const match=await bcrypt.compare(password,data[0].password)
   if(match){
    res.send('successfully login...')
   }else{
    res.send('woring password')
   }
  }else{
    res.send('woring username or password')
  }
   })
  }catch(err){
    res.status(500).send({message:err.message})
  }
})

app.get("/getprodect", (req, res) => {
  pcontrol.getAllProduct().then((data) => {
    res.status(200).send(data);
  });
  // res.end()
});
app.get("/prodects/:id", (req, res) => {
  const id = req.params.id;
  pcontrol.getAllProductById(id).then((data) => {
    res.status(200).send(data);
  });
  // res.end()
});
app.post("/add", (req, res) => {
  const prd = req.body;
  pcontrol.insersProduct(prd).then((data) => {
    res.status(200).send(data);
  });
});
app.delete('/delet',(req, res) => {
  const prd = req.body;
  pcontrol.removeprodect(prd).then((data) => {
    res.status(200).send(data);
  });
});

app.listen(2000, () => {});
