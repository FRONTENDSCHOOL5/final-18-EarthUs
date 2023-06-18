/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState } from "recoil";

import privateDataAtom from "../recoil/privateDataAtom";
import BASE_URL from "../utils/config";

/**
 * @returns API서버에 데이터 전달
 * @example
 * const getFollow = useApiMutation(
 *  `/profile/${account}/follow`,
 *  `POST`,
 * { data },
 * {
 * onSuccess: () => {
 * console.log('요청에 성공했습니다.');
 * },
 */
export default function useApiMutation(
  apiUrl = "",
  method = "",
  data = null,
  options = {},
) {
  // token을 가져오기 위한 userDataAtom 사용
  const [privateData] = useRecoilState(privateDataAtom);
  const token = privateData || "";

  const executeMutation = async () => {
    const headers = {
      "Content-type": "application/json",
    };
    // token이 있으면 headers에 추가
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
    onSettled: () => {
      console.warn("요청을 실행합니다.");
    },
    ...options,
  });

  return mutations;
}

// ✅ Usage
// // 1. 사용 시 'uploadSample' 네이밍은 용도에 맞도록 변경해서 사용.
// const uploadSample = useApiMutation(
//   '/url',              // API 주소
//   'post',              // post, put, delete ...
//   {
//     onSuccess: () => {   // 추가로 실행할 옵션
//       console.log('요청에 성공했습니다.')
//     },
//     onError: () => {    // 추가로 실행할 옵션
//       console.log('요청에 실패했습니다.');
//     }
//   }
// );
