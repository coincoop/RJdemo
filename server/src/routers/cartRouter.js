const Router = require('express')
const {createCart, getCartByUserId, updateCart} = require('../controllers/cartController')

const cartRouter =Router();

cartRouter.post('/create-cart',createCart )
cartRouter.post('/get-cart-by-id_user', getCartByUserId)
cartRouter.post('/update-cart', updateCart)

module.exports = cartRouter