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
  date,
  id,
  image,
  hashtags,
  show,
}) => {
  const createdDate = new Date(date);
  const currentTime = new Date();
  const timeDifference = currentTime - createdDate;
  const timeDifferenceHours = Math.floor(timeDifference / (1000 * 60 * 60));

  let formattedTimeDIfference = "";
  if (timeDifferenceHours > 0) {
    formattedTimeDIfference = `${timeDifferenceHours}hr ago`;
  } else {
    const timeDifferenceMinutes = Math.floor(timeDifference / (1000 * 60));
    formattedTimeDIfference = `${timeDifferenceMinutes} minutes ago`;
  }

  return (
    <Card className={classes.post_item}>
      <Box className={classes.img}>
        <Image alt="img" src={image} width={100} height={100} />
        <Typography variant="p" color="textSecondary">
          {description}
        </Typography>
        <Typography
          variant="p"
          color="textSecondary"
          sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
        >
          {hashtags.split(", ").map((hs) => {
            const formatted = hs.slice(1);
            return (
              <Link
                href={`/hashtag/${formatted}`}
                key={hs}
                style={{ color: "royalblue", textDecoration: "none" }}
              >
                {hs}
              </Link>
            );
          })}
        </Typography>
      </Box>
      {show && (
        <Box className={classes.interactivity}>
          <div className={classes.interactive_item}>
            <div className={classes.interactive_background_like}>
              <Image alt="img" src="/images/like.png" width={20} height={20} />
            </div>
            <strong>{likes}</strong>
          </div>
          <div className={classes.interactive_item}>
            <div className={classes.interactive_background_comment}>
              <Image
                alt="img"
                src="/images/comment.png"
                width={20}
                height={20}
              />
            </div>
            <strong>{comments}</strong>
          </div>
        </Box>
      )}
      {show && (
        <Box className={classes.date}>
          <Image alt="img" src="/images/calendar2.png" width={40} height={40} />
          <Typography fontWeight="bold">{formattedTimeDIfference}</Typography>
        </Box>
      )}
      {show && (
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
      )}
    </Card>
  );
};

export default PostItem;
