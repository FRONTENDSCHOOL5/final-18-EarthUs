import { atom } from "recoil";

const earthusDataAtom = atom({
  key: "earthusDataAtom",
  default: {
    username: "Earthus",
    accountname: "earth_us",
    intro: "얼스어스",
    id: "648c953ab2cb20566336d0da",
  },
});

export default earthusDataAtom;
