const mongoose = require("mongoose");

const connect = () => {
    // Mongoose connection
    mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Database connected.");
    });
};

module.exports = connect;
