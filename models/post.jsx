import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  location: {
    type: String,
    required: [true, "Location is required!"],
  },
  hashtags: {
    type: String,
    required: [true, "Hashtagsis required!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  image: {
    type: String,
  },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
