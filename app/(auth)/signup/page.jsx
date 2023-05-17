"use client";
import { Button, TextField, Typography } from "@mui/material";
import classes from "../../../css/Auth.module.css";
import Link from "next/link";
import Image from "next/image";

const Signup = () => {
  return (
    <section className={classes.signup_section}>
      <div className={classes.empty_div}></div>
      <div className={classes.signup_form_div}>
        <Typography color="#333" variant="h4" fontWeight="bold">
          CREATE ACCOUNT
        </Typography>
        <Typography color="textSecondary" variant="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          aperiam aut saepe ipsum earum hic illum totam sit assumenda. Sequi
          placeat eos magnam reiciendis hic esse, omnis consequuntur. Dicta,
          laudantium!
        </Typography>
        <form className={classes.signup_form}>
          <TextField placeholder="Enter username" label="Username" />
          <TextField placeholder="Enter email" label="Email" />
          <TextField placeholder="Enter your password" label="Password" />
          <TextField
            placeholder="Confirm your password..."
            label="Confirm password"
          />
          <div className={classes.signup_actions}>
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
