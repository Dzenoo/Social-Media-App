import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const POST = async (request, { params }) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Could not connect", { status: 500 });
  }
  const { userId } = await request.json();

  try {
    const post = await Post.findByIdAndUpdate(params.postId, {
      $push: { likes: userId },
      new: true,
    });
  } catch (error) {}
};
