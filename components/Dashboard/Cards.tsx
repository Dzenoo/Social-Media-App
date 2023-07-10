"use client";

import { Box, Card, Typography } from "@mui/material";
import classes from "../../css/Dashboard.module.css";
import Image from "next/image";
import React from "react";
import { CardsProps } from "@/types/dashboard";

const CARD = [
  {
    id: "c1",
    title: "Total Posted",
    num: "posts",
    img: "/images/setting.png",
  },
  {
    id: "c2",
    title: "New Followers",
    num: "followers",
    img: "/images/followers.png",
  },
  {
    id: "c3",
    title: "Total Likes",
    num: "likes",
    img: "/images/like.png",
  },
  {
    id: "c4",
    title: "Total Comments",
    num: "comments",
    img: "/images/comment.png",
  },
];

const Cards: React.FC<CardsProps> = ({ posts, followers, likes, comments }) => {
  return (
    <Box className={classes.container}>
      {CARD.map((card) => (
        <Card className={classes.card} key={card.id}>
          <Typography variant="h6" color="textPrimary" fontWeight="bold">
            {card.title}
          </Typography>
          <div className={classes.card_actions}>
            <Typography variant="h3" color="textPrimary" fontWeight="bold">
              {card.num === "posts" && posts}
              {card.num === "followers" && followers}
              {card.num === "likes" && likes}
              {card.num === "comments" && comments}
            </Typography>
            <div
              className={
                card.num === "posts"
                  ? classes.pst
                  : card.num === "followers"
                  ? classes.flw
                  : card.num === "likes"
                  ? classes.lis
                  : card.num === "comments"
                  ? classes.cmt
                  : ""
              }
            >
              <Image src={card.img} width={30} height={30} alt="img" />
            </div>
          </div>
        </Card>
      ))}
    </Box>
  );
};

export default Cards;
