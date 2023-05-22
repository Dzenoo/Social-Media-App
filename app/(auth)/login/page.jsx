"use client";
import { Button, TextField, Typography } from "@mui/material";
import classes from "../../../css/Auth.module.css";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/Auth/LoginForm";

const Login = () => {
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
