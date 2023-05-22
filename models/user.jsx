import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "First name is required!"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required!"],
  },
  email: {
    type: String,
    unique: [true, "Email already exist!"],
    required: [true, "Email is required!"],
  },
  biography: {
    type: String,
  },
  password: {
    type: String,
  },
  image: { type: String },
});

const User = models.User || model("User", UserSchema);

export default User;
