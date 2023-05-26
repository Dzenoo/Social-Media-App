"use client";
import { Box, Container, Typography } from "@mui/material";
import classes from "../../../../css/NewPost.module.css";
import PostForm from "@/components/Posts/PostForm";
import { useState } from "react";
import { FadeLoader } from "react-spinners";

const NewPost = () => {
  const [isLoading, setisLoading] = useState(false);

  const onSubmitPost = async (data) => {
    setisLoading(true);
    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log("Not ok");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }
  return (
    <Container maxWidth="md" className={classes.new_post_section}>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Add New Post
        </Typography>
        <Typography color="textSecondary">
          You are about to add new post.
        </Typography>
      </Box>
      <PostForm onSubmitPost={onSubmitPost} />
    </Container>
  );
};

export default NewPost;
