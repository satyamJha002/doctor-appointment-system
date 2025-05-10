const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Mongo URI environment variable is not defined");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb is successfully connected`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
