const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const Product = require('./models/prduct.model')
const authRoutes = require('./routes/auth.routes')
const productRoute = require('./routes/product.routes')
const app = express()
const PORT = process.env.PORT || 3000

//middleware
dotenv.config();
app.use(express.json())

//routes
app.use('/auth', authRoutes);
app.use("/api/products", productRoute)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("connected to database!")
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}).catch(() => {
    console.log("connection failed!")
})









//mongoDB ID: tanmayadash97
//password: wFdGfWtOlJmVeIer