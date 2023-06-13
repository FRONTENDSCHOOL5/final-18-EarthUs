/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState } from "recoil";

import BASE_URL from "../config";
import userDataAtom from "../recoil/userDataAtom";

export default function useApiMutation(
  apiUrl,
  method,
  data = null,
  options = {},
) {
  const [userData] = useRecoilState(userDataAtom);
  const token = userData && userData.token ? userData.token : "";
  // const { token } = userData;
  console.log("Token: ", token);

  const executeMutation = async () => {
    const headers = {
      "Content-type": "application/json",
    };
    token && (headers.Authorization = `Bearer ${token}`);

    const res = await axios({
      url: BASE_URL + apiUrl,
      method,
      headers,
      data,
    });
    console.warn("요청에 성공했습니다.");
    console.table(res.data);
    return res.data;
  };

  const mutations = useMutation(executeMutation, {
    onError: err => {
      console.warn("요청에 실패했습니다.");
    },
    onSettled: () => {
      console.warn("요청을 실행합니다.");
    },
    ...options,
  });

  return mutations;
}

// ✅ Usage
// 1. 사용 시 'uploadSample' 네이밍은 용도에 맞도록 변경해서 사용.
// const uploadSample = useMutations(
//   '/url',              // API 주소
//   'post',              // post, put, delete ...
//   {onSuccess:() => {   // 추가로 실행할 옵션
//     console.log('요청에 성공했습니다.');
// }
// );
