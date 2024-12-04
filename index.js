const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/prduct.model')
const productRoute = require('./routes/product.routes')
const app = express()

//middleware
app.use(express.json())

//routes
app.use("/api/products", productRoute)

mongoose.connect("mongodb+srv://tanmayadash97:wFdGfWtOlJmVeIer@backenddb.m3mwo.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("connected to database!")
    app.listen(3000, () => {
        console.log("Server running on port 3000")
    })
})
.catch(() => {
    console.log("connection failed!")
})









//mongoDB ID: tanmayadash97
//password: wFdGfWtOlJmVeIer