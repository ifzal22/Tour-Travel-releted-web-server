const express = require("express");
const cors = require("cors");

const { MongoClient } = require('mongodb');
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
    }
    finally{
        await client.close();
    }
    }
    
    run().catch(console.dir);

app.listen(port, () =>{
    console.log("Running server port");
});

