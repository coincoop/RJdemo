const { default: mongoose } = require("mongoose");

const CartSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true,
  },
  products: [
    {
      id_product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cars',//đổi lại sau 
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number, 
        required: true,
      },
    },
  ],
}, {
  timestamps: true,
});

const CartModel = mongoose.model("carts", CartSchema);
module.exports = CartModel;
