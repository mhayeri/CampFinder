const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const connect = require("../utils/ConnectMongoose");
const Campground = require("../models/campground");

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
                    url: "https://res.cloudinary.com/de0zlwer9/image/upload/v1706216946/Yelp/lcj7xoppxiqyixzw8ybi.jpg",
                    filename: "Yelp/lcj7xoppxiqyixzw8ybi",
                },
                {
                    url: "https://res.cloudinary.com/de0zlwer9/image/upload/v1706216928/Yelp/czoskgt5ybxrkccddld7.jpg",
                    filename: "Yelp/czoskgt5ybxrkccddld7",
                },
                {
                    url: "https://res.cloudinary.com/de0zlwer9/image/upload/v1706216904/Yelp/j19kugctfnrumxvs7sel.jpg",
                    filename: "Yelp/j19kugctfnrumxvs7sel",
                },
                {
                    url: "https://res.cloudinary.com/de0zlwer9/image/upload/v1706216889/Yelp/eeerizcm47ckcvepkpbf.jpg",
                    filename: "Yelp/eeerizcm47ckcvepkpbf",
                },
                {
                    url: "https://res.cloudinary.com/de0zlwer9/image/upload/v1706216837/Yelp/oicn9z6mwl8uhfg1qkkh.jpg",
                    filename: "Yelp/oicn9z6mwl8uhfg1qkkh",
                },
            ],
        });
        await camp.save();
    }
};

seedDB();
