"use client";

import { useValidation } from "@/hooks/useValidation";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "@/utils/validators";
import { Button, TextField } from "@mui/material";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginForm = ({ classes, onLoginSubmit }) => {
  const [providers, setproviders] = useState(null);
  const router = useRouter();
  const emailValidation = useValidation([VALIDATOR_EMAIL()]);
  const passwordValidation = useValidation([VALIDATOR_MINLENGTH(6)]);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setproviders(res);
    })();
  }, []);

  const signInWithGoogle = (id) => {
    signIn(id);
    router.push("/");
  };

  const formData = {
    email: emailValidation.value,
    password: passwordValidation.value,
  };

  let formIsValid = false;
  if (emailValidation.isValid && passwordValidation.isValid) {
    formIsValid = true;
  }

  const submitLogin = (e) => {
    e.preventDefault();
    onLoginSubmit(formData);
  };

  return (
    <form className={classes.form} onSubmit={submitLogin}>
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
        {/* {providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              className={classes.google}
              key={provider.name}
              onClick={() => {
                signInWithGoogle(provider.id);
              }}
            >
              <Image
                src="/images/search.png"
                alt="google"
                width={30}
                height={30}
              />
            </button>
          ))} */}
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
