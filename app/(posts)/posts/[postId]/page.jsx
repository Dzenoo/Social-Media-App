"use client";

import Post from "@/components/Posts/Post";
import { getPostById } from "@/utils/functions";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

const PostPage = async ({ params }) => {
  const [post, setPost] = useState();

  console.log(post);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${params.postId}`);
      const responseData = await response.json();

      if (response.ok) {
        setPost(responseData);
      }
    };
    fetchPost();
  }, []);

  return (
    <Container maxWidth="md">
      {/* <Post
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
      /> */}
    </Container>
  );
};

export default PostPage;
