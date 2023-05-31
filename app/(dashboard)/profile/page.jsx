"use client";
import { Box, Button, Card, Switch, Typography } from "@mui/material";
import classes from "../../../css/Profile.module.css";
import Link from "next/link";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getUser } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Profile = async () => {
  const { logout } = useAuth();
  const router = useRouter();
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const user = await getUser(userInfo.userId);

  const changeUserPrivate = async () => {
    try {
      const response = await fetch(`/api/users/${userInfo.userId}`, {
        method: "PATCH",
      });

      if (response.ok) {
        toast.success("Profile Updated");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(`/api/users/${userInfo.userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Profile Deleted");
        router.push("/");
        logout();
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <section className={classes.profile_section}>
      <ToastContainer />
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
              <Typography variant="h4" fontWeight="bold">
                {user?.first_name.concat(" ", user?.last_name)}
              </Typography>
              <Typography variant="p" color="textSecondary">
                {user?.email}
              </Typography>
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
        <Link
          href={`/profile/${userInfo?.userId}`}
          className="link_no_decoration"
        >
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
          <Typography color="textSecondary">{user?.biography}</Typography>
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
      <div className={classes.profile_buttons}>
        <Button variant="outlined" onClick={deleteUser} color="error">
          Delete account?
        </Button>
      </div>
    </section>
  );
};

export default Profile;
