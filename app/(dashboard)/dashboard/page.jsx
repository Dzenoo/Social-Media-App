"use client";
import { Box, Container, Typography } from "@mui/material";
import { getUser } from "@/utils/functions";
import classes from "../../../css/Dashboard.module.css";
import Cards from "@/components/Dashboard/Cards";
import PostItem from "@/components/Posts/PostItem";
import NotificationItem from "@/components/Notifications/NotificationItem";

const Dashboard = async () => {
  const userId = JSON.parse(localStorage.getItem("userinfo"));
  const user = await getUser(userId.userId);
  const postItems = user.posts.slice(0, 2);
  const notificationItems = user.notifications.slice(0, 2);

  const obj = () => console.log("");

  return (
    <section className={classes.main_dashboard}>
      <Typography variant="h5" fontWeight="bold" sx={{ padding: "20px" }}>
        Dashboard
      </Typography>
      <Container maxWidth="xl" className={classes.main_cont}>
        <Cards
          posts={user?.posts.length}
          followers={user?.followers.length}
          likes={user?.posts.reduce(
            (count, post) => count + post.likes.length,
            0
          )}
          comments={user?.posts.reduce(
            (count, post) => count + post.comments.length,
            0
          )}
        />
        <Box className={classes.container_posts}>
          <Typography variant="h5" fontWeight="bold" sx={{ padding: "20px" }}>
            Recent Posts
          </Typography>
          {postItems.map((post) => (
            <PostItem
              description={post.description}
              likes={post.likes.length}
              comments={post.comments.length}
              shares={post.shares.length}
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
          {notificationItems.map((notification) => (
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
