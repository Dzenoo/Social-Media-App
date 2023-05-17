"use client";
import { Button, TextField, Typography } from "@mui/material";
import classes from "../../../css/Auth.module.css";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  return (
    <section className={classes.signup_section}>
      <div className={classes.empty_div}></div>
      <div className={classes.signup_form_div}>
        <Typography color="#333" variant="h4" fontWeight="bold">
          LOGIN
        </Typography>
        <Typography color="textSecondary" variant="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          aperiam aut saepe ipsum earum hic illum totam sit assumenda. Sequi
          placeat eos magnam reiciendis hic esse, omnis consequuntur. Dicta,
          laudantium!
        </Typography>
        <form className={classes.signup_form}>
          <TextField placeholder="example@gmail.com" label="Email" />
          <TextField placeholder="****" label="Password" />
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
              Login
            </Button>
          </div>
        </form>
        <Typography>
          Don't have account? <Link href="/signup">Click here</Link>
        </Typography>
      </div>
    </section>
  );
};

export default Login;
