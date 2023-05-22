"use client";

import { useValidation } from "@/hooks/useValidation";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "@/utils/validators";
import { Button, TextField } from "@mui/material";
import Image from "next/image";

const LoginForm = ({ classes }) => {
  const emailValidation = useValidation([VALIDATOR_EMAIL()]);
  const passwordValidation = useValidation([VALIDATOR_MINLENGTH(6)]);

  const formData = {
    email: emailValidation.value,
    password: passwordValidation.value,
  };

  let formIsValid = false;
  if (emailValidation.isValid && passwordValidation.isValid) {
    formIsValid = true;
  }

  return (
    <form className={classes.form}>
      <TextField
        placeholder="example@gmail.com"
        label="Email"
        value={emailValidation.value}
        onChange={emailValidation.onChangeHandler}
        onBlur={emailValidation.onBlurHandler}
        error={!emailValidation.isValid && emailValidation.isTouched}
        helperText={
          !emailValidation.isValid &&
          emailValidation.isTouched &&
          "Please enter valid email"
        }
      />
      <TextField
        placeholder="****"
        label="Password"
        value={passwordValidation.value}
        onChange={passwordValidation.onChangeHandler}
        onBlur={passwordValidation.onBlurHandler}
        error={!passwordValidation.isValid && passwordValidation.isTouched}
        type="password"
        helperText={
          !passwordValidation.isValid &&
          passwordValidation.isTouched &&
          "Please enter valid email"
        }
      />
      <div className={classes.actions}>
        <div className={classes.google}>
          <Image src="/images/search.png" alt="google" width={30} height={30} />
        </div>
        <Button
          type="submit"
          size="large"
          variant="contained"
          disabled={!formIsValid}
          sx={{ backgroundColor: "#006ccf", width: "100%" }}
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
