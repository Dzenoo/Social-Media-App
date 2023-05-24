import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Could not connect with mongodb", { status: 500 });
  }

  const { first_name, last_name, email, biography, password } =
    await request.json();

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return new Response("Could not find user", { status: 404 });
  }

  if (existingUser) {
    return new Response("User already exist with this email", { status: 500 });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return new Response("Could not hash password", { status: 500 });
  }

  const newUser = new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    biography: biography,
    password: hashedPassword,
    image:
      "https://res.cloudinary.com/dzwb60tk1/image/upload/v1678535834/Untitled_design_3_zbm2cx.png",
  });

  let user;
  try {
    user = await newUser.save();
  } catch (error) {
    return new Response("Failed to create a new user", { status: 500 });
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "2h",
      }
    );
  } catch (error) {
    return new Response("Failed to sign up", { status: 500 });
  }

  const userInfo = {
    token: token,
    firstname: newUser.first_name,
    lastname: newUser.last_name,
    image: newUser.image,
  };

  return new Response(JSON.stringify(userInfo), {
    status: 201,
  });
};
