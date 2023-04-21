const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ukvbsyz.mongodb.net/mern-auth?retryWrites=true&w=majority`

async function connectToDB() {
    mongoose.set("strictQuery", true);
    const res = await mongoose.connect(url);
    console.log('DB: Connected');
    return res;
}

module.exports = connectToDB;