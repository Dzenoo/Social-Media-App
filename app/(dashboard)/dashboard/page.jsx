"use client";
import { Typography } from "@mui/material";
import classes from "../../../css/Dashboard.module.css";
import Cards from "@/components/Dashboard/Cards";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setdata] = useState();
  const userId = JSON.parse(localStorage.getItem("userinfo"));

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId?.userId}`, {
        cache: "no-store",
      });
      const responseData = await response.json();

      setdata(responseData);
    };
    fetchUser();
  }, []);

  return (
    <section className={classes.main_dashboard}>
      <Typography variant="h5" fontWeight="bold" sx={{ padding: "20px" }}>
        Dashboard
      </Typography>
      <Cards
        posts={data?.posts.length}
        followers={data?.followers.length}
        likes={data?.posts.reduce(
          (count, post) => count + post.likes.length,
          0
        )}
        comments={data?.posts.reduce(
          (count, post) => count + post.comments.length,
          0
        )}
      />
    </section>
  );
};

export default Dashboard;
