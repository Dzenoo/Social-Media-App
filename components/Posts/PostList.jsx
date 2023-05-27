"use client";

import { useEffect, useState } from "react";
import Post from "../Home/Post";
import { Typography } from "@mui/material";

const PostList = () => {
  const [allPosts, setallPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/posts");
      const responseData = await response.json();

      setallPosts(responseData);
    };
    getPosts();
  }, []);

  return (
    <div>
      {allPosts.length === 0 ? (
        <Typography textAlign="center" variant="h4">
          No posts jet
        </Typography>
      ) : (
        allPosts.map((post) => (
          <Post
            key={post._id}
            hashtags={post.hashtags}
            description={post.description}
            image={post.image}
            date={post.createdAt}
            location={post.location}
            firstName={post.creator.first_name}
            lastName={post.creator.last_name}
            creatorImg={post.creator.image}
            userId={post.creator._id}
          />
        ))
      )}
    </div>
  );
};

export default PostList;
