import "../styles/globals.css";
import React, { useLayoutEffect, useMemo } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { currentUserStore } from "../store/atoms/currentUserStore";
import Error from "next/error";
import LoadModal from "../components/LoadModal";
import { currentUserActions } from "../store/actions/currentUserActions";


export default function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Main Component={Component} pageProps={pageProps} />
    </RecoilRoot>
  );
}
const Main = ({ Component, pageProps }) => {
  const useCurrentUser = currentUserActions();

  const { isAuth } = useRecoilValue(currentUserStore);

  const handleProtectedRoutes = useMemo(() => {
    if (pageProps.protected && isAuth === false) {
      return <Error statusCode={404} withDarkMode={false} />;
    }

    if (pageProps.protected && isAuth === undefined) {
      return <LoadModal />;
    }
  }, [isAuth]);

  const handleGetSessionOfCurrentUser = async () => {
    (await useCurrentUser).session();
  }
  useLayoutEffect(() => {
    handleProtectedRoutes;
    handleGetSessionOfCurrentUser();
  }, []);

  return (
    <div>
      {isAuth === undefined && <LoadModal />}
      <Component {...pageProps} />
    </div>
  );
};
