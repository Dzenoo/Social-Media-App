import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import User from "@/models/user";
import Comment from "@/models/comment";

export const GET = async () => {
  try {
    await connectToDB();

    const posts = await Post.find();

    const populatedPosts = await Post.find()
      .populate({
        path: "comments",
      })
      .populate("creator")
      .exec();

    return new Response(JSON.stringify(populatedPosts), { status: 200 });
  } catch (error) {
    return new Response("Failed to get posts", { status: 500 });
  }
};
