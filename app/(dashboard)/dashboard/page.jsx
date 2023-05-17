"use client";
import { Typography } from "@mui/material";
import classes from "../../../css/Dashboard.module.css";
import Cards from "@/components/Dashboard/Cards";

const Dashboard = () => {
  return (
    <section className={classes.main_dashboard}>
      <Typography variant="h5" fontWeight="bold" sx={{ padding: "20px" }}>
        Dashboard
      </Typography>
      {/* Cards */}
      <Cards posts={40} followers={60} likes={20} comments={20} />
      {/* Line Chart */}
    </section>
  );
};

export default Dashboard;
``;
