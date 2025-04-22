const asyncHandle = require("express-async-handler");
const {CartModel, CartItemModel} = require("../models/cartModel")

const getAllCarts = asyncHandle(async(req, res)=>{
    try {
        const all_cart = await CartModel.find()
        res.status(200).json({
            mess: 'Lấy dữ liệu thành công',
            all_cart
        })
    } catch (error) {
        res.status(500).json({mess: `Lỗi ${error}`})        
    }
})

const getCartItem = asyncHandle(async(req, res)=>{
    try {
        const all_cart_item = await CartItemModel.find().populate('id_product')
        res.status(200).json({
            mess: 'Lấy dữ liệu thành công',
            all_cart_item 
        })
    } catch (error) {
        res.status(500).json({mess: `Lỗi ${error}`})
    }
})

module.exports= {getAllCarts, getCartItem}