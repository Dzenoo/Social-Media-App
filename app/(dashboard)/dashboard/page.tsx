"use client";

import { Box, Container, Typography } from "@mui/material";
import { FadeLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "../../../css/Dashboard.module.css";
import Cards from "@/components/Dashboard/Cards";
import PostItem from "@/components/Posts/PostItem";
import useSwr from "swr";
import NotificationItem from "@/components/Notifications/NotificationItem";
import { PostProps } from "@/types/posts";
import { NotificationProps } from "@/types/notification";

const Dashboard = async () => {
  const userInfo =
    typeof window !== "undefined" && localStorage.getItem("userinfo")
      ? JSON.parse(localStorage.getItem("userinfo")!)
      : null;

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSwr(
    `/api/users/${userInfo.userId}`,
    fetcher
  );

  if (!data || isLoading) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  if (error) {
    return toast.error("Something get wrong");
  }

  const postItems = data.posts.slice(0, 3);
  const recentPosts = postItems.sort(
    (a: { createdAt: string }, b: { createdAt: string }) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const notificationItems = data.notifications.slice(0, 3);

  const obj = () => console.log("");

  return (
    <section className={classes.main_dashboard}>
      <ToastContainer />
      <Typography variant="h5" fontWeight="bold" sx={{ padding: "20px" }}>
        Dashboard
      </Typography>
      <Container maxWidth="xl" className={classes.main_cont}>
        <Cards
          posts={data?.posts.length}
          followers={data?.followers.length}
          likes={data?.posts.reduce(
            (count: number, post: PostProps) => count + post.likes.length,
            0
          )}
          comments={data?.posts.reduce(
            (count: number, post: PostProps) => count + post.comments.length,
            0
          )}
        />
        <Box className={classes.container_posts}>
          <Typography variant="h5" fontWeight="bold" sx={{ padding: "20px" }}>
            Recent Posts
          </Typography>
          {recentPosts.map((post: PostProps) => (
            <PostItem
              description={post.description}
              likes={post.likes.length}
              comments={post.comments.length}
              date={post.createdAt}
              image={post.image}
              hashtags={post.hashtags}
              id={post._id}
              key={post._id}
              show={false}
              openDeleteModal={obj}
            />
          ))}
        </Box>
        <Box className={classes.container_posts}>
          <Typography variant="h5" fontWeight="bold" sx={{ padding: "20px" }}>
            Recent Notifications
          </Typography>
          {notificationItems.map((notification: NotificationProps) => (
            <NotificationItem
              key={notification._id}
              title={notification.message}
              image={notification.image}
              time={new Date(notification.date).toLocaleDateString()}
            />
          ))}
        </Box>
      </Container>
    </section>
  );
};

export default Dashboard;
