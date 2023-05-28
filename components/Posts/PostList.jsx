"use client";

import { useEffect, useState } from "react";
import Post from "../Home/Post";
import { Typography } from "@mui/material";
import { FadeLoader } from "react-spinners";

const PostList = () => {
  const [allPosts, setallPosts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    const getPosts = async () => {
      const response = await fetch("/api/posts");
      const responseData = await response.json();

      const recentPosts = responseData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setallPosts(recentPosts);
      setisLoading(false);
    };
    getPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

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
          />
        ))
      )}
    </div>
  );
};

export default PostList;
