const express = require('express')
const { body, validationResult } = require('express-validator');
const {adminAuthenticate, combinedAuthenticate} = require('../middleware/authenticate')
const {getProducts,getOneProduct,addProduct,updateProduct,deleteProduct} = require("../controllers/product.controller")

const router = express.Router()

router.get('/', combinedAuthenticate, getProducts)

router.get('/:id', combinedAuthenticate, getOneProduct)

router.post('/', adminAuthenticate, addProduct)

router.put('/:id', adminAuthenticate, updateProduct)

router.delete('/:id', adminAuthenticate, deleteProduct)


module.exports = router