import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Could not connect with mongodb", 500);
  }

  const { email, password } = await request.json();

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return new Response("Could not find user", 404);
  }

  if (!existingUser) {
    return new Response("Could not find user or not created", 500);
  }

  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return new Response("Could not log you in please check credentials", 500);
  }

  if (!isPasswordValid) {
    return new Response("Could not log you in please check credentials.", 403);
  }

  return new Response("You are logged in");
};
