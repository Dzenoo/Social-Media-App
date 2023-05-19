"use client";
import { Button, Card, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import classes from "../../css/NewPostHome.module.css";

const Post = () => {
  return (
    <Card className={classes.post_card}>
      <div className={classes.post_card_header}>
        <div className={classes.post_card_header_info}>
          <Image src="/images/setting.png" width={60} height={60} alt="img" />
          <div>
            <Typography>John Doe</Typography>
            <Typography>12 minutes ago</Typography>
          </div>
        </div>
        <span>
          <Button className={classes.post_card_button}>
            <Image src="/images/save.png" width={30} height={30} alt="save" />
          </Button>
        </span>
      </div>
      <div className={classes.post_card_header}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </Typography>
      </div>
      <div className={classes.post_card_image}>
        <Image src="/images/setting.png" width={100} height={100} alt="img" />
      </div>
      <div className={classes.post_card_actions}>
        <Button fullWidth className={classes.post_card_button}>
          <Image src="/images/like.png" width={30} height={30} alt="like" />
          Like
        </Button>
        <Button fullWidth className={classes.post_card_button}>
          <Image
            src="/images/comment.png"
            width={30}
            height={30}
            alt="comment"
          />
          Comment
        </Button>
        <Button fullWidth className={classes.post_card_button}>
          <Image src="/images/share.png" width={30} height={30} alt="share" />
          Share
        </Button>
      </div>
    </Card>
  );
};

export default Post;
