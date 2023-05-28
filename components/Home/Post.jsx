"use client";
import { Button, Card, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "../../css/NewPostHome.module.css";
import Link from "next/link";

const CommentSection = () => {
  return (
    <div className={classes.comment_section}>
      <hr />
      <div className={classes.comment_div}>
        <Image src="/images/setting.png" width={60} height={60} />
        <form>
          <TextField placeholder="Comment new.." fullWidth />
        </form>
      </div>
      <Typography fontWeight="bold">All Comments</Typography>
      <div className={classes.comment_info}>
        <Image src="/images/setting.png" width={60} height={60} />
        <div>
          <Typography fontWeight="bold">John Doe</Typography>
          <Typography color="textSecondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Typography>
        </div>
      </div>
    </div>
  );
};

const ShareSection = ({ closeContent, openContent }) => {
  return (
    <div
      onMouseLeave={closeContent}
      onMouseEnter={openContent}
      className={classes.share_div_content}
    >
      <Image src="/images/linkedin.png" width={40} height={40} alt="linkedin" />{" "}
      <Image src="/images/linkedin.png" width={40} height={40} alt="linkedin" />{" "}
      <Image src="/images/linkedin.png" width={40} height={40} alt="linkedin" />
    </div>
  );
};

const Post = ({
  firstName,
  lastName,
  creatorImg,
  description,
  image,
  hashtags,
  date,
  location,
  userId,
  postId,
  likes,
}) => {
  const user = JSON.parse(localStorage.getItem("userinfo")); // user info
  const [isLiked, setIsLiked] = useState(likes.includes(user.userId)); // like state
  const [commentIsOpen, setcommentIsOpen] = useState(false); // comment state
  const [isEnteredShare, setisEnteredShare] = useState(false); // share state

  const openShareContent = () => setisEnteredShare(true); // open share div
  const closeShareContent = () => setisEnteredShare(false); // close share div

  // Logic for date //
  const createdDate = new Date(date);
  const currentTime = new Date();
  const timeDifference = currentTime - createdDate;
  const timeDifferenceHours = Math.floor(timeDifference / (1000 * 60 * 60));

  let formattedTimeDIfference = "";
  if (timeDifferenceHours > 0) {
    formattedTimeDIfference = `${timeDifferenceHours} hr ago`;
  } else {
    const timeDifferenceMinutes = Math.floor(timeDifference / (1000 * 60));
    formattedTimeDIfference = `${timeDifferenceMinutes} minutes ago`;
  }
  // Logic for date //

  // Like function //
  const likePost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        body: JSON.stringify({
          userId: user.userId,
        }),
      });
      if (response.ok) {
        setIsLiked((prevState) => !prevState);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={classes.post_card}>
      <div className={classes.post_card_header}>
        <div className={classes.post_card_header_info}>
          <Image
            src={creatorImg}
            width={78}
            height={78}
            alt="img"
            style={{ borderRadius: "100px" }}
          />
          <div>
            <Link
              className="link_no_decoration"
              href={userId === user?.userId ? "/" : `/${userId}`}
            >
              <Typography fontWeight="bold" variant="h6">
                {firstName} {lastName}
              </Typography>
            </Link>
            <Typography>{location}</Typography>
            <Typography color="textSecondary">
              {formattedTimeDIfference}
            </Typography>
          </div>
        </div>
        <span>
          <Button className={classes.post_card_button}>
            <Image src="/images/save.png" width={30} height={30} alt="save" />
          </Button>
        </span>
      </div>
      <div className={classes.post_card_header}>
        <Typography color="textSecondary">
          {description} <br />
          {hashtags.split(",").map((hs) => (
            <Link
              href={"/"}
              key={hs}
              style={{ color: "royalblue", textDecoration: "none" }}
            >
              {hs}
            </Link>
          ))}
        </Typography>
      </div>
      <div className={classes.post_card_image}>
        <Image src={image} width={400} height={400} alt="img" />
      </div>
      <div className={classes.post_card_actions}>
        <Button
          fullWidth
          className={classes.post_card_button}
          onClick={likePost}
        >
          <Image
            src={isLiked ? "/images/like2.png" : "/images/like.png"}
            width={30}
            height={30}
            alt="like"
          />
          Like {likes.length}
        </Button>
        <Button
          fullWidth
          className={classes.post_card_button}
          onClick={() => setcommentIsOpen((prevState) => !prevState)}
        >
          <Image
            src="/images/comment.png"
            width={30}
            height={30}
            alt="comment"
          />
          Comment
        </Button>
        {isEnteredShare && (
          <ShareSection
            closeContent={closeShareContent}
            openContent={openShareContent}
          />
        )}
        <Button
          fullWidth
          className={classes.post_card_button}
          onMouseEnter={openShareContent}
          onMouseLeave={closeShareContent}
        >
          <Image src="/images/share.png" width={30} height={30} alt="share" />
          Share
        </Button>
      </div>
      {/* Comments for post */}
      {commentIsOpen && <CommentSection />}
    </Card>
  );
};

export default Post;
