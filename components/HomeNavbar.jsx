"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "../css/HomeNavbar.module.css";
import { Button, Typography } from "@mui/material";

const HomeNavbar = () => {
  const pathname = usePathname();

  return (
    <header className={classes.home_navbar}>
      <div>
        <Image src="/images/logo_blue.png" width={200} height={70} alt="logo" />
      </div>
      <div className={classes.nav_buttons}>
        <Link
          className="link_no_decoration"
          href={pathname === "/dashboard" ? "/" : "/dashboard"}
        >
          {pathname === "/dashboard" ? "Go to home" : "Go to dashboard"}
        </Link>
        <Button variant="outlined">Logout</Button>
      </div>
      <div className={classes.nav_profile}>
        <Typography variant="h6" fontWeight="bold">
          John Doe
        </Typography>
        <Image src="/images/setting.png" width={60} height={60} />
      </div>
    </header>
  );
};

export default HomeNavbar;
