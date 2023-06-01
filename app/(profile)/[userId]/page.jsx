"use client";

import Post from "@/components/Posts/Post";
import useSwr from "swr";
import UserProfileCard from "@/components/Profile/UserProfileCard";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";

const UserProfile = async ({ params }) => {
  const { userId } = params.userId;
  const { data, error, loading } = useSwr(`/api/users/${userId}`, fetcher);
  const router = useRouter();
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  useEffect(() => {
    if (userInfo.userId === params.userId) {
      router.replace("/");
    }
  }, [router]);

  const followUser = async () => {
    await fetch(`/api/users/${user._id}`, {
      method: "POST",
      body: JSON.stringify({
        userIdToSend: userInfo.userId,
      }),
    });
  };

  if (!data) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  const isUserFollowed = data.followers.includes(userInfo.userId);

  return (
    <Container maxWidth="lg">
      <UserProfileCard
        isPrivate={data.isPrivate}
        userImage={data.image}
        firstName={data.first_name}
        lastName={data.last_name}
        biography={data.biography}
        posts={data.posts}
        email={data.email}
        followers={data.followers.length}
        following={data.following.length}
        wideImage={data.wideImage}
        isUserFollowed={isUserFollowed}
        followUser={followUser}
      />
      {data.posts.length === 0 && (
        <Typography variant="h4" align="center" marginTop="40px">
          {userPosts === 0 && "User have no posts"}
        </Typography>
      )}
      {data.isPrivate && !isUserFollowed && <div>Profile is private</div>}
      {isUserFollowed && (
        <Container maxWidth="md">
          {Object.keys(user.posts).map((key) => {
            const post = data.posts[key];
            return (
              <Post
                key={post._id}
                id={post._id}
                userId={post.creator}
                postId={post._id}
                comments={post.comments}
                likes={post.likes}
                image={post.image}
                hashtags={post.hashtags}
                description={post.description}
                date={post.createdAt}
                location={post.location}
                firstName={user.first_name}
                lastName={user.last_name}
                creatorImg={user.image}
              />
            );
          })}
        </Container>
      )}
    </Container>
  );
};

export default UserProfile;
