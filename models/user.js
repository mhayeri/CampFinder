const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email field is required."],
        unique: true,
    },
});

// Adds in the username, password fields to the schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
