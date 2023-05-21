"use client";
import { Button, Card, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import classes from "../../css/NewPostHome.module.css";
import Modale from "../Modal/Modal";
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

const Post = () => {
  const [commentIsOpen, setcommentIsOpen] = useState(false);
  const [isLiked, setisLiked] = useState(false);
  const [isEnteredShare, setisEnteredShare] = useState(false);

  const openShareContent = () => {
    setisEnteredShare(true);
  };

  const closeShareContent = () => {
    setisEnteredShare(false);
  };

  return (
    <Card className={classes.post_card}>
      <div className={classes.post_card_header}>
        <div className={classes.post_card_header_info}>
          <Image src="/images/setting.png" width={60} height={60} alt="img" />
          <div>
            <Link className="link_no_decoration" href="/userId">
              <Typography fontWeight="bold" variant="h6">
                John Doe
              </Typography>
            </Link>
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
        <Typography color="textSecondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </Typography>
      </div>
      <div className={classes.post_card_image}>
        <Image
          src="/images/exampleimg.jpg"
          width={400}
          height={400}
          alt="img"
        />
      </div>
      <div className={classes.post_card_actions}>
        <Button
          fullWidth
          className={classes.post_card_button}
          onClick={() => setisLiked((prevState) => !prevState)}
        >
          <Image
            src={!isLiked ? "/images/like.png" : "/images/like2.png"}
            width={30}
            height={30}
            alt="like"
          />
          Like
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
