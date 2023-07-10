"use client";
import { Card, Typography } from "@mui/material";
import classes from "../../../css/Auth.module.css";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/Auth/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import { useAuth } from "@/hooks/useAuth";
import { UserLoginData } from "@/types/user";
import { Users } from "@/constants/users";
import { loginUser } from "@/utils/functions";

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const token =
    typeof window !== "undefined" && localStorage.getItem("userdata")
      ? JSON.parse(localStorage.getItem("userdata")!)
      : null;

  const router = useRouter();

  useEffect(() => {
    if (token?.token) {
      router.replace("/");
    } else {
      setisLoading(false);
    }
  }, [router]);

  const onLoginSubmit = async (loginData: UserLoginData) => {
    loginUser(loginData, setisLoading, login, router);
  };

  async function loginDummyUser(email: string, password: string) {
    const confirm = window.confirm(
      "Are you sure you want to login as this user?"
    );
    if (confirm) {
      await loginUser({ email, password }, setisLoading, login, router);
    }
  }

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  return (
    <section className={classes.auth_section}>
      <div className={classes.empty_div}>
        <div style={{ padding: "20px" }}>
          <Typography variant="h4" color="#fff">
            Pick account you want
          </Typography>
          <ul className={classes.user_list}>
            {Users.map((user) => (
              <Card
                onClick={() => loginDummyUser(user.email, user.password)}
                className={classes.user}
                key={user.id}
              >
                <Image
                  src={user.image}
                  width={100}
                  height={100}
                  alt={user.username}
                  style={{ borderRadius: "100px" }}
                />
                <Typography variant="h6">{user.username}</Typography>
              </Card>
            ))}
          </ul>
        </div>
      </div>
      <div className={classes.form_div}>
        <Typography color="#333" variant="h4" fontWeight="bold">
          LOGIN
        </Typography>
        <Typography color="textSecondary">
          Join our community today by filling out our simple login form and
          start enjoying exclusive benefits
        </Typography>
        <LoginForm classes={classes} onLoginSubmit={onLoginSubmit} />
        <Typography>
          Don't have account? <Link href="/signup">Click here</Link>
        </Typography>
      </div>
    </section>
  );
};

export default Login;
