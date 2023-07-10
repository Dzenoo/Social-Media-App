import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const GET = async ({ params }: { params: { hashtag: string } }) => {
  try {
    await connectToDB();

    const posts = await Post.find({
      hashtags: { $regex: `#${params.hashtag}`, $options: "i" },
    }).populate("creator", "first_name last_name image _id");

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get the post", { status: 500 });
  }
};
