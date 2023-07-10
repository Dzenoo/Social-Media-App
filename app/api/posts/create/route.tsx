import Post from "@/models/post";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (request) => {
  try {
    await connectToDB();

    const { location, hashtags, image, description, userId } =
      await request.json();

    const photoUrl = await cloudinary.uploader.upload(image);

    const newPost = await Post.create({
      location,
      hashtags,
      description,
      image: photoUrl.url,
      creator: userId,
      likes: [],
      comments: [],
    });

    await newPost.save();

    const user = await User.findById(userId);
    user.posts.push(newPost.id);
    await user.save();

    return new Response("Added", { status: 201 });
  } catch (error) {
    return new Response("Could not connect with mongodb", { status: 500 });
  }
};
