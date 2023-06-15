/* eslint-disable no-console */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState } from "recoil";

import userDataAtom from "../recoil/userDataAtom";
import BASE_URL from "../utils/config";

export default function useApiQuery(apiUrl, method, body = null) {
  // token을 가져오기 위한 userDataAtom 사용
  const [userData] = useRecoilState(userDataAtom);
  const { token } = userData;

  const executeQuery = async () => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await axios({
      url: BASE_URL + apiUrl,
      method,
      headers,
      data: body,
    });
    console.log("요청에 성공했습니다.");
    console.table(res.data);

    return res.data;
  };

  const { isLoading, error, data } = useQuery(
    [apiUrl, method, body],
    executeQuery,
    { refetchOnWindowFocus: false }, // 브라우저 화면을 이탈했다가 다시 포커스할 때 refetch 방지
  );
  if (isLoading) {
    console.warn("요청 실행 중...");
  }
  if (error) {
    console.error("요청에 실패했습니다.");
  }

  return { isLoading, error, data };
}

// ✅ Usage
// const { data } = useApiQuery(
//   '/url',        // API 주소
//   'get',         // get ...
// );
