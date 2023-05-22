"use client";
import Image from "next/image";
import Link from "next/link";
import classes from "../../css/HomeNavbar.module.css";
import { usePathname } from "next/navigation";
import { Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const HomeNavbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className={classes.home_navbar}>
      <div>
        <Image src="/images/logo_blue.png" width={200} height={70} alt="logo" />
      </div>
      <div className={classes.nav_buttons}>
        {session?.user && (
          <Link
            className="link_no_decoration"
            href={pathname === "/" ? "/dashboard" : "/"}
          >
            {pathname === "/" ? "Go to dashboard" : "Go to home"}
          </Link>
        )}
      </div>
      {session?.user && (
        <div className={classes.nav_profile}>
          <Typography variant="p" fontWeight="bold">
            {session?.user.name ? session?.user.name : "John Doe"}
          </Typography>
          <Image
            src={
              session?.user.image ? session?.user.image : "/images/setting.png"
            }
            width={48}
            height={48}
            alt="logo"
            style={{ borderRadius: "100px" }}
          />
        </div>
      )}
    </header>
  );
};
export default HomeNavbar;
