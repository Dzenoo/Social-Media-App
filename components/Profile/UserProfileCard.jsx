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

const UserProfileCard = ({
  isPrivate,
  userImage,
  firstName,
  lastName,
  email,
  posts,
  biography,
}) => {
  return (
    <Card className={classes.user_profile_card}>
      <Box className={classes.landingImage}>
        <Image
          src="/images/exampleimg.jpg"
          width={600}
          height={600}
          alt="profileimg"
        />
      </Box>
      <CardContent className={classes.profile_content}>
        <Box className={classes.profile_view_info}>
          <Image src={userImage} width={120} height={120} alt="landingimg" />
          <div>
            <Typography variant="h6" fontWeight="bold">
              {firstName} {lastName}
            </Typography>
            {!isPrivate && (
              <Typography color="textSecondary" variant="p">
                {email}
              </Typography>
            )}
          </div>
        </Box>
        <Box className={classes.profile_view_flw}>
          <Typography variant="p" className={classes.profile_flws}>
            <strong>1200</strong>
            followers
          </Typography>
          <Typography variant="p" className={classes.profile_flws}>
            <strong>12</strong>
            following
          </Typography>{" "}
          <Typography variant="p" className={classes.profile_flws}>
            <strong>{posts.length}</strong>
            posts
          </Typography>
        </Box>
        <Button variant="contained">Follow</Button>
      </CardContent>
      {!isPrivate && (
        <CardActions className={classes.profile_view_actions}>
          <Typography variant="h6" fontWeight="bold">
            Bio
          </Typography>
          <Typography color="textSecondary" variant="p">
            {biography}
          </Typography>
        </CardActions>
      )}
    </Card>
  );
};

export default UserProfileCard;
