const ProductModel = require("../models/productModel");
const asyncHandle = require("express-async-handler");
require("dotenv").config();

const createProduct = asyncHandle(async (req, res) => {
  const {
    description,
    price,
    name,
    item_no,
    scale,
    marque,
    img,
    img_more,
    status,
  } = req.body;

  const existingProduct = await ProductModel.findOne({
    $or: [{ name: name }, { item_no: item_no }],
  });

  if (existingProduct) {
    res.status(401);
    throw new Error(`Sản phẩm đã tồn tại!`);
  }

  const newProduct = new ProductModel({
    description,
    price,
    name,
    item_no,
    scale,
    marque,
    img,
    img_more,
    status,
  });
  await newProduct.save();
  res.status(200).json({
    mess: "Tạo mới thành công !",
    id: newCar.id,
    description: newCar.description,
    price: newCar.price,
    name: newCar.name,
    item_no: newCar.item_no,
    scale: newCar.scale,
    marque: newCar.marque,
    img: newCar.images,
    img_more: newCar.images_more,
    status: newCar.status,
  });
});

const getAllProduct = asyncHandle(async (req, res) => {
  const prods = await ProductModel.find();
  res.status(200).json(prods);
})

const getProductById = asyncHandle(async (req, res) => {
  const prods = await ProductModel.findById({ _id: req.params._id });
  if (!prods) {
    res.status(404);
    throw new Error("Không tìm thấy xe nào!");
  }
  res.status(200).json(prods);
})

module.exports = { createProduct, getAllProduct, getProductById };
