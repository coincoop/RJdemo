const { default: mongoose } = require("mongoose");

const CarSchema = new mongoose.Schema({
  description: {
    type: String,
    require: true,
  },
  name: {
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
  
},
{ timestamps: true } );

const CarModel = mongoose.model("car", CarSchema);
module.exports = CarModel;
