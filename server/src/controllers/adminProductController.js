const UserModel = require("../models/userModel");
const asyncHandle = require("express-async-handler");
const ProductModel = require("../models/productModel")

const getAllProduct = asyncHandle(async(req, res)=>{
    try {
        const all_product = await ProductModel.find()
        res.status(200).json({
            mess: 'Lấy dữ liệu thành công',
            all_product
        })
    } catch (error) {
        res.status(500).json({mess: `Lỗi ${error}`})
    }
})

module.exports ={getAllProduct}