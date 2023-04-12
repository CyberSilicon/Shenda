import Head from "next/head";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useCurrentUserActions } from "../store/actions/useCurrentUserActions";
import { useRouter } from "next/router";
import logo from "../../public/geologo.png";


export default function Login() {
  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
    loading: false,
  });

  //...
  const useCurrentUser = useCurrentUserActions();

  const ChangeValueInput = useCallback(
    (e) => {
      formLogin[e.name] = e.value;
    },
    [formLogin]
  );

  const router = useRouter();

  const doUserLogIn = useCallback(async () => {
    // Note that these values come from state variables that we've declared before
    try {
      const user = (await useCurrentUser).login(
        formLogin.username,
        formLogin.password,
        router,
        setFormLogin
      );
      if (user !== null && user !== undefined) {
        router.push("/");
        return true;
      }
    } catch (error) {
      // toastErrorLogin(error.message); // show error message
      console.log(`Error! ${error.message}`);
      return false;
    }
  }, []);

  return (
    <>
      <Head>
        <title>Shenda</title>
        <meta name="keywords" content="login" />
        meta
      </Head>
      <div className="flex min-h-full h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image
              src={logo}
              height={160}
              width={110}
              className="mx-auto w-auto"
              alt="Shenda logo"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
            </p>
          </div>
          {/* <form className="mt-8 space-y-6" action="#" method="POST"> */}
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                onChange={(e) => ChangeValueInput(e.target)}
                name="username"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="username"
                type="username"
                // autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={(e) => ChangeValueInput(e.target)}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                doUserLogIn();
                // setFormLogin({ ...formLogin, loading: true });
              }}
              // disabled={formLogin.loading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-zinc-800 py-2 px-4 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
              {/* {formLogin.loading ? "Loading..." : "Log in"} */}
              {/* {formLogin.loading && (
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64" />
              )} */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}