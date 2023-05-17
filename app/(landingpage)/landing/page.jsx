"use client";
import { Button, Card, Typography } from "@mui/material";
import classes from "../../../css/LandingPage.module.css";
import Link from "next/link";
import Image from "next/image";

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
            <Link href="/signup" className="link_no_decoration">
              Sign Up Today!
            </Link>
          </Button>
          <Button variant="contained" fontWeight="bold" size="large">
            <Link href="/login" className="link_no_decoration">
              Log in to Account
            </Link>
          </Button>
        </div>
      </div>
      <div className={classes.cards}>
        <Card sx={{ maxWidth: "350px", padding: "20px" }}>
          <Image
            src="/images/analytics_icons.png"
            width={260}
            height={260}
            alt="analytics"
          />
          <Typography variant="h4" color="#006ccf" fontWeight="bold">
            Real-time Analytics
          </Typography>
          <Typography variant="p" color="textSecondary">
            Stay on top of your social media game with real-time analytics.
          </Typography>
        </Card>
        <Card sx={{ maxWidth: "350px", padding: "20px" }}>
          <Image
            src="/images/scheduling_icon.png"
            width={260}
            height={260}
            alt="analytics"
          />
          <Typography variant="h4" color="#006ccf" fontWeight="bold">
            Post Scheduling
          </Typography>
          <Typography variant="p" color="textSecondary">
            Effortlessly plan and schedule your social media content in advance.
          </Typography>
        </Card>
        <Card sx={{ maxWidth: "350px", padding: "20px" }}>
          <Image
            src="/images/insights_icon.png"
            width={260}
            height={260}
            alt="analytics"
          />
          <Typography variant="h4" color="#006ccf" fontWeight="bold">
            Competitive Insights
          </Typography>
          <Typography variant="p" color="textSecondary">
            Interact with your followers directly from our intuitive dashboard.{" "}
          </Typography>
        </Card>
      </div>
    </section>
  );
};

export default LandingPage;
