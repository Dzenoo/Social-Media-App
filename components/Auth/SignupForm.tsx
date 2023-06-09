"use client";

import { useValidation } from "@/hooks/useValidation";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_FIRSTNAME,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORD_MATCH,
} from "@/utils/validators";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { AuthSignupProps } from "@/types/user";

const SignupForm: React.FC<AuthSignupProps> = ({ classes, onSubmitSignup }) => {
  const firstNameValidation = useValidation([VALIDATOR_FIRSTNAME()]);
  const lastNameValidation = useValidation([VALIDATOR_FIRSTNAME()]);
  const emailValidation = useValidation([VALIDATOR_EMAIL()]);
  const biographyValidation = useValidation([VALIDATOR_MINLENGTH(20)]);
  const passwordValidation = useValidation([VALIDATOR_MINLENGTH(6)]);
  const confirmPasswordValidation = useValidation([
    VALIDATOR_PASSWORD_MATCH(passwordValidation.value),
  ]);
  const [imageVal, setimageVal] = useState<string>("");

  const formData = {
    first_name: firstNameValidation.value,
    last_name: lastNameValidation.value,
    email: emailValidation.value,
    biography: biographyValidation.value,
    password: passwordValidation.value,
    image: imageVal,
  };

  let formIsValid = false;
  if (
    firstNameValidation.isValid &&
    lastNameValidation.isValid &&
    emailValidation.isValid &&
    biographyValidation.isValid &&
    passwordValidation.isValid &&
    confirmPasswordValidation.isValid
  ) {
    formIsValid = true;
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const imageUrl = fileReader.result as string;
        setimageVal(imageUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

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
      <Image src={imageVal} width={70} height={70} alt="profimg" />
      <input
        type="file"
        accept="image/*"
        required={true}
        onChange={handleImageChange}
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
        value={biographyValidation.value}
        error={!biographyValidation.isValid && biographyValidation.isTouched}
        helperText={
          !biographyValidation.isValid &&
          biographyValidation.isTouched &&
          "Invalid Biography"
        }
        onChange={biographyValidation.onChangeHandler}
        onBlur={biographyValidation.onBlurHandler}
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
