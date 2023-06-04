import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import User from "@/models/user";
import Comment from "@/models/comment";

export const GET = async () => {
  try {
    await connectToDB();

    const posts = await Post.find();

    const populatedPosts = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.find({ _id: { $in: post.comments } });
        const creator = await User.findById(post.creator);

        return { ...post.toObject(), comments, creator };
      })
    );

    return new Response(JSON.stringify(populatedPosts), { status: 200 });
  } catch (error) {
    return new Response("Failed to get posts", { status: 500 });
  }
};
