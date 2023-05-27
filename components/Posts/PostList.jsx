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

  console.log(allPosts);

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
          firstName={post.creator.first_name}
          lastName={post.creator.last_name}
          creatorImg={post.creator.image}
        />
      ))}
    </div>
  );
};

export default PostList;
