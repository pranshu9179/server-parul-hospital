import mongoose from "mongoose";
import config from "../config/env.config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log("Database is established");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
