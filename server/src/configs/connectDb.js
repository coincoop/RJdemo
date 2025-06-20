require('dotenv').config()
const {mongoose, connect} = require('mongoose')

const dbUrl =`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}${process.env.DATABASE_URL}`

const connectDB = async()=>{
    try {
        const connection =await mongoose.connect(dbUrl)
        console.log(`Connect to mongodb successfully!!!`);
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}


module.exports = connectDB