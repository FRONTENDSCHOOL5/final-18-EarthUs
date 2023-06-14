/* eslint-disable no-console */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState } from "recoil";

import userDataAtom from "../recoil/userDataAtom";
import BASE_URL from "../utils/config";

export default function useApiQuery(apiUrl, method, body = null) {
  // token을 가져오기 위한 userDataAtom 사용
  const [userData] = useRecoilState(userDataAtom);
  const { token } = userData;
  const queryClient = useQueryClient();

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
  );

  if (isLoading) {
    console.warn("Console warning.");
  }
  if (error) {
    console.error("Console error.");
  }

  // 쿼리 캐시 삭제
  queryClient.invalidateQueries([apiUrl, method]);
  return { isLoading, error, data };
}

// ✅ Usage
// const { data } = useApi(
//   '/url',        // API 주소
//   'get',         // get ...
// );
