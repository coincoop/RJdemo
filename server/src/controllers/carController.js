const CarModel = require("../models/carModel");
const asyncHandle = require("express-async-handler");
require("dotenv").config();

const createCar = asyncHandle(async (req, res) => {
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

  const existingHouse = await CarModel.findOne({
    $or: [{ name: name }, { item_no: item_no }],
  });

  if (existingHouse) {
    res.status(401);
    throw new Error(`Nhà đã tồn tại!`);
  }

  const newCar = new HouseModel({
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
  await newCar.save();
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

const getAllCar = asyncHandle(async (req, res) => {
  const cars = await CarModel.find();
  res.status(200).json(cars);
})

const getCarByName = asyncHandle(async (req, res) => {
  const cars = await CarModel.find({ name: req.params.name });
  if (!cars) {
    res.status(404);
    throw new Error("Không tìm thấy xe nào!");
  }
  res.status(200).json(cars);
})

module.exports = { createCar, getAllCar };
