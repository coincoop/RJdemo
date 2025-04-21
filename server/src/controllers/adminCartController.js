const asyncHandle = require("express-async-handler");
const {CartModel} = require("../models/cartModel")

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

module.exports= {getAllCarts}