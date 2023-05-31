"use client";
import { Box, Container, Typography } from "@mui/material";
import { getUser } from "@/utils/functions";
import classes from "../../../css/Dashboard.module.css";
import Cards from "@/components/Dashboard/Cards";
import PostItem from "@/components/Posts/PostItem";

const Dashboard = async () => {
  const userId = JSON.parse(localStorage.getItem("userinfo"));
  const user = await getUser(userId.userId);

  console.log(user.posts[0].description);

  const obj = () => console.log("");

  const postItems = user.posts.slice(0, 2);

  console.log(Array.isArray(postItems));
  console.log(postItems);

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
      </Container>
    </section>
  );
};

export default Dashboard;
