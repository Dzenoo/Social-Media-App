import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
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
      .populate("savedPosts");
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Could not connect", { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Could not connect", { status: 500 });
  }

  const { userIdToSend } = await request.json();

  try {
    const userToFollow = await User.findById(params.userId);
    const userWhichSendRequest = await User.findById(userIdToSend);

    userToFollow.followers.push(userWhichSendRequest.id);
    userWhichSendRequest.following.push(userToFollow.id);

    await userToFollow.save();
    await userWhichSendRequest.save();

    return new Response("You followed a user", { status: 200 });
  } catch (error) {
    return new Response("Could not follow user", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
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
