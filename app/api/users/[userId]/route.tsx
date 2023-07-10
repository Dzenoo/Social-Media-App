import Comment from "@/models/comment";
import Post from "@/models/post";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    await connectToDB();

    const user = await User.findById(params.userId)
      .populate({
        path: "posts",
        populate: {
          path: "comments",
          model: "Comment",
        },
      })
      .populate("savedPosts")
      .populate("followRequests", "first_name last_name _id image");
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Could not connect", { status: 500 });
  }
};

export const POST = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Could not connect", { status: 500 });
  }

  const { userIdToSend } = await request.json();

  try {
    const userToFollow = await User.findById(params.userId);
    const userWhichSendRequest = await User.findById(userIdToSend);

    if (userToFollow.isPrivate) {
      if (userToFollow.followRequests.includes(userWhichSendRequest.id)) {
        return new Response("You already sended a follow request", {
          status: 500,
        });
      }
    }

    if (userToFollow.isPrivate) {
      userToFollow.followRequests.push(userWhichSendRequest.id);
    } else {
      userToFollow.followers.push(userWhichSendRequest.id);
      userWhichSendRequest.following.push(userToFollow.id);

      const notification = {
        message: `${userWhichSendRequest.first_name} ${userWhichSendRequest.last_name} has started following you!`,
        image: `${userWhichSendRequest.image}`,
      };
      userToFollow.notifications.push(notification);
    }

    await userToFollow.save();
    await userWhichSendRequest.save();

    return new Response("You followed a user", { status: 200 });
  } catch (error) {
    return new Response("Could not follow user", { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Could not connect", { status: 500 });
  }

  try {
    const user = await User.findById(params.userId);

    user.isPrivate = !user.isPrivate;
    await user.save();
    return new Response("User profile visibility toggled successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Could not find user", { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    await connectToDB();

    const user = await User.findById(params.userId);

    if (!user) {
      return new Response("User not found", { status: 500 });
    }

    await Comment.deleteMany({ userName: user.first_name });

    await Post.updateMany(
      { likes: params.userId },
      { $pull: { likes: params.userId } }
    );

    const posts = await Post.find({ creator: params.userId });
    const postIds = posts.map((p) => p._id);
    await Comment.deleteMany({ post: { $in: postIds } });
    await Post.deleteMany({ creator: params.userId });

    await User.findByIdAndDelete(params.userId);

    return new Response("User deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Could not connect", { status: 500 });
  }
};
