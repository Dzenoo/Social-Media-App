"use client";
import {
  Box,
  Button,
  Card,
  Container,
  Switch,
  Typography,
} from "@mui/material";
import classes from "../../../css/Profile.module.css";
import useSwr from "swr";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import SavedPost from "@/components/Posts/SavedPost";

const Profile = async () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userinfo"))
      : null;
  const { data, error, loading } = useSwr(
    `/api/users/${userInfo.userId}`,
    fetcher
  );
  const { logout } = useAuth();
  const [isShowing, setisShowing] = useState(false);
  const [imageValue, setimageValue] = useState("");
  const router = useRouter();

  if (!data || loading) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  if (error) {
    return toast.error("Something get wrong");
  }

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

  const handleCoverImageChange = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const imageUrl = fileReader.result;
      setimageValue(imageUrl);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const changeImageHandler = async (e) => {
    e.preventDefault();

    try {
      await fetch(`/api/users/${userInfo.userId}/change`, {
        method: "PATCH",
        body: JSON.stringify({
          coverImage: imageValue,
        }),
      });
    } catch (error) {
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
            src={data?.image}
            style={{ borderRadius: "100px" }}
            width={200}
            height={200}
            alt="profile"
          />
          <div className={classes.profile_nm}>
            <div className={classes.edit_inputs}>
              <Typography variant="h4" fontWeight="bold">
                {data?.first_name.concat(" ", data?.last_name)}
              </Typography>
              <Typography variant="p" color="textSecondary">
                {data?.email}
              </Typography>
            </div>
            <div className={classes.profile_followers_info}>
              <Typography className={classes.typo_profile} variant="p">
                <strong>{data?.followers.length}</strong>
                followers
              </Typography>
              <Typography className={classes.typo_profile} variant="p">
                <strong>{data?.following.length}</strong>
                following
              </Typography>{" "}
              <Typography className={classes.typo_profile} variant="p">
                <strong>{data?.posts.length}</strong>
                posts
              </Typography>
            </div>
          </div>
        </div>
        <form className={classes.coverForm} onSubmit={changeImageHandler}>
          <Typography>Change Cover Image</Typography>
          <Image src={data?.wideImage} width={600} height={200} alt="profimg" />
          <input
            type="file"
            accept="image/*"
            required={true}
            onChange={handleCoverImageChange}
          />
          <Button type="submit" variant="contained">
            Change Image
          </Button>
        </form>
        <Card
          className={classes.profile_saved}
          onClick={() => setisShowing(!isShowing)}
        >
          <Image src="/images/save.png" width={30} height={30} alt="profile" />
          <Typography fontWeight="bold">Saved Posts</Typography>
        </Card>
      </Box>
      <Box className={classes.profile_edit_info}>
        <div>
          <Typography fontWeight="bold" variant="h6">
            Biography
          </Typography>
          <Typography color="textSecondary">{data?.biography}</Typography>
        </div>
        <div>
          <Typography fontWeight="bold" variant="h6">
            Privacy
          </Typography>
          <div className={classes.profile_actions}>
            <Switch
              onClick={changeUserPrivate}
              defaultChecked={data?.isPrivate}
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
      {isShowing && (
        <Container maxWidth="xl" className={classes.saved_posts_container}>
          {data?.savedPosts.length === 0 && (
            <Typography textAlign="center" fontWeight="bold">
              No saved posts
            </Typography>
          )}
          {data?.savedPosts.map((post) => (
            <SavedPost postId={post._id} image={post.image} />
          ))}
        </Container>
      )}
    </section>
  );
};

export default Profile;
