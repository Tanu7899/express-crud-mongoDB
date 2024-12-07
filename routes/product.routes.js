const express = require('express')
const authenticate = require('../middleware/authenticate')
const {getProducts,getOneProduct,addProduct,updateProduct,deleteProduct} = require("../controllers/product.controller")

const router = express.Router()

router.get('/', authenticate, getProducts)

router.get('/:id', authenticate, getOneProduct)

router.post('/', authenticate, addProduct)

router.put('/:id', authenticate, updateProduct)

router.delete('/:id', authenticate, deleteProduct)


module.exports = router