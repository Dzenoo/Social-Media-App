import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const GET = async () => {
  try {
    await connectToDB();

    const posts = await Post.find().populate("creator").populate("comments");

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to get posts", { status: 500 });
  }
};
