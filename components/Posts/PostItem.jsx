"use client";
import { Box, Button, Card, Typography } from "@mui/material";
import classes from "../../css/Posts.module.css";
import Image from "next/image";
import Link from "next/link";

const PostItem = ({
  openDeleteModal,
  description,
  likes,
  comments,
  shares,
  date,
  id,
  image,
}) => {
  return (
    <Card className={classes.post_item}>
      <Box className={classes.img}>
        <Image alt="img" src={image} width={100} height={100} />
        <Typography variant="p" color="textSecondary">
          {description}
        </Typography>
      </Box>
      <Box className={classes.interactivity}>
        <div className={classes.interactive_item}>
          <div className={classes.interactive_background_like}>
            <Image alt="img" src="/images/like.png" width={20} height={20} />
          </div>
          <strong>{likes}</strong>
        </div>
        <div className={classes.interactive_item}>
          <div className={classes.interactive_background_comment}>
            <Image alt="img" src="/images/comment.png" width={20} height={20} />
          </div>
          <strong>{comments}</strong>
        </div>
        <div className={classes.interactive_item}>
          <div className={classes.interactive_background_share}>
            <Image alt="img" src="/images/share.png" width={20} height={20} />
          </div>
          <strong>{shares}</strong>
        </div>
      </Box>
      <Box className={classes.date}>
        <Image alt="img" src="/images/calendar2.png" width={40} height={40} />
        <Typography fontWeight="bold">{date}</Typography>
      </Box>
      <Box className={classes.actions}>
        <div className={classes.action}>
          <Image alt="img" src="/images/edit.png" width={40} height={40} />
          <Button>
            <Link className="link_no_decoration" href={`/posts/${id}`}>
              Edit
            </Link>
          </Button>
        </div>
        <div className={classes.action}>
          <Image alt="img" src="/images/remove.png" width={40} height={40} />
          <Button sx={{ color: "red" }} onClick={openDeleteModal}>
            Delete
          </Button>
        </div>
      </Box>
    </Card>
  );
};

export default PostItem;
