"use client";
import { Typography } from "@mui/material";
import classes from "../../../css/Auth.module.css";
import Link from "next/link";
import SignupForm from "@/components/Auth/SignupForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FadeLoader } from "react-spinners";
import { useAuth } from "@/hooks/useAuth";
import { UserSignupData } from "@/types/user";

const Signup = () => {
  const [isLoading, setisLoading] = useState(false);
  const { login } = useAuth();
  const token =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userdata"))
      : null;

  const router = useRouter();

  useEffect(() => {
    if (token?.token) {
      router.replace("/");
    } else {
      setisLoading(false);
    }
  }, [router]);

  const onSubmitSignup = async (userData: UserSignupData) => {
    setisLoading(true);
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        cache: "force-cache",
      });

      const resdata = await response.json();
      login(resdata.token);

      const userInfo = {
        firstname: resdata.firstname,
        lastname: resdata.lastname,
        image: resdata.image,
        userId: resdata.userId,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("userinfo", JSON.stringify(userInfo));
      }
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      setisLoading(false);
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  return (
    <section className={classes.auth_section}>
      <div className={classes.empty_div}></div>
      <div className={classes.form_div}>
        <Typography color="#333" variant="h4" fontWeight="bold">
          CREATE ACCOUNT
        </Typography>
        <Typography color="textSecondary">
          Join our community today by filling out our simple signup form and
          start enjoying exclusive benefits
        </Typography>
        <SignupForm classes={classes} onSubmitSignup={onSubmitSignup} />
        <Typography>
          You already have account? <Link href="/login">Click here</Link>
        </Typography>
      </div>
    </section>
  );
};

export default Signup;
