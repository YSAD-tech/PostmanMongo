const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const holder = require ('./routes/holders')
const Entry = require ('./routes/Entrys')
const Laptops = require ('./routes/Laptops')

const app=express()
app.use(express.json())
app.use("/api/holder",holder)
app.use("/api/entry", Entry)
app.use("/api/laptop", Laptops)

app.listen(process.env.PORT,()=>{
    console.log('Servidor escuchando en el puerto' + process.env.PORT);
    mongoose.connect(process.env.CNX_MONGO)
    .then(()=> console.log('conected!'))
    .catch((error)=> console.log(error))
})