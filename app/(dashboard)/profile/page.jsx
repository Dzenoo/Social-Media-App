"use client";
import { Box, Button, Card, Switch, Typography } from "@mui/material";
import classes from "../../../css/Profile.module.css";
import Link from "next/link";
import Image from "next/image";
import Modale from "@/components/Modal/Modal";
import { useState } from "react";

const Profile = () => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const openModal = () => setmodalIsOpen(true);
  const closeModal = () => setmodalIsOpen(false);

  return (
    <section className={classes.profile_section}>
      <Box>
        <Typography fontWeight="bold" variant="h4">
          Profile
        </Typography>
      </Box>
      <Box className={classes.profile_container}>
        <div className={classes.profile_info}>
          <Image
            src="/images/setting.png"
            width={200}
            height={200}
            alt="profile"
          />
          <div className={classes.profile_nm}>
            <div>
              <Typography variant="h4" fontWeight="bold">
                John Doe
              </Typography>
              <Typography variant="p" color="textSecondary">
                johndoe@gmail.com
              </Typography>
            </div>
            <div className={classes.profile_followers_info}>
              <Typography className={classes.typo_profile} variant="p">
                <strong>1200</strong>
                followers
              </Typography>
              <Typography className={classes.typo_profile} variant="p">
                <strong>12</strong>
                following
              </Typography>
            </div>
          </div>
        </div>
        <Link href="/profile/userId" className="link_no_decoration">
          <Card className={classes.profile_saved}>
            <Image
              src="/images/save.png"
              width={30}
              height={30}
              alt="profile"
            />
            <Typography fontWeight="bold">Saved Posts</Typography>
          </Card>
        </Link>
      </Box>
      <Box className={classes.profile_edit_info}>
        <div>
          <Typography fontWeight="bold" variant="h6">
            Biography
          </Typography>
          <textarea className={classes.profile_textarea}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </textarea>
        </div>
        <div>
          <Typography fontWeight="bold" variant="h6">
            Notifications
          </Typography>
          <div className={classes.profile_actions}>
            <Switch />
            Send me notifications
          </div>
        </div>
        <div>
          <Typography fontWeight="bold" variant="h6">
            Privacy
          </Typography>
          <div className={classes.profile_actions}>
            <Switch />
            Turn my profile public
          </div>
        </div>
      </Box>
      <Modale
        isOpen={modalIsOpen}
        close={closeModal}
        text="Are you sure you want to your profile?"
        title="Deleting Profile Confirmation"
      />
      <Button
        variant="outlined"
        onClick={openModal}
        color="error"
        className={classes.delete_acc}
      >
        Delete account?
      </Button>
    </section>
  );
};

export default Profile;
