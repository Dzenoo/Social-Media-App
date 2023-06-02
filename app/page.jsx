"use client";
import LandingPage from "@/components/Home/LandingPage";
import PostList from "@/components/Posts/PostList";
import { Container } from "@mui/material";

export default function Home() {
  const token =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userdata"))
      : null;

  return (
    <>
      {token?.token ? (
        <Container maxWidth="md" sx={{ padding: "20px" }}>
          <PostList />
        </Container>
      ) : (
        <LandingPage />
      )}
    </>
  );
}
