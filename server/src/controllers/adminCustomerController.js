const UserModel = require("../models/userModel");
const asyncHandle = require("express-async-handler");

const getAllUser = asyncHandle(async (req, res) => {
  try {
    const all_user = await UserModel.find();
    res.status(200).json({
      mess: "Lấy duwxl iệu khách hàng thành công",
      all_user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = { getAllUser };
