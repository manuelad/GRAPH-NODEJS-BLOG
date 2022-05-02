const mongoose = require('mongoose');


async function connectDB() {
    await mongoose.connect('mongodb://127.0.0.1/blogdb');
    console.log('mongodb connected');
}

module.exports = {
    connectDB
};