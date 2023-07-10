"use client";
import useSwr from "swr";
import Post from "@/components/Posts/Post";
import { Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostProps } from "@/types/posts";

export default function Home() {
  const [allPosts, setallPosts] = useState<PostProps[]>([]);
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userinfo"))
      : null;
  const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());
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
        (a: { createdAt: string }, b: { createdAt: string }) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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

  if (!userInfo || userInfo === undefined) {
    return <p>Please log in or sign up</p>;
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
          .map((post: PostProps) => (
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
