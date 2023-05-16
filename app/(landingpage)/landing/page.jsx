"use client";
import { Button, Typography } from "@mui/material";
import classes from "../../../css/LandingPage.module.css";
import Link from "next/link";

const LandingPage = () => {
  return (
    <section className={classes.landing_hero}>
      <div className={classes.landing_content}>
        <Typography variant="h2" fontWeight="bold">
          Discover the Power of{" "}
          <span className={classes.blue_span}>Social Media Analytics</span>
        </Typography>
        <Typography variant="p" color="textSecondary">
          Stay on top of your social media game with real-time analytics.
          Monitor key metrics, track engagement, and measure the success of your
          campaigns—all in one place.
        </Typography>
        <div className={classes.landing_buttons}>
          <Button variant="contained" fontWeight="bold" size="large">
            <Link href="/auth" className="link_no_decoration">
              Sign Up Today!
            </Link>
          </Button>
          <Button variant="contained" fontWeight="bold" size="large">
            <Link href="/auth" className="link_no_decoration">
              Log in to Account
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
