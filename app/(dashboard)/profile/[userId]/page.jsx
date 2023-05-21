"use client";

import SavedPost from "@/components/Posts/SavedPost";
import { Container, Grid, Typography } from "@mui/material";
import classes from "../../../../css/Posts.module.css";

const UserSavedPosts = () => {
  return (
    <Container maxWidth="xl" className={classes.saved_posts_container}>
      <SavedPost />
      <SavedPost />
      <SavedPost />
      <SavedPost />
      <SavedPost />
      <SavedPost />
      <SavedPost />
      <SavedPost />
      <SavedPost />
      <SavedPost />
      <SavedPost />
      <SavedPost />
    </Container>
  );
};

export default UserSavedPosts;
