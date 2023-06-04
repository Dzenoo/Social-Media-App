"use client";
import LandingPage from "@/components/Home/LandingPage";
import useSwr from "swr";
import { Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Post from "@/components/Posts/Post";

export default function Home() {
  const [allPosts, setallPosts] = useState([]);
  const token =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userdata"))
      : null;
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userinfo"))
      : null;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSwr(`/api/users/${userInfo?.userId}`, fetcher);
  const { data: postsData } = useSwr("/api/posts", fetcher);

  useEffect(() => {
    if (postsData) {
      const recentPosts = postsData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setallPosts(recentPosts);
    }
  }, [postsData]);

  return (
    <>
      {token?.token ? (
        <Container maxWidth="md" sx={{ padding: "20px" }}>
          {allPosts.length === 0 ? (
            <Typography textAlign="center" variant="h4">
              No posts jet
            </Typography>
          ) : (
            allPosts
              .filter(
                (post) =>
                  post.creator.isPrivate === false ||
                  data?.following.includes(post.creator._id) ||
                  post.creator._id === userInfo?.userId
              )
              .map((post) => (
                <Post
                  key={post._id}
                  postId={post._id}
                  hashtags={post.hashtags}
                  description={post.description}
                  image={post.image}
                  date={post.createdAt}
                  location={post.location}
                  firstName={post.creator.first_name}
                  lastName={post.creator.last_name}
                  creatorImg={post.creator.image}
                  userId={post.creator._id}
                  likes={post.likes}
                  comments={post.comments}
                  show={true}
                  showCommAndLike={true}
                />
              ))
          )}
        </Container>
      ) : (
        <LandingPage />
      )}
    </>
  );
}
