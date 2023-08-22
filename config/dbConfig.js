const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then(res => {
    console.log("MongoDB connected successfully")
}).catch(error => {
    console.log("Error while connecting to MongoDB", error);
})

module.exports = mongoose;