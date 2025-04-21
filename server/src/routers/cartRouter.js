const Router = require('express')
const { getCartByUserId, updateCartItemQuantity, removeCartItem, addToCart} = require('../controllers/cartController')

const cartRouter =Router();

cartRouter.post('/create-cart',addToCart )
cartRouter.post('/get-cart-by-id_user', getCartByUserId)
cartRouter.post('/update-cart', updateCartItemQuantity)
cartRouter.delete('/delete-cart', removeCartItem)


module.exports = cartRouter