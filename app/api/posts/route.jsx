import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Failed to connect mongodb", { status: 500 });
  }

  let posts;
  try {
    posts = await Post.find();
  } catch (error) {
    return new Response("Failed to get posts", { status: 500 });
  }

  return new Response(JSON.stringify(posts), { status: 200 });
};
