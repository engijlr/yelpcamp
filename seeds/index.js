const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dwpnn6rxt/image/upload/v1667245312/YelpCamp/wcbks7ks9246vd6otnqk.jpg",
          filename: "YelpCamp/wcbks7ks9246vd6otnqk",
        },
        {
          url: "https://res.cloudinary.com/dwpnn6rxt/image/upload/v1667245313/YelpCamp/zpvbtdmilfsx0nombaqp.jpg",
          filename: "YelpCamp/zpvbtdmilfsx0nombaqp",
        },
      ],
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      author: "635bc4f4bcb5a53f2d3f524c",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse dolores facilis doloremque, sit reprehenderit magni ut pariatur illum aspernatur odio fuga optio sint voluptatibus quisquam quos exercitationem animi corrupti ipsum.",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
