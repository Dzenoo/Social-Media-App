import { useCallback, useEffect, useState } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, settoken] = useState(null);
  const [tokenExp, settokenExp] = useState();

  const login = useCallback((token, expirationDate) => {
    settoken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    settokenExp(tokenExpirationDate);

    localStorage.setItem(
      "userdata",
      JSON.stringify({
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    settoken(null);
    settokenExp(null);
    localStorage.removeItem("userdata");
  }, []);

  useEffect(() => {
    if (token && tokenExp) {
      const remainingTime = tokenExp.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExp]);

  return { token, login, logout };
};
