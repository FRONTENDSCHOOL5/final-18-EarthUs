import { atom } from "recoil";

// API를 호출하는 대상의 비공개 데이터를 저장하는 atom
const userDataFromLocalStorage = JSON.parse(
  localStorage.getItem("privateData"),
) || {
  key: "privateDataAtom",
  default: {
    token: "",
  },
};

const privateState = atom({
  key: "privateState",
  default: userDataFromLocalStorage,
});

export default privateState;
