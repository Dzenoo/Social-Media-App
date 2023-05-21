"use client";

import Post from "@/components/Home/Post";
import UserProfileCard from "@/components/Profile/UserProfileCard";
import { Container, Typography } from "@mui/material";

const userPosts = 4;

const UserProfile = () => {
  return (
    <Container maxWidth="lg">
      <UserProfileCard />
      {userPosts === 0 ? (
        <Typography variant="h4" align="center" marginTop="40px">
          User have no posts
        </Typography>
      ) : (
        <Container maxWidth="md">
          <Post />
        </Container>
      )}
    </Container>
  );
};

export default UserProfile;
