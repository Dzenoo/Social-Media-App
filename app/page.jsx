"use client";
import LandingPage from "@/components/Home/LandingPage";
import Post from "@/components/Home/Post";
import { Container } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const token = JSON.parse(localStorage.getItem("userdata"));

  return (
    <>
      {session?.user || token?.token ? (
        <Container maxWidth="md" sx={{ padding: "20px" }}>
          <Post />
        </Container>
      ) : (
        <LandingPage />
      )}
    </>
  );
}
