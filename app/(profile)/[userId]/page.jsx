"use client";

import Post from "@/components/Home/Post";
import UserProfileCard from "@/components/Profile/UserProfileCard";
import { Container, Typography } from "@mui/material";

const userPosts = 4;
const isPrivate = true;

const UserProfile = () => {
  return (
    <Container maxWidth="lg">
      <UserProfileCard isPrivate={isPrivate} />
      {userPosts === 0 || isPrivate ? (
        <Typography variant="h4" align="center" marginTop="40px">
          {userPosts === 0 && "User have no posts"}
          {isPrivate && "This account is private"}
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
