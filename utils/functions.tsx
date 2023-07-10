import { useAuth } from "@/hooks/useAuth";
import { UserLoginData } from "@/types/user";
import { useRouter } from "next/navigation";

export const getPosts = async () => {
  const response = await fetch("/api/posts");
  const responseData = await response.json();

  return responseData;
};

export async function loginUser(
  data: UserLoginData | { email: string; password: string },
  setisLoading: (value: boolean) => void,
  login: (resdata: object) => void,
  router: any
) {
  setisLoading(true);

  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const resdata = await response.json();

    login(resdata.token);

    const userInfo = {
      firstname: resdata.firstname,
      lastname: resdata.lastname,
      image: resdata.image,
      userId: resdata.userId,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("userinfo", JSON.stringify(userInfo));
    }

    if (response.ok) {
      router.push("/");
    }
  } catch (error) {
    setisLoading(false);
    console.log(error);
  } finally {
    setisLoading(false);
  }
}
