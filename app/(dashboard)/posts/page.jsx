"use client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import classes from "../../../css/Posts.module.css";
import Image from "next/image";
import PostItem from "@/components/Posts/PostItem";
import { useState } from "react";
import posts from "../../../data/data.json";
import Link from "next/link";
import Modale from "@/components/Modal/Modal";

const Posts = () => {
  const [open, setopen] = useState(false);
  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);

  return (
    <section className={classes.main_dashboard}>
      <div className={classes.filter_bar}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ padding: "20px", position: "relative", right: "22px" }}
        >
          Posts
        </Typography>
        <Box sx={{ display: "flex", gap: "12px" }}>
          <FormControl sx={{ width: "200px" }}>
            <InputLabel>FIlter</InputLabel>
            <Select placeholder="Filter">
              <MenuItem>Hashtags</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "200px" }}>
            <TextField label="Search" />
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
                <Image src="/images/add.png" width={30} height={30} />
              </Button>
            </Link>
          </FormControl>
        </Box>
      </div>
      <div className={classes.posts_container}>
        {posts.posts.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            openDeleteModal={handleOpen}
            description={post.description}
            likes={post.likes}
            comments={post.comments}
            shares={post.shares}
            date={post.date}
          />
        ))}
        <Modale isOpen={open} close={handleClose} />
      </div>
    </section>
  );
};

export default Posts;
