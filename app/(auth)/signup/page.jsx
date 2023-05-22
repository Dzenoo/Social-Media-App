"use client";
import { Typography } from "@mui/material";
import classes from "../../../css/Auth.module.css";
import Link from "next/link";
import SignupForm from "@/components/Auth/SignupForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FadeLoader } from "react-spinners";
import { getSession } from "next-auth/react";

const Signup = () => {
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
        <Typography color="textSecondary" variant="p">
          Join our community today by filling out our simple signup form and
          start enjoying exclusive benefits
        </Typography>
        <SignupForm classes={classes} />
        <Typography>
          You already have account? <Link href="/login">Click here</Link>
        </Typography>
      </div>
    </section>
  );
};

export default Signup;
