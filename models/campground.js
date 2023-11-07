const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const ImageSchema = new Schema({
    url: String,
    filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200");
});

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

const Campground = mongoose.model("Campground", CampgroundSchema);

CampgroundSchema.post("findOneAndDelete", async function (document) {
    if (document) {
        await Review.deleteMany({
            _id: {
                $in: document.reviews,
            },
        });
    }
});

module.exports = Campground;
