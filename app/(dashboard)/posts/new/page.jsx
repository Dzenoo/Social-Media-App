"use client";
import { Box, Container, Typography } from "@mui/material";
import classes from "../../../../css/NewPost.module.css";
import PostForm from "@/components/Posts/PostForm";

const NewPost = () => {
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
      <PostForm />
    </Container>
  );
};

export default NewPost;
