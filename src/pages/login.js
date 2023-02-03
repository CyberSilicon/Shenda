// react/no-unescaped-entities
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import Parse from "../services/parse";
import logo from "../../public/geologo.png";
import { useRouter } from "next/router";

export default function Login() {
  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });

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
      const loggedInUser = await Parse.User.logIn(
        formLogin.username,
        formLogin.password
      );
      // logIn returns the corresponding ParseUser object
      if (loggedInUser !== null && loggedInUser !== undefined) {
        console.log(await loggedInUser);
        router.push("/");
        return true;
      }
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection
      console.log(`Error! ${error.message}`);
      return false;
    }
  }, [formLogin]);

  return (
    <>
      <Head>
        <title>Log in</title>
        <meta name="keywords" content="login" />
        meta
      </Head>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image
              src={logo}
              className="mx-auto w-auto"
              alt="Shenda logo"
              height={160}
              width={110}
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
                // id="email-address"
                // autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={(e) => ChangeValueInput(e.target)}
                // id="password"
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
                id="remember-me"
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
              onClick={() => doUserLogIn()}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-zinc-800 py-2 px-4 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Log in
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
}
