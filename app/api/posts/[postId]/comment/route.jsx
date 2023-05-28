import Comment from "@/models/comment";
import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const POST = async (request, { params }) => {
  try {
    await connectToDB();
  } catch (error) {
    return new Response("Could not connect", { status: 500 });
  }

  const { commentText, userImage, userName } = await request.json();

  let post;
  try {
    post = await Post.findById(params.postId);
  } catch (error) {
    return new Response("Could not find post", { status: 402 });
  }

  const createdComment = new Comment({
    postId: post._id,
    userImage: userImage,
    userName: userName,
    content: commentText,
  });

  try {
    post.comments.push(createdComment);
    await createdComment.save();
    await post.save();
    return new Response("Comment created", { status: 201 });
  } catch (error) {
    return new Response("Could not create comment", { status: 500 });
  }
};
