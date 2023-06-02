"use client";
import useSwr from "swr";
import { usePathname } from "next/navigation";
import { FadeLoader } from "react-spinners";
import { Container } from "@mui/material";
import Post from "@/components/Posts/Post";
import Image from "next/image";

const HashtagPage = () => {
  const pathname = usePathname();
  const hashtag = pathname.split("/")[2];
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, loading } = useSwr(
    `/api/posts/hashtags/${hashtag}`,
    fetcher
  );

  if (!data) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      {data.map((post) => (
        <div>
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
            show={false}
          />
        </div>
      ))}
    </Container>
  );
};

export default HashtagPage;
