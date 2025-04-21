const { CartModel, CartItemModel } = require("../models/cartModel"); // Import cả hai model
const ProductModel = require("../models/productModel");
const UserModel = require("../models/userModel");
const asyncHandle = require("express-async-handler");
const { Server } = require("socket.io");
require("dotenv").config();

// --- BEGIN: Helper function để lấy cart items và emit ---
const getCartItemsAndEmit = async (io, id_user) => {
  try {
    // Tìm cart chính (không cần thiết nếu chỉ cần items, nhưng có thể hữu ích)
    const cart = await CartModel.findOne({ id_user });
    if (!cart) {
      // Nếu không có cart, emit mảng rỗng
      if (io) io.emit("cartUpdated", { id_user, cart: null, items: [] });
      return { cart: null, items: [] }; // Trả về để hàm gọi có thể sử dụng
    }

    // Tìm tất cả cart items liên quan và populate sản phẩm
    const items = await CartItemModel.find({ id_cart: cart._id }).populate(
      "id_product"
    ); // Populate để lấy thông tin sản phẩm

    // Emit dữ liệu mới nhất qua Socket.IO
    if (io) {
      // console.log(`Emitting cartUpdated for user ${id_user} with ${items.length} items`); // Debug log
      io.emit("cartUpdated", { id_user, cart, items });
    }
    return { cart, items }; // Trả về để hàm gọi có thể sử dụng
  } catch (error) {
    console.error(
      `Error fetching/emitting cart items for user ${id_user}:`,
      error
    );
    // Trong trường hợp lỗi, có thể emit trạng thái lỗi hoặc mảng rỗng
    if (io)
      io.emit("cartUpdated", {
        id_user,
        cart: null,
        items: [],
        error: "Failed to fetch cart items",
      });
    return { cart: null, items: [] }; // Trả về rỗng nếu lỗi
  }
};
// --- END: Helper function ---

const addToCart = asyncHandle(async (req, res) => {
  try {
    const { id_user, products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Products array is required and cannot be empty." });
    }

    const user = await UserModel.findById(id_user);
    if (!user) {
      return res.status(404).json({ message: `Người dùng không tồn tại` });
    }

    // 1. Tìm hoặc tạo Cart chính cho user
    let cart = await CartModel.findOne({ id_user });
    if (!cart) {
      cart = new CartModel({ id_user });
      await cart.save();
      console.log(`Created new cart for user ${id_user}`); // Debug log
    } else {
      console.log(`Found existing cart for user ${id_user}`); // Debug log
    }
    const id_cart = cart._id;

    const updatedItemsInfo = [];

    for (const productInfo of products) {
      const { id_product, quantity } = productInfo;

      if (!id_product || quantity == null || quantity <= 0) {
        console.warn(
          `Skipping invalid product data: ${JSON.stringify(productInfo)}`
        );
        continue;
      }

      const productData = await ProductModel.findById(id_product);
      if (!productData) {
        console.warn(`Product with id ${id_product} not found. Skipping.`);
        continue;
      }
      const price = productData.price;
      const totalPrice = price * quantity;

      let cartItem = await CartItemModel.findOne({ id_cart, id_product });

      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();

        updatedItemsInfo.push({
          id: cartItem._id,
          quantity: cartItem.quantity,
          price: price,
        });
      } else {
        cartItem = new CartItemModel({ id_cart, id_product, quantity, price });
        await cartItem.save();

        updatedItemsInfo.push({
          id: cartItem._id,
          quantity: cartItem.quantity,
          price: price,
        });
      }
    }

    // --- BEGIN: Gọi helper function để lấy và emit ---
    // Truyền req.io vào helper function
    const { items: updatedItems } = await getCartItemsAndEmit(req.io, id_user);
    // --- END: Gọi helper function ---

    res.status(200).json({
      mess: "Cập nhật giỏ hàng thành công",
      items: updatedItems,
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

const getCartByUserId = asyncHandle(async (req, res) => {
  const id_user = req.params.userId || req.query.userId || req.body.id_user;

  if (!id_user) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const { cart, items } = await getCartItemsAndEmit(null, id_user);

    if (!cart && items.length === 0) {
      return res.status(200).json({
        mess: "Giỏ hàng trống",
        cart: null,
        items: [],
      });
    }

    res.status(200).json({ cart, items });
  } catch (error) {
    console.error("Error in getCartByUserId:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

const updateCartItemQuantity = asyncHandle(async (req, res) => {
  const { id_user, id_item, quantity } = req.body;

  if (!id_user || !id_item || quantity == null || quantity < 0) {
    return res.status(400).json({
      message: "User ID, Item ID, and non-negative quantity are required.",
    });
  }

  try {
    const cart = await CartModel.findOne({ id_user });
    if (!cart) {
      return res.status(404).json({ message: "Cart không tồn tại" });
    }

    const cartItem = await CartItemModel.findOne({
      id_product: id_item,
      id_cart: cart._id,
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Cart item không tồn tại trong giỏ hàng này" });
    }

    if (quantity === 0) {
      await CartItemModel.deleteOne({ _id: id_item });
    } else {
      cartItem.quantity = quantity;
      await cartItem.save();
    }

    const { items: updatedItems } = await getCartItemsAndEmit(req.io, id_user);

    res.status(200).json({
      mess:
        quantity === 0
          ? "Xóa sản phẩm khỏi giỏ hàng thành công"
          : "Cập nhật số lượng thành công",
      items: updatedItems,
    });
  } catch (error) {
    console.error("Error in updateCartItemQuantity:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

const removeCartItem = asyncHandle(async (req, res) => {
  const { id_user, id_item } = req.body;

  if (!id_user) {
    return res.status(400).json({ message: "id_user không hợp lệ" });
  }
  if (!id_item || (Array.isArray(id_item) && id_item.length === 0)) {
    return res
      .status(400)
      .json({ message: "id_item không hợp lệ" });
  }

  let productsToRemove = [];
  if (Array.isArray(id_item)) {
    productsToRemove = id_item;
  } else if (typeof id_item === 'string') {
    productsToRemove = [id_item]; 
  } else {
    return res.status(400).json({ message: "Không đúng định dạng của id_item" });
  }

  productsToRemove = productsToRemove.filter(id => id && typeof id === 'string');
  if (productsToRemove.length === 0) {
     return res.status(400).json({ message: "Định dạng sai" });
  }

  try {
    const cart = await CartModel.findOne({ id_user });
    if (!cart) {
      return res.status(404).json({ message: "Cart không tồn tại" });
    }

    const result = await CartItemModel.deleteMany({
      id_product: { $in: productsToRemove }, 
      id_cart: cart._id,                 
    });

    if (result.deletedCount === 0) {
      console.log(
        `No cart items found for user ${id_user} with productIds: ${productsToRemove.join(", ")}`
      );

    } else {
      console.log(
        `Deleted ${result.deletedCount} cart items for user ${id_user} related to productIds: ${productsToRemove.join(", ")}`
      );
    }

    const { items: updatedItems } = await getCartItemsAndEmit(req.io, id_user);

    res.status(200).json({
      mess: `Đã xóa ${result.deletedCount} mục sản phẩm khỏi giỏ hàng.`,
      items: updatedItems,
    });

  } catch (error) {
    console.error("Error in removeProductFromCart:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
});

module.exports = {
  addToCart,
  getCartByUserId,
  updateCartItemQuantity,
  removeCartItem,
};
