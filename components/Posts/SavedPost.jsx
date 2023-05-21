"use client";

import Image from "next/image";
import Link from "next/link";

const SavedPost = () => {
  return (
    <Link href="/">
      <Image src="/images/exm.jpg" width={400} height={400} alt="savedpost" />
    </Link>
  );
};

export default SavedPost;
