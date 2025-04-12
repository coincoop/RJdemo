const Router = require('express')
const {createProduct, getAllProduct, getProductById} = require('../controllers/productController')

const productRouter =Router();

productRouter.post('/create-product',createProduct )
productRouter.get('/get-all-product',getAllProduct)
productRouter.get('/get-product/:_id',getProductById)

module.exports = productRouter