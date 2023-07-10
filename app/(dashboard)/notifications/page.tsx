"use client";
import { Box, Typography } from "@mui/material";
import { FadeLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import classes from "../../../css/Notifications.module.css";
import useSwr from "swr";
import NotificationItem from "@/components/Notifications/NotificationItem";
import { NotificationProps } from "@/types/notification";

const Notifications = async () => {
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userinfo"))
      : null;
  const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());
  const { data, error, loading } = useSwr(
    `/api/users/${userInfo.userId}`,
    fetcher
  );

  if (!data || loading) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  if (error) {
    return toast.error("Something get wrong");
  }

  return (
    <section className={classes.notifications_section}>
      <ToastContainer />
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Notifications and Follow Requests
        </Typography>
      </Box>
      <Box className={classes.notifications_container}>
        {data.notifications.map((not: NotificationProps) => {
          return (
            <NotificationItem
              key={not._id}
              title={not.message}
              time={new Date(not.date).toLocaleDateString()}
              image={not.image}
              showImage={true}
              showButtons={false}
              onAccept={""}
            />
          );
        })}
        {data.followRequests.map((requestingUser) => {
          const acceptFollowRequest = async () => {
            const response = await fetch(
              `/api/users/${requestingUser._id}/accept`,
              {
                method: "POST",
                body: JSON.stringify({
                  userIdToAccept: userInfo.userId,
                }),
              }
            );

            if (response.ok) {
              toast.success("You accepted request");
            }
          };

          return (
            <div>
              <NotificationItem
                key={requestingUser._id}
                title={
                  requestingUser.first_name +
                  " " +
                  requestingUser.last_name +
                  " " +
                  "wants to follow you"
                }
                showImage={false}
                time={new Date().toLocaleDateString()}
                onAccept={acceptFollowRequest}
                showButtons={true}
                image={undefined}
              />
            </div>
          );
        })}
      </Box>
    </section>
  );
};

export default Notifications;
