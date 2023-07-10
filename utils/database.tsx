import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "networkly-prod",
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
