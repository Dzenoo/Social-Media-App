import { stories } from "@/constants/stories";
import Image from "next/image";
import React from "react";
import classes from "@/css/HomeNavbar.module.css";

const Stories = () => {
  return (
    <ul className={classes.stories}>
      {stories.map((story) => (
        <li className={classes.story} key={story.id}>
          <Image src={story.image} fill alt={story.name} />
          <span>{story.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default Stories;
