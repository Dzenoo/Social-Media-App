"use client";
import Post from "@/components/Home/Post";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ padding: "20px" }}>
      {/* <NewPost /> */}
      <Post />
      <Post />
      <Post />
    </Container>
  );
}
