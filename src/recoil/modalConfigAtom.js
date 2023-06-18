// modalConfigStateAtom.js
import { atom } from "recoil";

const modalConfigState = atom({
  key: "modalConfigState",
  default: { type: "", title: "", buttons: [], body: "" },
});

export default modalConfigState;
