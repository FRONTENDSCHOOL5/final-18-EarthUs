import { atom } from "recoil";

const modalState = atom({
  key: "modalState",
  default: false,
});

export default modalState;
