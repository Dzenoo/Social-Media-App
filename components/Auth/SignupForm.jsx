"use client";

import { useValidation } from "@/hooks/useValidation";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORD_MATCH,
  VALIDATOR_REQUIRE,
} from "@/utils/validators";
import { Button, TextField } from "@mui/material";
import Image from "next/image";

const SignupForm = ({ classes }) => {
  const firstNameValidation = useValidation([VALIDATOR_REQUIRE()]);
  const lastNameValidation = useValidation([VALIDATOR_REQUIRE()]);
  const emailValidation = useValidation([VALIDATOR_EMAIL()]);
  const biographyValidation = useValidation([VALIDATOR_MINLENGTH(20)]);
  const passwordValidation = useValidation([VALIDATOR_MINLENGTH(6)]);
  const confirmPasswordValidation = useValidation([
    VALIDATOR_PASSWORD_MATCH(passwordValidation.value),
  ]);

  return (
    <form className={classes.form}>
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
        placeholder="Enter First Name"
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
        placeholder="Enter Last Name"
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
        placeholder="Enter email"
        label="Email"
      />
      <TextField
        value={biographyValidation.value}
        error={!biographyValidation.isValid && biographyValidation.isTouched}
        helperText={
          !biographyValidation.isValid &&
          biographyValidation.isTouched &&
          "Invalid Biography"
        }
        onChange={biographyValidation.onChangeHandler}
        onBlur={biographyValidation.onBlurHandler}
        placeholder="Enter Biography"
        label="Biography"
        multiline
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
        placeholder="Enter your password"
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
        placeholder="Confirm password..."
        type="password"
        label="Confirm password"
      />
      <div className={classes.actions}>
        <div className={classes.google}>
          <Image src="/images/search.png" alt="google" width={30} height={30} />
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
  );
};

export default SignupForm;
