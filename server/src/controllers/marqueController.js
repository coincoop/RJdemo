const MarqueModel = require("../models/marqueModel");
const asyncHandle = require("express-async-handler");

const createMarque = asyncHandle(async (req, res) => {
  const { name, slug, logo, url } = req.body;

  const existingMarque = await MarqueModel.findOne({
    $or: [{ name: name }, { slug: slug }],
  });
  if (existingMarque) {
    res.status(401);
    throw new Error(`Thương hiệu đã tồn tại!`);
  }

  const newMarque = new MarqueModel({
    name,
    slug,
    logo,
    url,
  });
  await newMarque.save();
  res.status(200).json({
    mess: "Tạo mới thành công !",
    name: newMarque.name,
    slug: newMarque.slug,
    logo: newMarque.logo,
    url: newMarque.url,
  });
});

const getAllMarque = asyncHandle(async (req, res) => {
  try {
    const allMarque = await MarqueModel.find({});
    res.status(200).json({
      mess: "Lấy tất cả thương hiệu thành công !",
      allMarque,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = { createMarque, getAllMarque };
