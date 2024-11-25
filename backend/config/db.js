const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb://localhost:27017/');
        console.log("Databse is connected")
    } catch (error) {
        console.log(error.message)
    }
} 

module.exports = connectDB