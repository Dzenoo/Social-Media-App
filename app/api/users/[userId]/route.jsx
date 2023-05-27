import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const user = await User.findById(params.userId).populate("posts");
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Could not connect");
  }
};
