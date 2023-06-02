"use client";

import { useEffect, useState } from "react";
import Post from "./Post";
import useSwr from "swr";
import { Typography } from "@mui/material";
import { FadeLoader } from "react-spinners";

const PostList = () => {
  const [allPosts, setallPosts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, loading } = useSwr(
    `/api/users/${userInfo.userId}`,
    fetcher
  );

  useEffect(() => {
    setisLoading(true);
    const getPosts = async () => {
      const response = await fetch("/api/posts", {
        cache: "no-store",
        next: { revalidate: 2 },
      });
      const responseData = await response.json();

      const recentPosts = responseData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setisLoading(false);
      setallPosts(recentPosts);
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
        allPosts
          .filter(
            (post) =>
              post.creator.isPrivate === false ||
              data?.following.includes(post.creator._id) ||
              post.creator === data?._id
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
    </div>
  );
};

export default PostList;
