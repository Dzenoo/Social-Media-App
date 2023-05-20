"use client";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import classes from "../../css/Notifications.module.css";

const NotificationItem = ({ title, time, isActive }) => {
  const isNewNotifications = isActive
    ? ` ${classes.notification_item} ${classes.activeNotification} `
    : ` ${classes.notification_item}  ${classes.basic_notification}`;

  return (
    <Card className={isNewNotifications}>
      <Image
        src="/images/setting.png"
        width={60}
        height={60}
        alt="notifi_img"
      />
      <Box>
        <Typography fontWeight="bold" variant="h6">
          {title}
        </Typography>
        <Typography color="textSecondary">{time}</Typography>
      </Box>
    </Card>
  );
};

export default NotificationItem;
