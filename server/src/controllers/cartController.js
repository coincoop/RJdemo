const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");
const UserModel = require("../models/userModel");
const asyncHandle = require("express-async-handler");
const { Server } = require("socket.io");
require("dotenv").config();

const emitCartUpdate = (io, id_user, cart) => {
  if (!io) {
    console.error("Socket.IO instance is undefined");
    return;
  }
  io.emit("cartUpdated", { id_user, cart });
};

const createCart = asyncHandle(async (req, res) => {
  try {
    const { id_user, products } = req.body;

    const user = await UserModel.findById(id_user);
    if (!user) {
      res.status(401);
      throw new Error(`Người dùng ko tồn tại`);
    }

    let cart = await CartModel.findOne({ id_user });

    const processProduct = async (product) => {
      const productData = await ProductModel.findById(product.id_product);
      if (!productData) {
        res.status(401);
        throw new Error(`Sản phẩm với id ${product.id_product} không tìm thấy`);
      }

      const price = productData.price;
      const totalPrice = price * product.quantity;

      return {
        id_product: product.id_product,
        quantity: product.quantity,
        price,
        totalPrice,
      };
    };

    if (!cart) {
      const newProducts = await Promise.all(products.map(processProduct));
      const newCart = new CartModel({ id_user, products: newProducts });
      await newCart.save();

      emitCartUpdate(req.io, id_user, newCart);

      return res
        .status(200)
        .json({ mess: "Tạo giỏ hàng thành công", cart: newCart });
    }

    for (const product of products) {
      const existing = cart.products.find(
        (p) => p.id_product.toString() === product.id_product
      );

      if (existing) {
        existing.quantity += product.quantity;
        existing.totalPrice = existing.quantity * existing.price;
      } else {
        const newProduct = await processProduct(product);
        cart.products.push(newProduct);
      }
    }

    await cart.save();

    emitCartUpdate(req.io, id_user, cart);

    res.status(200).json({ mess: "Cập nhật giỏ hàng thành công", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

const getCartByUserId = asyncHandle(async (req, res) => {
  const cart = await CartModel.findOne({ id_user: req.body.id_user }).populate('products.id_product');;
  if (!cart) {
    res.status(200).json({
      mess: "Giỏ hàng trống",
      cart: null,
    });
  }
  res.status(200).json(cart);
});



module.exports = { createCart, getCartByUserId };
