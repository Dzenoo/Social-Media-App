"use client";

import { FormControl, TextField, Typography } from "@mui/material";
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

  return (
    <section className={classes.edit_dashboard}>
      <Typography variant="h4">Edit Post</Typography>
      <Typography color="textSecondary">
        You are about to edit this post. Make the necessary changes and save
        your updates.
      </Typography>
      <div>
        <Image src="/images/add.png" width={400} height={400} />
        <FormControl>
          <TextField value={post.description} label="Description" />
        </FormControl>
      </div>
    </section>
  );
};

export default EditPostPage;
