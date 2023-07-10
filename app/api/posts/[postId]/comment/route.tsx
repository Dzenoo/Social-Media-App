import Comment from "@/models/comment";
import Post from "@/models/post";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request, { params }) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Could not connect", { status: 500 });
  }

  const { commentText, userImage, userName } = await request.json();

  let post;
  let userToGetNot;
  try {
    post = await Post.findById(params.postId);
    userToGetNot = await User.findById(post.creator);
  } catch (error) {
    return new Response("Could not find post", { status: 402 });
  }

  const createdComment = new Comment({
    userImage: userImage,
    userName: userName,
    content: commentText,
    post: post._id,
  });

  const notification = {
    message: `${userName} commented on your post!`,
    image: `${userImage}`,
  };

  userToGetNot.notifications.push(notification);

  userToGetNot.save();

  try {
    post.comments.push(createdComment);
    await createdComment.save();
    await post.save();
    return new Response("Comment created", { status: 201 });
  } catch (error) {
    return new Response("Could not create comment", { status: 500 });
  }
};
