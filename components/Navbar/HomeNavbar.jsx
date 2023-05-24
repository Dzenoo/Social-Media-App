"use client";
import Image from "next/image";
import Link from "next/link";
import classes from "../../css/HomeNavbar.module.css";
import { usePathname } from "next/navigation";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const HomeNavbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const token = JSON.parse(localStorage.getItem("userdata"));
  const user = JSON.parse(localStorage.getItem("userinfo"));

  return (
    <header className={classes.home_navbar}>
      <div>
        <Image src="/images/logo_blue.png" width={200} height={70} alt="logo" />
      </div>
      <div className={classes.nav_buttons}>
        {session?.user || token?.token ? (
          <Link
            className="link_no_decoration"
            href={pathname === "/" ? "/dashboard" : "/"}
          >
            {pathname === "/" ? "Go to dashboard" : "Go to home"}
          </Link>
        ) : (
          ""
        )}
      </div>
      {session?.user || token?.token ? (
        <div className={classes.nav_profile}>
          <Typography variant="p" fontWeight="bold">
            {session?.user.name || user.firstname
              ? session?.user.name || user.firstname.concat(" ", user.lastname)
              : "John Doe"}
          </Typography>
          <Image
            src={
              session?.user.image || user.image
                ? session?.user.image || user.image
                : "/images/setting.png"
            }
            width={48}
            height={48}
            alt="logo"
            style={{ borderRadius: "100px" }}
          />
        </div>
      ) : (
        ""
      )}
    </header>
  );
};
export default HomeNavbar;
