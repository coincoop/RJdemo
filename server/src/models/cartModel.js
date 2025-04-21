const { default: mongoose } = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const CartItemSchema = new mongoose.Schema(
  {
    id_cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts", 
      required: true,
    },
    id_product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products", 
      required: true,
    },
    quantity: {
      type: Number,
      required: true, 
      default: 1,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CartModel = mongoose.model("carts", CartSchema);
const CartItemModel = mongoose.model("cart_items", CartItemSchema);
module.exports = { CartModel, CartItemModel }; 
