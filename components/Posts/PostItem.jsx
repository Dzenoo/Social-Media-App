"use client";
import { Box, Button, Card, Typography } from "@mui/material";
import classes from "../../css/Posts.module.css";
import Image from "next/image";

const PostItem = ({ openDeleteModal }) => {
  return (
    <Card className={classes.post_item}>
      <Box className={classes.img}>
        <Image src="/images/setting.png" width={100} height={100} />
        <Typography variant="p" color="textSecondary">
          Exciting news! We're launching a new product that will revolutionize
          the industry. Stay tuned for updates! Exciting news! We're launching a
          new product that will revolutionize the industry. Stay tuned for
          updates! Exciting news! We're launching a new product that will
          revolutionize the industry. Stay tuned for updates!
        </Typography>
      </Box>
      <Box className={classes.interactivity}>
        <div className={classes.interactive_item}>
          <div className={classes.interactive_background_like}>
            <Image src="/images/like.png" width={20} height={20} />
          </div>
          <strong>125</strong>
        </div>
        <div className={classes.interactive_item}>
          <div className={classes.interactive_background_comment}>
            <Image src="/images/comment.png" width={20} height={20} />
          </div>
          <strong>30</strong>
        </div>
        <div className={classes.interactive_item}>
          <div className={classes.interactive_background_share}>
            <Image src="/images/share.png" width={20} height={20} />
          </div>
          <strong>17</strong>
        </div>
      </Box>
      <Box className={classes.date}>
        <Image src="/images/calendar2.png" width={40} height={40} />
        <Typography fontWeight="bold">May 4, 2023</Typography>
      </Box>
      <Box className={classes.actions}>
        <div className={classes.action}>
          <Image src="/images/edit.png" width={40} height={40} />
          <Button>Edit</Button>
        </div>
        <div className={classes.action}>
          <Image src="/images/remove.png" width={40} height={40} />
          <Button sx={{ color: "red" }} onClick={openDeleteModal}>
            Delete
          </Button>
        </div>
      </Box>
    </Card>
  );
};

export default PostItem;
