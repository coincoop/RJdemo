const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  item_no: {
    type: String,
    require: true,
  },
  scale: {
    type: String,
    require: true,
  },
  marque: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  img_more: {
    type: [String],
    require: true,
  },
  
},
{ timestamps: true } );
//chuyển car thành product sau này
const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
