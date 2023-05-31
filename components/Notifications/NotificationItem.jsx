"use client";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import classes from "../../css/Notifications.module.css";

const NotificationItem = ({ title, time, isActive, image }) => {
  const isNewNotifications = isActive
    ? ` ${classes.notification_item} ${classes.activeNotification} `
    : ` ${classes.notification_item}  ${classes.basic_notification}`;

  return (
    <Card className={isNewNotifications}>
      <Image
        src={image}
        width={60}
        height={60}
        alt="notifi_img"
        style={{ borderRadius: "100px", border: "1.2px solid grey" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography fontWeight="bold" variant="p">
          {title}
        </Typography>
        <Typography color="textSecondary">{time}</Typography>
      </Box>
    </Card>
  );
};

export default NotificationItem;
