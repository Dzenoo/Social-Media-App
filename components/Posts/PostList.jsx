"use client";

import { useEffect, useState } from "react";
import Post from "../Home/Post";

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
      {allPosts.map((post) => (
        <Post
          key={post._id}
          hashtags={post.hashtags}
          description={post.description}
          image={post.image}
          date={post.createdAt}
          location={post.location}
        />
      ))}
    </div>
  );
};

export default PostList;
