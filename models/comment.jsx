import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
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
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
