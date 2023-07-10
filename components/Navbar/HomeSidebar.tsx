import { sidebarItems } from "@/constants/sidebar";
import { Card, Typography } from "@mui/material";
import classes from "../../css/HomeNavbar.module.css";
import Image from "next/image";
import React from "react";

const HomeSidebar = () => {
  return (
    <ul className={classes.home_sidebar}>
      {sidebarItems.map((item: { id: string; icon: string; text: string }) => (
        <li key={item.id} className={classes.home_sidebar_item}>
          <Image src={item.icon} width={30} height={30} alt={item.text} />
          <Typography>{item.text}</Typography>
        </li>
      ))}
    </ul>
  );
};

export default HomeSidebar;
