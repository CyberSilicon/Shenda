import { atom } from "recoil";

export const currentUserStore = atom({
  key: "current-user-store", // unique ID (with respect to other atoms/selectors)
  default: {
    isAuth: undefined,
    uuid: undefined,
    username: undefined,
    attrs: [],
  }, // default value (aka initial value)
});
