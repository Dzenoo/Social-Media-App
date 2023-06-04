"use client";
import useSwr from "swr";
import Post from "@/components/Posts/Post";
import { Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [allPosts, setallPosts] = useState([]);
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userinfo"))
      : null;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data,
    loading: userLoading,
    error: userError,
  } = useSwr(`/api/users/${userInfo?.userId}`, fetcher);
  const {
    data: postsData,
    loading: postLoading,
    error: postError,
  } = useSwr("/api/posts", fetcher);

  useEffect(() => {
    if (postsData) {
      const recentPosts = postsData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setallPosts(recentPosts);
    }
  }, [postsData]);

  if (userLoading || postLoading) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  if (userError || postError) {
    return toast.error("Something get wrong");
  }

  return (
    <Container maxWidth="md" sx={{ padding: "20px" }}>
      <ToastContainer />
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
            />
          ))
      )}
    </Container>
  );
}
