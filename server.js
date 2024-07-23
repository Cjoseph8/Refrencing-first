require("dotenv").config();
const express = require('express');
const mongoose =require('mongoose');
const router= require('./Router/router')


const app = express();
app.use(express.json());
app.use("/api/v1/",router)

const ports = process.env.port

app.listen(ports,()=>{
    console.log(`App is listening to ${ports}`)
});

mongoose.connect(process.env.DataBase)
.then(()=>{
    console.log('Server is connected to DATABASE Successfully..')
    })
.catch((err)=>{
    console.log('Error connecting to DATABASE..' +err)
})