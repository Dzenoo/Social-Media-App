"use client";
import { Box, Typography } from "@mui/material";
import classes from "../../../css/Notifications.module.css";
import NotificationItem from "@/components/Notifications/NotificationItem";
import { getUser } from "@/utils/functions";

const Notifications = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const user = await getUser(userInfo.userId);

  return (
    <section className={classes.notifications_section}>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Notifications
        </Typography>
      </Box>
      <Box className={classes.notifications_container}>
        {user.notifications.map((not) => {
          return (
            <NotificationItem
              key={not._id}
              title={not.message}
              time={new Date(not.date).toLocaleDateString()}
              image={not.image}
              isActive={true}
            />
          );
        })}
      </Box>
    </section>
  );
};

export default Notifications;
