"use client";

import Post from "@/components/Home/Post";
import UserProfileCard from "@/components/Profile/UserProfileCard";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

const UserProfile = ({ params }) => {
  const [user, setuser] = useState();
  const router = useRouter();
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));

  useEffect(() => {
    if (userInfo.userId === params.userId) {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${params.userId}`, {
        cache: "no-store",
        next: { revalidate: 2 },
      });
      const responseData = await response.json();
      setuser(responseData);
    };
    fetchUser();
  }, []);

  const followUser = async () => {
    await fetch(`/api/users/${user._id}`, {
      method: "POST",
      body: JSON.stringify({
        userIdToSend: userInfo.userId,
      }),
    });
  };

  if (!user) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  const isUserFollowed = user.followers.includes(userInfo.userId);

  return (
    <Container maxWidth="lg">
      <UserProfileCard
        isPrivate={user.isPrivate}
        userImage={user.image}
        firstName={user.first_name}
        lastName={user.last_name}
        biography={user.biography}
        posts={user.posts}
        email={user.email}
        followers={user.followers.length}
        following={user.following.length}
        wideImage={user.wideImage}
        isUserFollowed={isUserFollowed}
        followUser={followUser}
      />
      {user.posts.length === 0 && (
        <Typography variant="h4" align="center" marginTop="40px">
          {userPosts === 0 && "User have no posts"}
        </Typography>
      )}
      {user.isPrivate && !isUserFollowed && <div>Profile is private</div>}
      {isUserFollowed && (
        <div>
          {Object.keys(user.posts).map((key) => {
            const post = user.posts[key];
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
        </div>
      )}
    </Container>
  );
};

export default UserProfile;
