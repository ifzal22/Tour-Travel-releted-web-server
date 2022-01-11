const express = require("express");
const cors = require("cors");

const { MongoClient, OrderedBulkOperation } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pqdph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



const app = express();
const port =  process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get("/",(req, res)=>{
    res.send("HEllow world tour travel website");
});



async function run(){
    try{
    await client.connect();
    console.log('DATABASE CONNECTED SUCCESFULL')

    const database = client.db("Tour-Travel-Database");
    const servicesCollection = database.collection("services");
    const OrderPakayge =  database.collection("orderPackage");
const travelProducts = database.collection("travelProducts");


    
     // GET Single Service
     app.get('/services/:id', async (req, res) => {
        const id = req.params.id;
        console.log('getting specific service', id);
        const query = { _id: ObjectId(id) };
        const service = await servicesCollection.findOne(query);
        res.json(service);
    })

// GET API
app.get('/services', async(req,res) =>{
   
    const cursor = servicesCollection.find({});
    const services = await cursor.toArray();
    // console.log(services)
    res.send(services);
  })


//   TravelProducts


app.get('/travelProducts', async(req,res) =>{
   
    const cursor = servicesCollection.find({});
    const services = await cursor.toArray();
    // console.log(services)
    res.send(services);
  })





//   ORDER POST

app.post("/orders", async (req, res) => {
    const order = req.body;
    // console.log(order)
    const result = await OrderPakayge.insertOne(order);
    console.log(result)
    res.json(result);
});

// MY ORDERS
/* 
app.get('/myOrder/:email', async(req,res) =>{
   
    const cursor = OrderPakayge.find({email: req.params.email});
    const result = await cursor.toArray();
    console.log(result)
    res.send(result);
  }) */


  app.get("/myOrder/:email", async (req, res) => {
    const result = await OrderPakayge.find({ email: req.params.email }).toArray();
    console.log(result)
    res.json(result);
});




// ALL ORDER GET

 
  app.get("/allOrders", async (req, res) => {
    const result = await OrderPakayge.find({}).toArray();
    // console.log(result);
    res.json(result);
});

//    POST API
app.post('/services', async(req, res)=>{
    const service = req.body;
//    console.log('hit the post api', service);
  
  
  const result = await servicesCollection.insertOne(service)
  console.log(result);
  res.json(result)
  })
    
// DELETED ORDER


app.delete("/deleteOrder/:id", async (req, res) => {
    const result = await OrderPakayge.deleteOne({
        _id: ObjectId(req.params.id),
    });
    console.log(result)
    res.json(result);
});


// Updated products

/* app.put("/CnfirmOrder/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const filter = {_id: ObjectId(id)};
    const result = await OrderPakayge.updateOne(filter,{ 
   
        $set:{
            status:"Confirmed",
        },
      
    });

    console.log(result)
    res.json(result);
});
 */


 //  update products
 app.put("/CnfirmOrder/:id", async (req, res) => {
    const id = req.params.id;
    console.log('id ',id)
    const filter = { _id: ObjectId(id) };
    const result = await OrderPakayge.updateOne(filter, {
        $set: {
            status: "Confirmed",
        },
    });
    res.json(result);
});





// MY Order Deleted

/* app.delete("deleteMyOrder/:id",async(req,res)=>{
    const result = await OrderPakayge.deleteOne({
        _id: ObjectId(req.params.id),
    });
    console.log(result)
    res.json(result);
}) */


    }
    finally{
        // await client.close();
    }
    }
    
    run().catch(console.dir);

app.listen(port, () =>{
    console.log("Running server port");
});

