"use client";

import Post from "@/components/Posts/Post";
import useSwr from "swr";
import UserProfileCard from "@/components/Profile/UserProfileCard";
import { Container, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";

const UserProfile = async ({ params }) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, loading } = useSwr(
    `/api/users/${params.userId}`,
    fetcher
  );
  const router = useRouter();
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));

  useEffect(() => {
    if (userInfo.userId === params.userId) {
      router.replace("/");
    }
  }, [router]);

  const followUser = async () => {
    try {
      const response = await fetch(`/api/users/${data._id}`, {
        method: "POST",
        body: JSON.stringify({
          userIdToSend: userInfo.userId,
        }),
      });

      if (response.ok) {
        toast.success("You send follow request");
      }
    } catch (error) {
      toast.error(error.message);
    }
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
      {data.isPrivate && !isUserFollowed && (
        <Typography textAlign="center" fontWeight="bold">
          Profile is private
        </Typography>
      )}
      {(!data.isPrivate || isUserFollowed) && (
        <Container maxWidth="md">
          {Object.keys(data.posts).map((key) => {
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
                firstName={data.first_name}
                lastName={data.last_name}
                creatorImg={data.image}
              />
            );
          })}
        </Container>
      )}
    </Container>
  );
};

export default UserProfile;
