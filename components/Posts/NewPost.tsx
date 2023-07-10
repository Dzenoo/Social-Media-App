"use client";
import { Button, Card, TextField } from "@mui/material";
import classes from "../../css/NewPostHome.module.css";
import Image from "next/image";

const NewPost = () => {
  return (
    <Card
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "1.2em",
      }}
    >
      <div className={classes.comment_div}>
        <Image src="/images/setting.png" width={60} height={60} alt="img" />
        <form>
          <TextField placeholder="What's on your mind?" fullWidth />
        </form>
      </div>
      <div className={classes.comment_actions}>
        <Button variant="contained" size="large">
          Post
        </Button>
      </div>
    </Card>
  );
};

export default NewPost;
