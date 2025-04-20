const {default: mongoose} = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    photoUrl: {
        type: String
    },
    role:{
        type: String,
        require: true,
        default: 'user'
    },
},{timestamps: true} ) 

const UserModel = mongoose.model('users',UserSchema)
module.exports = UserModel