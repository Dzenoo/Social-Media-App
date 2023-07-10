"use client";
import { Button } from "@mui/material";
import classes from "../css/LandingPage.module.css";
import Image from "next/image";
import Link from "next/link";

const LandingPageNav = () => {
  return (
    <ul className={classes.landing_nav}>
      <div className={classes.logo_div}>
        <Link href="/">
          <Image src="/images/logo_blue.png" width={180} height={60} />
        </Link>
      </div>
      <div className={classes.button_div}>
        <Button variant="contained" size="large">
          <Link href="/signup" className="link_no_decoration">
            Sign Up
          </Link>
        </Button>
      </div>
    </ul>
  );
};

export default LandingPageNav;
