import "../styles/globals.css";
import { useCallback, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Parse from "../services/parse";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser]: any = useState();

  // Function that will return current user and also update current username
  const getCurrentUser = useCallback(async () => {
    try {
      // Update state variable holding current user
      const session = await Parse.User.current();
      console.log("session: " + session);
      // console.log("session aUTH: " + session.authenticated);
      // console.log("session getSessionToken: " + session.getSessionToken);
      // console.log("curentUSer: " + currentUser);

      setCurrentUser(session);
    } catch (e) {
      console.log("ERROR!", e.message);
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
    // console.log("curentUSeeeeeeeeeeeeer: " + currentUser);
  }, []);
  return <Component {...pageProps} />;
}
