"use client";

import {
  Button,
  FormControl,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { getPostById, getPosts } from "@/utils/posts";
import classes from "../../../../css/Posts.module.css";
import Image from "next/image";

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.id,
  }));
}

const EditPostPage = async ({ params }) => {
  const post = await getPostById(params.postId);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <section className={classes.edit_dashboard}>
      <Typography variant="h4">Edit Post</Typography>
      <Typography color="textSecondary">
        You are about to edit this post. Make the necessary changes and save
        your updates.
      </Typography>
      <form>
        <div className={classes.image_div}>
          <div>
            <Image src="/images/setting.png" width={400} height={400} />
            <Input type="file" sx={{ marginTop: "12px" }} />
          </div>
          <textarea
            className={classes.edit_textarea}
            defaultValue={post.description}
          />
        </div>
        <div className={classes.edit_inputs_div}>
          <FormControl>
            <label htmlFor="hashtag">
              <b>Hashtags</b>
            </label>
            <TextField label="Hashtags" id="hashtag" />
          </FormControl>
          <FormControl>
            <label htmlFor="hashtag">
              <b>Location</b>
            </label>
            <TextField label="Location" id="location" />
          </FormControl>
        </div>
        <div className={classes.edit_actions}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained">Save</Button>
        </div>
      </form>
    </section>
  );
};

export default EditPostPage;
