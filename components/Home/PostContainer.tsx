import { PostProps } from "@/types/posts";
import { Container, Typography } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";
import Post from "../Posts/Post";

const PostContainer = ({
  classes,
  allPosts,
  data,
  userInfo,
}: {
  classes: any;
  allPosts: PostProps[];
  data: { following: {}[] };
  userInfo: { userId: string };
}) => {
  return (
    <Container
      className={classes.mainSection_posts}
      maxWidth="md"
      sx={{ padding: "20px" }}
    >
      <ToastContainer />
      {allPosts.length === 0 ? (
        <Typography textAlign="center" variant="h4">
          No posts jet
        </Typography>
      ) : (
        allPosts
          .filter(
            (post: PostProps) =>
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
};

export default PostContainer;
