import { atom } from "recoil";

// API를 호출하는 대상의 데이터를 저장하는 atom
const userDataFromLocalStorage =
  JSON.parse(localStorage.getItem("userData")) || null;

const loginState = atom({
  key: "loginState",
  // 로컬스토리지에 저장된 데이터를 기본값으로 설정
  default: userDataFromLocalStorage,
});

export default loginState;
