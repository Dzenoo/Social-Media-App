"use client";
import { Button, Card, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import classes from "../../css/NewPostHome.module.css";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

const CommentSection = ({
  userImg,
  setComment,
  comment,
  userName,
  postId,
  comments,
  isLoading,
  setisLoading,
}) => {
  const commentPost = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        body: JSON.stringify({
          commentText: comment,
          userImage: userImg,
          userName: userName,
        }),
      });

      if (response.ok) {
        setisLoading(false);
        toast.success("Successfully commented!");
      }
    } catch (error) {
      setisLoading(false);
      toast.error(error);
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  return (
    <div className={classes.comment_section}>
      <hr />
      <div className={classes.comment_div}>
        <Image
          src={userImg}
          width={60}
          height={60}
          style={{ borderRadius: "100px" }}
        />
        <form className={classes.comment_form} onSubmit={commentPost}>
          <TextField
            placeholder="Comment new.."
            fullWidth
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Comment
          </Button>
        </form>
      </div>
      <Typography fontWeight="bold">All Comments</Typography>
      <div className={classes.comment_info}>
        {comments.map((comment) => (
          <div className={classes.comments_div_inline}>
            <Image
              src={comment.userImage}
              width={60}
              height={60}
              style={{ borderRadius: "100px" }}
              alt={comment.userName}
            />
            <div>
              <Typography fontWeight="bold">{comment.userName}</Typography>
              <Typography color="textSecondary">{comment.content}</Typography>
            </div>
          </div>
        ))}
      </div>
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
  comments,
}) => {
  const user = JSON.parse(localStorage.getItem("userinfo")); // user info
  const [isLoading, setisLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(likes.includes(user?.userId)); // like state
  const [comment, setComment] = useState(""); // comment state
  const [commentIsOpen, setcommentIsOpen] = useState(false); // isComment state

  // Logic for date //
  const createdDate = new Date(date);
  const currentTime = new Date();
  const timeDifference = currentTime - createdDate;
  const timeDifferenceHours = Math.floor(timeDifference / (1000 * 60 * 60));

  let formattedTimeDifference = "";
  if (timeDifferenceHours >= 24) {
    const timeDifferenceDays = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    formattedTimeDifference = `${timeDifferenceDays} ${
      timeDifferenceDays === 1 ? "day" : "days"
    } ago`;
  } else if (timeDifferenceHours > 0) {
    formattedTimeDifference = `${timeDifferenceHours} hr ago`;
  } else {
    const timeDifferenceMinutes = Math.floor(timeDifference / (1000 * 60));
    formattedTimeDifference = `${timeDifferenceMinutes} minutes ago`;
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
        toast.success("Post liked!");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const savePost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "POST",
        body: JSON.stringify({ userId: user.userId }),
      });

      if (response.ok) {
        toast.success("Post saved!");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <Card className={classes.post_card}>
      <div className={classes.post_card_header}>
        <div className={classes.post_card_header_info}>
          <Link
            className="link_no_decoration"
            href={userId === user?.userId ? "/" : `/${userId}`}
          >
            <Image
              src={creatorImg}
              width={78}
              height={78}
              alt="img"
              style={{ borderRadius: "100px" }}
            />
          </Link>
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
              {formattedTimeDifference}
            </Typography>
          </div>
        </div>
        <span>
          <Button className={classes.post_card_button} onClick={savePost}>
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
        <Link href={`/post/${postId}`}>
          <Image src={image} width={400} height={400} alt="img" />
        </Link>
      </div>
      <div className={classes.post_card_actions}>
        {userId === user?.userId ? (
          ""
        ) : (
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
        )}
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
          Comment {comments.length}
        </Button>
      </div>
      {/* Comments for post */}
      {commentIsOpen && (
        <CommentSection
          userImg={user?.image}
          userName={user?.firstname.concat(" ", user?.lastname)}
          postId={postId}
          setComment={setComment}
          comment={comment}
          comments={comments}
          isLoading={isLoading}
          setisLoading={setisLoading}
        />
      )}
      <ToastContainer />
    </Card>
  );
};

export default Post;
