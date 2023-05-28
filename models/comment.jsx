import mongoose, { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userImage: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
