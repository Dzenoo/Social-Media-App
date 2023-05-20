"use client";
import { Box, Button, Typography } from "@mui/material";
import classes from "../../../css/Notifications.module.css";
import NotificationItem from "@/components/Notifications/NotificationItem";

const Notifications = () => {
  return (
    <section className={classes.notifications_section}>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Notifications
        </Typography>
      </Box>
      <Box className={classes.notifications_buttons}>
        <Button variant="contained">All</Button>
        <Button variant="outlined">Following</Button>
        <Button variant="outlined">Archive</Button>
      </Box>
      <Box className={classes.notifications_container}>
        <NotificationItem
          title="Anna Srzand liked your post"
          time="2h ago"
          isActive={true}
        />
        <NotificationItem
          title="Jess mentioned you in Tennis List"
          isActive={false}
          time="2h ago"
        />
        <NotificationItem
          title="Anna Srzand liked your post"
          time="2h ago"
          isActive={false}
        />
      </Box>
    </section>
  );
};

export default Notifications;
