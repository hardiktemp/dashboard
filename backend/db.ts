import mongoose from "mongoose";
import dotenv from "dotenv";
import { date, number } from "zod";

dotenv.config();

const MONGO_URI  : string = process.env.MONGO_URI as string;
// console.log(MONGO_URI);

const connectDB = async () => {
    try {
      await mongoose.connect(
        MONGO_URI
      );
      console.log("MongoDB connection SUCCESS");
    } catch (error) {
      console.error("MongoDB connection FAIL", error);
      process.exit(1);
    }
  };

connectDB();

const userLoginsMongo = new mongoose.Schema({
    time : Date,
    phone : String
});




export const UserLogin = mongoose.model('UserLogin', userLoginsMongo);