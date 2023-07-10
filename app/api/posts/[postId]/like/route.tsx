import Post from "@/models/post";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (
  request: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Could not connect", { status: 500 });
  }
  const { userId } = await request.json();

  try {
    const post = await Post.findById(params.postId);

    if (post.likes.includes(userId)) {
      await Post.findByIdAndUpdate(params.postId, {
        $pull: { likes: userId },
        new: true,
      });
    } else {
      await Post.findByIdAndUpdate(params.postId, {
        $push: { likes: userId },
        new: true,
      });
    }

    const userWhichLike = await User.findById(userId);
    const userWhichGetNot = await User.findById(post.creator);

    const notification = {
      message: `${userWhichLike.first_name} ${userWhichLike.last_name} liked your post!`,
      image: `${userWhichLike.image}`,
    };

    userWhichGetNot.notifications.push(notification);

    await userWhichGetNot.save();

    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    return new Response("Could not like post", { status: 500 });
  }
};
