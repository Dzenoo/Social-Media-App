"use client";

import { Button, FormControl, TextField, Typography } from "@mui/material";
import classes from "../../../../css/Posts.module.css";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export async function generateStaticParams() {
  const user = JSON.parse(localStorage.getItem("userinfo"));

  const response = await fetch(`/api/users/${user.userId}`);
  const responseData = await response.json();

  return responseData.posts.map((post) => ({
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
  const user = JSON.parse(localStorage.getItem("userinfo"));
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${user.userId}`);
      const responseData = await response.json();

      const post = responseData.posts.find((p) => p._id === params.postId);

      setEditValues((prevValues) => ({
        ...prevValues,
        location: post.location,
        hashtags: post.hashtags,
        description: post.description,
      }));
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

  let disabled = false;
  const submitEditHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/posts/${params.postId}`, {
      method: "PATCH",
      body: JSON.stringify({
        location: editValues.location,
        hashtags: editValues.hashtags,
        description: editValues.description,
        image: imageVal,
      }),
    });

    if (response.ok) {
      toast.success("Post edited");
      router.push("/posts");
    } else {
      toast.error("Post editing failed");
      disabled = true;
    }
  };

  return (
    <section className={classes.edit_dashboard}>
      <ToastContainer />
      <Typography variant="h4">Edit Post</Typography>
      <Typography color="textSecondary">
        You are about to edit this post. Make the necessary changes and save
        your updates.
      </Typography>
      <form onSubmit={submitEditHandler}>
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
            onBlur={handleInputChange}
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
              onBlur={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Location"
              id="location"
              onBlur={handleInputChange}
              defaultValue={editValues.location}
            />
          </FormControl>
        </div>
        <div className={classes.edit_actions}>
          <Button variant="outlined" onClick={() => router.replace("/posts")}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={disabled}>
            Save
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditPostPage;
