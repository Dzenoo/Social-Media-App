import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const PATCH = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Could not connect", { status: 500 });
  }

  const { coverImage } = await request.json();

  const coverImg = await cloudinary.uploader.upload(coverImage);

  try {
    const user = await User.findById(params.userId);
    user.wideImage = coverImg.url;

    await user.save();
    return new Response("Changed successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Could not find user", { status: 500 });
    console.log(error);
  }
};
