"use client";
import { Button, TextField, Typography } from "@mui/material";
import classes from "../../../css/Auth.module.css";
import Link from "next/link";
import Image from "next/image";

const Signup = () => {
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
        <form className={classes.form}>
          <TextField placeholder="Enter First Name" label="First Name" />
          <TextField placeholder="Enter Last Name" label="Last Name" />
          <TextField placeholder="Enter email" label="Email" />
          <TextField
            placeholder="Enter Biography"
            label="Biography"
            multiline
          />
          <TextField placeholder="Enter your password" label="Password" />
          <TextField
            placeholder="Confirm password..."
            label="Confirm password"
          />
          <div className={classes.actions}>
            <div className={classes.google}>
              <Image
                src="/images/search.png"
                alt="google"
                width={30}
                height={30}
              />
            </div>
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ backgroundColor: "#006ccf", width: "100%" }}
            >
              Register
            </Button>
          </div>
        </form>
        <Typography>
          You already have account? <Link href="/login">Click here</Link>
        </Typography>
      </div>
    </section>
  );
};

export default Signup;
