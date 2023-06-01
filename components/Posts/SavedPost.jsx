"use client";

import Image from "next/image";
import Link from "next/link";

const SavedPost = ({ image, postId }) => {
  return (
    <Link href={`/posts/${postId}`}>
      <Image src={image} width={400} height={400} alt="savedpost" />
    </Link>
  );
};

export default SavedPost;
