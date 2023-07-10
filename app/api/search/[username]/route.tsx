import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextApiRequest } from "next";

export const GET = async (
  request: NextApiRequest,
  { params }: { params: { username: string } }
) => {
  try {
    await connectToDB();

    const users = await User.find({
      first_name: { $regex: new RegExp(params.username, "i") },
    });

    if (!users) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get post, please try again", {
      status: 500,
    });
  }
};
