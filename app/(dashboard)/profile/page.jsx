"use client";
import {
  Box,
  Button,
  Card,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import classes from "../../../css/Profile.module.css";
import Link from "next/link";
import Image from "next/image";
import Modale from "@/components/Modal/Modal";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

const Profile = () => {
  const [user, setuser] = useState();
  const [isEdit, setisEdit] = useState(false);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const openModal = () => setmodalIsOpen(true);
  const closeModal = () => setmodalIsOpen(false);

  const userInfo = JSON.parse(localStorage.getItem("userinfo"));

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userInfo.userId}`, {
        cache: "no-store",
        next: { revalidate: 2 },
      });
      const responseData = await response.json();
      setuser(responseData);
    };
    fetchUser();
  }, []);

  const changeUserPrivate = async () => {
    try {
      const response = await fetch(`/api/users/${userInfo.userId}`, {
        method: "PATCH",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

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
            src={user?.image}
            style={{ borderRadius: "100px" }}
            width={200}
            height={200}
            alt="profile"
          />
          <div className={classes.profile_nm}>
            <div className={classes.edit_inputs}>
              {!isEdit ? (
                <Typography variant="h4" fontWeight="bold">
                  {user?.first_name.concat(" ", user?.last_name)}
                </Typography>
              ) : (
                <TextField label="Edit name" defaultValue={user?.first_name} />
              )}
              {!isEdit ? (
                <Typography variant="p" color="textSecondary">
                  {user?.email}
                </Typography>
              ) : (
                <TextField label="Edit email" defaultValue={user?.email} />
              )}
            </div>
            <div className={classes.profile_followers_info}>
              <Typography className={classes.typo_profile} variant="p">
                <strong>{user?.followers.length}</strong>
                followers
              </Typography>
              <Typography className={classes.typo_profile} variant="p">
                <strong>{user?.following.length}</strong>
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
          {!isEdit ? (
            <Typography color="textSecondary">{user?.biography}</Typography>
          ) : (
            <textarea
              className={classes.profile_textarea}
              defaultValue={user?.biography}
            ></textarea>
          )}
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
            <Switch
              onClick={changeUserPrivate}
              defaultChecked={user?.isPrivate}
            />
            Turn my profile private
          </div>
        </div>
      </Box>
      <Modale
        isOpen={modalIsOpen}
        close={closeModal}
        text="Are you sure you want to your profile?"
        title="Deleting Profile Confirmation"
      />
      <div className={classes.profile_buttons}>
        <Button variant="outlined" onClick={openModal} color="error">
          Delete account?
        </Button>
        <Button
          variant="contained"
          onClick={() => setisEdit((prevState) => !prevState)}
        >
          {!isEdit ? "Edit" : "Save"}
        </Button>
      </div>
    </section>
  );
};

export default Profile;
