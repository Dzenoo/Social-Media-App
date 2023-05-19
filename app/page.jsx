"use client";

import NewPost from "@/components/Home/NewPost";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ padding: "20px" }}>
      <NewPost />
    </Container>
  );
}
