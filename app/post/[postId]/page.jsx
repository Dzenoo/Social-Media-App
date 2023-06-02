"use client";

import Post from "@/components/Posts/Post";
import { Container } from "@mui/material";
import { FadeLoader } from "react-spinners";
import useSwr from "swr";

const PostPage = ({ params }) => {
  const { postId } = params;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, loading } = useSwr(`/api/posts/${postId}`, fetcher);

  if (!data) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  return (
    <Container maxWidth="md" sx={{ padding: "20px" }}>
      <Post
        key={data._id}
        postId={data._id}
        hashtags={data.hashtags}
        description={data.description}
        image={data.image}
        date={data.createdAt}
        location={data.location}
        firstName={data.creator.first_name}
        lastName={data.creator.last_name}
        creatorImg={data.creator.image}
        userId={data.creator._id}
        likes={data.likes}
        comments={data.comments}
        show={true}
      />
    </Container>
  );
};

export default PostPage;
