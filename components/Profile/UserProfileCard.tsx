"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Image from "next/image";
import classes from "../../css/Profile.module.css";
import React from "react";
import { User } from "@/types/user";

const UserProfileCard: React.FC<User> = ({
  isPrivate,
  userImage,
  firstName,
  lastName,
  email,
  posts,
  biography,
  followers,
  following,
  wideImage,
  followUser,
  isUserFollowed,
  isSended,
}) => {
  return (
    <Card className={classes.user_profile_card}>
      <Box className={classes.landingImage}>
        <Image src={wideImage} width={600} height={600} alt="profileimg" />
      </Box>
      <CardContent className={classes.profile_content}>
        <Box className={classes.profile_view_info}>
          <Image src={userImage} width={120} height={120} alt="landingimg" />
          <div>
            <Typography variant="h6" fontWeight="bold">
              {firstName} {lastName}
            </Typography>
            {!isPrivate && (
              <Typography color="textSecondary" variant="h6">
                {email}
              </Typography>
            )}
          </div>
        </Box>
        <Box className={classes.profile_view_flw}>
          <Typography variant="h6" className={classes.profile_flws}>
            <strong>{followers}</strong>
            followers
          </Typography>
          <Typography variant="h6" className={classes.profile_flws}>
            <strong>{following}</strong>
            following
          </Typography>{" "}
          <Typography variant="h6" className={classes.profile_flws}>
            <strong>{posts.length}</strong>
            posts
          </Typography>
        </Box>
        {!isUserFollowed && (
          <Button variant="contained" onClick={followUser}>
            {isSended ? "Sended request" : "Follow"}
          </Button>
        )}
      </CardContent>
      {!isPrivate && (
        <CardActions className={classes.profile_view_actions}>
          <Typography variant="h6" fontWeight="bold">
            Bio
          </Typography>
          <Typography color="textSecondary" variant="h6">
            {biography}
          </Typography>
        </CardActions>
      )}
    </Card>
  );
};

export default UserProfileCard;
