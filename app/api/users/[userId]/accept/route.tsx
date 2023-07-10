import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request, { params }) => {
  try {
    await connectToDB();

    const { userIdToAccept } = await request.json();
    const userWhichSendRequest = await User.findById(params.userId);
    const userToAccept = await User.findById(userIdToAccept);

    userToAccept.followRequests.pull(params.userId);

    userToAccept.followers.push(userWhichSendRequest._id);
    userWhichSendRequest.following.push(userToAccept._id);

    const notification = {
      message: `${userWhichSendRequest.first_name} ${userWhichSendRequest.last_name} has started following you!`,
      image: `${userWhichSendRequest.image}`,
    };
    userToAccept.notifications.push(notification);

    await userToAccept.save();
    await userWhichSendRequest.save();

    return new Response("You accepted a follow request", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Could not connect", { status: 500 });
  }
};
