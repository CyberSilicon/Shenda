import Parse from "../../services/parse";
import { callParseLogin, callParseSession } from "../../lib/api";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { currentUserStore } from "../atoms/currentUserStore";

export async function currentUserActions() {
  const setAuth = useSetRecoilState(currentUserStore);
  return {
    login,
    session: getSession,
  };

  async function login(username, password, navigate, setFormLogin) {
    setFormLogin({ username, password, loading: true });
    await Parse.User.logOut();
    setTimeout(async () => {
      await callParseLogin(username, password)
        // Save data and connect to db
        .then(async (loggedInUser) => {
          if (loggedInUser.code === undefined) {
            Cookies.set("sessionTokenCurrentUser", loggedInUser.sessionToken);
            setFormLogin({ username: "", password: "", loading: false });
            setAuth({
              isAuth: true,
              uuid: loggedInUser.objectId,
              username: loggedInUser.username,
              attrs: loggedInUser,
            });
            await navigate.push("/");
            return;
          }
          throw new Error(loggedInUser.error);
        })
        // Render And show error
        .catch((error) => {
          setFormLogin({
            username,
            password,
            loading: false,
          });
          setAuth({
            isAuth: false,
            attrs: undefined,
            uuid: undefined,
            username: undefined,
          });
          console.log(error.message);
        });
    }, 2000);
  }

  async function getSession() {
    console.log("get session test ");
    setTimeout(async () => {
      try {
        const cookie = Cookies.get("sessionTokenCurrentUser");
        const req = await callParseSession(cookie);
        if (req.code === undefined) {
          setAuth({
            isAuth: true,
            attrs: req,
            uuid: req.objectId,
            username: req.username,
          });
          return;
        }
        setAuth({
          isAuth: false,
          attrs: undefined,
          uuid: undefined,
          username: undefined,
        });
        return;
      } catch (error) {
        setAuth({
          isAuth: false,
          attrs: undefined,
          uuid: undefined,
          username: undefined,
        });
      }
    }, 2000);
  }
}
