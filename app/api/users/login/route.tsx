import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Could not connect with mongodb", { status: 500 });
  }

  const { email, password } = await request.json();

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return new Response("Could not find user", { status: 404 });
  }

  if (!existingUser) {
    return new Response("Could not find user or not created", { status: 500 });
  }

  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return new Response("Could not log you in please check credentials", {
      status: 500,
    });
  }

  if (!isPasswordValid) {
    return new Response("Could not log you in please check credentials.", {
      status: 403,
    });
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
      },
      process.env.JWT_KEY || "",
      {
        expiresIn: "2h",
      }
    );
  } catch (error) {
    return new Response("Failed to log in", { status: 500 });
  }

  const userInfo = {
    token: token,
    firstname: existingUser.first_name,
    lastname: existingUser.last_name,
    image: existingUser.image,
    userId: existingUser.id,
  };

  return new Response(JSON.stringify(userInfo));
};
