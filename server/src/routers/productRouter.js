const Router = require('express')
const {createProduct, getAllProduct, getProductById, getProductByBrand} = require('../controllers/productController')

const productRouter =Router();

productRouter.post('/create-product',createProduct )
productRouter.get('/get-all-product',getAllProduct)
productRouter.get('/get-product/:_id',getProductById)
productRouter.get('/get-product-by-brand/:marque',getProductByBrand)

module.exports = productRouter