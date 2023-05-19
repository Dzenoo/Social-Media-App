"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeNavbar = () => {
  const pathname = usePathname();

  return (
    <header>
      <div>
        <Image src="/images/logo_blue.png" width={200} height={70} alt="logo" />
        <Link href={pathname === "/dashboard" ? "/" : "/dashboard"}>
          {pathname === "/dashboard" ? "Go to home" : "Go to dashboard"}
        </Link>
      </div>
    </header>
  );
};

export default HomeNavbar;
