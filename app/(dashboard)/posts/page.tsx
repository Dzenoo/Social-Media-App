"use client";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import classes from "../../../css/Posts.module.css";
import Image from "next/image";
import PostItem from "@/components/Posts/PostItem";
import Link from "next/link";
import Modale from "@/components/Modal/Modal";
import { PostProps } from "@/types/posts";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [postIdToDelete, setpostIdToDelete] = useState("");
  const [query, setquery] = useState("");
  const [open, setopen] = useState(false);
  const handleOpen = (postId: string) => {
    setopen(true);
    setpostIdToDelete(postId);
  };
  const handleClose = () => setopen(false);

  const userId =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userinfo"))
      : null;

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${userId?.userId}`, {
        cache: "no-store",
      });
      const responseData = await response.json();

      if (response.ok) {
        setPosts(responseData.posts);
      } else {
        toast.error("Cannot get posts");
      }
    };
    fetchUserPosts();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setquery(e.target.value);
  };

  return (
    <section className={classes.main_dashboard}>
      <div className={classes.filter_bar}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ padding: "20px", position: "relative", right: "22px" }}
        >
          Posts ({posts.length})
        </Typography>
        <Box sx={{ display: "flex", gap: "12px" }}>
          <FormControl sx={{ width: "200px" }}>
            <TextField label="Search" onChange={handleSearchChange} />
          </FormControl>
          <FormControl>
            <Link className="link_no_decoration" href="/posts/new">
              <Button
                variant="contained"
                size="large"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                }}
              >
                Create new post
                <Image
                  src="/images/add.png"
                  width={30}
                  height={30}
                  alt="image"
                />
              </Button>
            </Link>
          </FormControl>
        </Box>
      </div>
      <div className={classes.posts_container}>
        {posts.length === 0 ? (
          <Typography textAlign="center" variant="h4">
            No posts jet
          </Typography>
        ) : (
          posts
            .filter(
              (p: PostProps) =>
                p.description.toLowerCase().includes(query) ||
                p.hashtags.toLowerCase().includes(query)
            )
            .map((post: PostProps) => (
              <PostItem
                key={post._id}
                id={post._id}
                openDeleteModal={() => handleOpen(post._id)}
                description={post.description}
                image={post.image}
                date={post.createdAt}
                likes={post.likes.length}
                comments={post.comments.length}
                show={true}
                hashtags={post.hashtags}
              />
            ))
        )}
        {posts.length > 0 && (
          <Modale
            isOpen={open}
            close={handleClose}
            text="Are you sure you want to delete this post?"
            title="Deleting Post Confirmation"
            id={postIdToDelete}
            onCloseModal={handleClose}
            posts={posts}
            setPosts={setPosts}
          />
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Posts;
