import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt";

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
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new user", { status: 500 });
  }
};
