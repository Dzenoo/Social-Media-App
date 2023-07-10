"use client";
import { Typography } from "@mui/material";
import classes from "../../../css/Auth.module.css";
import Link from "next/link";
import LoginForm from "@/components/Auth/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setisLoading] = useState(false);
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

  const onLoginSubmit = async (loginData) => {
    setisLoading(true);
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(loginData),
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
          LOGIN
        </Typography>
        <Typography color="textSecondary" variant="p">
          Join our community today by filling out our simple login form and
          start enjoying exclusive benefits
        </Typography>
        <LoginForm classes={classes} onLoginSubmit={onLoginSubmit} />
        <Typography>
          Don't have account? <Link href="/signup">Click here</Link>
        </Typography>
      </div>
    </section>
  );
};

export default Login;
