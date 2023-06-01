"use client";
import { Box, Typography } from "@mui/material";
import { FadeLoader } from "react-spinners";
import classes from "../../../css/Notifications.module.css";
import useSwr from "swr";
import NotificationItem from "@/components/Notifications/NotificationItem";

const Notifications = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, loading } = useSwr(
    `/api/users/${userInfo.userId}`,
    fetcher
  );

  if (!data) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  return (
    <section className={classes.notifications_section}>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Notifications
        </Typography>
      </Box>
      <Box className={classes.notifications_container}>
        {data.notifications.map((not) => {
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
