import "@/styles/globals.css";
import { useCallback, useLayoutEffect, useState } from "react";
import Parse from "@/services/parse";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState();

  // Function that will return current user and also update current username
  const getCurrentUser = useCallback(async () => {
    try {
      // Update state variable holding current user
      const session = await Parse.User.current();
      setCurrentUser(session);
    } catch (e) {
      console.log("ERROR!", e.message);
    }
  }, [setCurrentUser]);

  useLayoutEffect(() => {
    getCurrentUser();
    console.log(currentUser);
  }, [currentUser]);
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
