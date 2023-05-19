"use client";
import Image from "next/image";
import classes from "../css/Sidebar.module.css";
import Link from "next/link";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

const Sidebar = () => {
  const [barIsOpen, setbarIsOpen] = useState(false);
  const toggle = () => setbarIsOpen(!barIsOpen);
  const activeClassNames = barIsOpen
    ? `${classes.sidebar} ${classes.open}`
    : `${classes.sidebar} ${classes.closed}`;

  return (
    <nav className={activeClassNames}>
      <Button onClick={toggle} variant="outlined">
        Menu
      </Button>
      <ul className={classes.sidebar_list}>
        <li>
          <Link href="/dashboard">
            <Image
              src="/images/dashboard.png"
              width={30}
              height={30}
              alt="dashboard"
            />
            <Typography>Dashboard</Typography>
          </Link>
        </li>
        <li>
          <Link href="/posts">
            <Image src="/images/posts.png" width={30} height={30} alt="posts" />
            <Typography>Posts</Typography>
          </Link>
        </li>
        <li>
          <Link href="/analytics">
            <Image
              src="/images/analytics.png"
              width={30}
              height={30}
              alt="analytics"
            />
            <Typography>Analytics</Typography>
          </Link>
        </li>
        <li>
          <Link href="/notifications">
            <Image
              src="/images/notifications.png"
              width={30}
              height={30}
              alt="notifications"
            />
            <Typography>Notifications</Typography>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <Image
              src="/images/profile.png"
              width={30}
              height={30}
              alt="profile"
            />
            <Typography>Profile</Typography>
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <Image
              src="/images/logout.png"
              width={30}
              height={30}
              alt="dashboard"
            />
            <Typography>Logout</Typography>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
