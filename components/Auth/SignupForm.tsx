"use client";

import { useValidation } from "@/hooks/useValidation";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_FIRSTNAME,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORD_MATCH,
} from "@/utils/validators";
import { Button, TextField } from "@mui/material";
import React, { FormEvent } from "react";
import { AuthSignupProps } from "@/types/user";

const SignupForm: React.FC<AuthSignupProps> = ({ classes, onSubmitSignup }) => {
  const firstNameValidation = useValidation([VALIDATOR_FIRSTNAME()]);
  const lastNameValidation = useValidation([VALIDATOR_FIRSTNAME()]);
  const emailValidation = useValidation([VALIDATOR_EMAIL()]);
  const passwordValidation = useValidation([VALIDATOR_MINLENGTH(6)]);
  const confirmPasswordValidation = useValidation([
    VALIDATOR_PASSWORD_MATCH(passwordValidation.value),
  ]);

  const formData = {
    first_name: firstNameValidation.value,
    last_name: lastNameValidation.value,
    email: emailValidation.value,
    password: passwordValidation.value,
    image: "/images/user.png",
  };

  let formIsValid = false;
  if (
    firstNameValidation.isValid &&
    lastNameValidation.isValid &&
    emailValidation.isValid &&
    passwordValidation.isValid &&
    confirmPasswordValidation.isValid
  ) {
    formIsValid = true;
  }

  const submitSignup = (e: FormEvent) => {
    e.preventDefault();
    onSubmitSignup(formData);
  };

  return (
    <form className={classes.form} onSubmit={submitSignup}>
      <TextField
        value={firstNameValidation.value}
        error={!firstNameValidation.isValid && firstNameValidation.isTouched}
        helperText={
          !firstNameValidation.isValid &&
          firstNameValidation.isTouched &&
          "Invalid First Name"
        }
        onChange={firstNameValidation.onChangeHandler}
        onBlur={firstNameValidation.onBlurHandler}
        label="First Name"
      />
      <TextField
        value={lastNameValidation.value}
        error={!lastNameValidation.isValid && lastNameValidation.isTouched}
        helperText={
          !lastNameValidation.isValid &&
          lastNameValidation.isTouched &&
          "Invalid Last Name"
        }
        onChange={lastNameValidation.onChangeHandler}
        onBlur={lastNameValidation.onBlurHandler}
        label="Last Name"
      />

      <TextField
        value={emailValidation.value}
        error={!emailValidation.isValid && emailValidation.isTouched}
        helperText={
          !emailValidation.isValid &&
          emailValidation.isTouched &&
          "Invalid Email"
        }
        onChange={emailValidation.onChangeHandler}
        onBlur={emailValidation.onBlurHandler}
        label="Email"
      />
      <TextField
        value={passwordValidation.value}
        error={!passwordValidation.isValid && passwordValidation.isTouched}
        helperText={
          !passwordValidation.isValid &&
          passwordValidation.isTouched &&
          "Invalid Password"
        }
        onChange={passwordValidation.onChangeHandler}
        onBlur={passwordValidation.onBlurHandler}
        label="Password"
        type="password"
      />
      <TextField
        value={confirmPasswordValidation.value}
        error={
          !confirmPasswordValidation.isValid &&
          confirmPasswordValidation.isTouched
        }
        helperText={
          !confirmPasswordValidation.isValid &&
          confirmPasswordValidation.isTouched &&
          "Password don't match"
        }
        onChange={confirmPasswordValidation.onChangeHandler}
        onBlur={confirmPasswordValidation.onBlurHandler}
        type="password"
        label="Confirm password"
      />
      <div className={classes.actions}>
        <Button
          type="submit"
          size="large"
          variant="contained"
          disabled={!formIsValid}
          sx={{ backgroundColor: "#006ccf", width: "100%" }}
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
