const { default: mongoose } = require("mongoose");

const MarqueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
    
},{ timestamps: true } );
 
const MarqueModel = mongoose.model("marques", MarqueSchema);
module.exports = MarqueModel;