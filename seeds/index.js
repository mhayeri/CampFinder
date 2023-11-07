const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const { connect } = require("../utils/ConnectMongoose");
const Campground = require("../models/campground");

const collection = 483251;

connect();

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "64ff5483616f1f196297609b",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum in fuga distinctio, consequatur laudantium officia perspiciatis, vitae repudiandae delectus excepturi quibusdam? Aliquam, laboriosam, quam, delectus ipsam id distinctio placeat fugit corporis dolores modi perspiciatis quasi.",
            price,
            images: [
                {
                    url: "https://res.cloudinary.com/de0zlwer9/image/upload/v1694563350/Yelp/ygwntzj3aag6civ0iqyz.png",
                    filename: "Yelp/ygwntzj3aag6civ0iqyz",
                },
                {
                    url: "https://res.cloudinary.com/de0zlwer9/image/upload/v1694563649/Yelp/rrpdiqei8aerjqql0gpy.png",
                    filename: "Yelp/rrpdiqei8aerjqql0gpy",
                },
            ],
        });
        await camp.save();
    }
};

seedDB();
