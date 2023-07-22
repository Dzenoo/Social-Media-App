import Comment from "@/models/comment";
import Post from "@/models/post";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const GET = async (
  request: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    await connectToDB();

    const post = await Post.findById(params.postId);

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    const [comments, creator] = await Promise.all([
      Comment.find({ _id: { $in: post.comments } }),
      User.findById(post.creator),
    ]);

    const populatedPost = { ...post.toObject(), comments, creator };

    return new Response(JSON.stringify(populatedPost), { status: 200 });
  } catch (error) {
    return new Response("Failed to get the post", { status: 500 });
  }
};

export const POST = async (
  request: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Failed to connect", { status: 500 });
  }

  const { userId } = await request.json();

  console.log("USERID" + userId);

  try {
    const user = await User.findById(userId);

    if (user.savedPosts.includes(params.postId)) {
      return new Response("Post already saved", { status: 500 });
    }

    user.savedPosts.push(params.postId);
    await user.save();

    return new Response("Successfully saved a post", { status: 201 });
  } catch (error) {
    return new Response("Cannot save post", { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Failed to connect", { status: 500 });
  }

  const { location, hashtags, description, image } = await request.json();

  let post;
  try {
    post = await Post.findById(params.postId);
  } catch (error) {
    return new Response("Cannot find post by id", { status: 402 });
  }

  const photoUrl = await cloudinary.uploader.upload(image);

  post.location = location;
  post.hashtags = hashtags;
  post.description = description;
  post.image = process.env.USERIMAGE;

  try {
    await post.save();
    return new Response("Post edited", { status: 200 });
  } catch (error) {
    return new Response("Cannot edit the post", { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Failed to connect", { status: 500 });
  }

  try {
    const post = await Post.findByIdAndRemove(params.postId);
    await Comment.deleteMany({ post: params.postId });
    const user = await User.findById(post.creator);
    await user.posts.pull(post);
    await user.savedPosts.pull(post);
    await user.save();
    return new Response("Post deleted", { status: 200 });
  } catch (error) {
    return new Response("Cannot find post by id", { status: 404 });
  }
};
