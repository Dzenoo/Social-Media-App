"use client";
import useSwr from "swr";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostProps } from "@/types/posts";
import HomeSidebar from "@/components/Navbar/HomeSidebar";
import classes from "@/css/HomeNavbar.module.css";
import PostContainer from "@/components/Home/PostContainer";
import Stories from "@/components/Home/Stories";
import { Container } from "@mui/material";

export default function Home() {
  const [allPosts, setallPosts] = useState<PostProps[]>([]);
  const userInfo =
    typeof window !== "undefined" && localStorage.getItem("userinfo")
      ? JSON.parse(localStorage.getItem("userinfo")!)
      : null;

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const {
    data,
    isLoading: userLoading,
    error: userError,
  } = useSwr(`/api/users/${userInfo?.userId}`, fetcher);
  const {
    data: postsData,
    isLoading: postLoading,
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
    <section className={classes.mainSection}>
      <HomeSidebar />
      <Container className={classes.mainSection_stories}>
        <Stories />
        <PostContainer
          data={data}
          userInfo={userInfo}
          allPosts={allPosts}
          classes={classes}
        />
      </Container>
    </section>
  );
}
