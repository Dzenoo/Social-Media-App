import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Failed to connect", { status: 500 });
  }

  try {
    await Post.findByIdAndRemove(params.postId);
    return new Response("Post deleted", { status: 200 });
  } catch (error) {
    return new Response("Cannot find post by id", { status: 402 });
  }
};
