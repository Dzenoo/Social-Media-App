"use client";

import UserProfileCard from "@/components/Profile/UserProfileCard";
import { Container } from "@mui/material";

const UserProfile = () => {
  return (
    <Container maxWidth="lg">
      {/* PRofile Card */}
      <UserProfileCard />
    </Container>
  );
};

export default UserProfile;
