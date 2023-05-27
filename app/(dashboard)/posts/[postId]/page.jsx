"use client";

import { Button, FormControl, TextField, Typography } from "@mui/material";
import classes from "../../../../css/Posts.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export async function generateStaticParams() {
  const posts = await fetch("/api/posts/");

  return posts.map((post) => ({
    slug: post._id,
  }));
}

const EditPostPage = async ({ params }) => {
  const [editValues, setEditValues] = useState({
    location: "",
    hashtags: "",
    description: "",
  });
  const [imageVal, setimageVal] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${params.postId}`);
      const post = await response.json();

      setEditValues({
        location: post.location,
        hashtags: post.hashtags,
        description: post.description,
        image: post.image,
      });
      setimageVal(post.image);
    };

    fetchPost();
  }, []);

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

  console.log(editValues);
  console.log(imageVal);

  // const editPost = async () => {
  //   try {
  //     const response = await fetch();
  //   } catch (error) {}
  // };

  return (
    <section className={classes.edit_dashboard}>
      <Typography variant="h4">Edit Post</Typography>
      <Typography color="textSecondary">
        You are about to edit this post. Make the necessary changes and save
        your updates.
      </Typography>
      <form>
        <div className={classes.image_div}>
          <Image src={imageVal} width={400} height={400} alt="img" />
          <input
            id="image"
            type="file"
            style={{ marginTop: "12px" }}
            accept="image/*"
            onChange={handleImageChange}
          />
          <TextField
            id="description"
            defaultValue={editValues.description}
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
              defaultValue={editValues.hashtags}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Location"
              id="location"
              onChange={handleInputChange}
              defaultValue={editValues.location}
            />
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
