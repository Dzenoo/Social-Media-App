"use client";

import SavedPost from "@/components/Posts/SavedPost";
import { Container, Typography } from "@mui/material";
import classes from "../../../../css/Posts.module.css";
import { getUser } from "@/utils/functions";

const UserSavedPosts = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const user = await getUser(userInfo.userId);

  console.log(user);

  return (
    <Container maxWidth="xl" className={classes.saved_posts_container}>
      {user.savedPosts.length === 0 && (
        <Typography textAlign="center" fontWeight="bold">
          No saved posts
        </Typography>
      )}
      {user.savedPosts.map((post) => (
        <SavedPost image={post.image} />
      ))}
    </Container>
  );
};

export default UserSavedPosts;
