"use client";

import Post from "@/components/Home/Post";
import UserProfileCard from "@/components/Profile/UserProfileCard";
import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

const userPosts = 4;
const isPrivate = true;

const UserProfile = ({ params }) => {
  const [user, setuser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${params.userId}`);
      const responseData = await response.json();

      setuser(responseData);
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  return (
    <Container maxWidth="lg">
      <UserProfileCard
        isPrivate={isPrivate}
        userImage={user.image}
        firstName={user.first_name}
        lastName={user.last_name}
        biography={user.biography}
        posts={user.posts}
        email={user.email}
        followers={user.followers}
        following={user.following}
        wideImage={user.wideImage}
      />
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
