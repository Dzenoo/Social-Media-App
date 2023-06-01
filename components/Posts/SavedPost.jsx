"use client";

import Image from "next/image";

const SavedPost = ({ image }) => {
  return (
    <>
      <Image src={image} width={400} height={400} alt="savedpost" />
    </>
  );
};

export default SavedPost;
