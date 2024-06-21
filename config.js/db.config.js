const mongoose = require('mongoose');
const colors = require('colors'); // Require the colors package

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.error(`Error: ${error.message}`.red);
        process.exit(1);
    }
};

module.exports = connectDB;
