"use client";
import { Typography } from "@mui/material";
import classes from "../../../css/Auth.module.css";
import Link from "next/link";
import LoginForm from "@/components/Auth/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { FadeLoader } from "react-spinners";

const Login = () => {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setisLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <FadeLoader width={400} height={400} />;
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
        <LoginForm classes={classes} />
        <Typography>
          Don't have account? <Link href="/signup">Click here</Link>
        </Typography>
      </div>
    </section>
  );
};

export default Login;
