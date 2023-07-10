"use client";

import { Link } from "@mui/material";
import Image from "next/image";

const SavedPost = ({ image, postId }) => {
  return (
    <Link href={`/post/${postId}`}>
      <Image src={image} width={400} height={400} alt="savedpost" />
    </Link>
  );
};

export default SavedPost;
