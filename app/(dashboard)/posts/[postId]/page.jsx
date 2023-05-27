"use client";

import { Button, FormControl, TextField, Typography } from "@mui/material";
import classes from "../../../../css/Posts.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPostById } from "@/utils/functions";

// export async function generateStaticParams() {
//   const posts = await fetch("/api/posts/");

//   return posts.map((post) => ({
//     slug: post._id,
//   }));
// }

const EditPostPage = async ({ params }) => {
  const [editValues, setEditValues] = useState({
    location: "",
    hashtags: "",
    description: "",
  });
  const [imageVal, setimageVal] = useState("");

  const post = await getPostById(params.postId);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setEditValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const imageUrl = fileReader.result;
      setimageVal(imageUrl);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const submitEditHandler = (e) => {
    e.preventDefault();
    console.log(editValues);
  };

  return (
    <section className={classes.edit_dashboard}>
      <Typography variant="h4">Edit Post</Typography>
      <Typography color="textSecondary">
        You are about to edit this post. Make the necessary changes and save
        your updates.
      </Typography>
      <form onSubmit={submitEditHandler}>
        <div className={classes.image_div}>
          <Image src={post.image} width={400} height={400} alt="img" />
          <input
            id="image"
            type="file"
            style={{ marginTop: "12px" }}
            accept="image/*"
            onChange={handleImageChange}
          />
          <TextField
            id="description"
            value={post.description}
            onChange={handleInputChange}
            multiline
          />
        </div>
        <div className={classes.edit_inputs_div}>
          <FormControl>
            <TextField
              label="Hashtags"
              id="hashtags"
              multiline
              value={post.hashtags}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Location"
              id="location"
              onChange={handleInputChange}
              value={post.location}
            />
          </FormControl>
        </div>
        <div className={classes.edit_actions}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditPostPage;
