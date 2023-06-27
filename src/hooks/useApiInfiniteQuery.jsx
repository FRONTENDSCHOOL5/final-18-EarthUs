/* eslint-disable consistent-return */
/* eslint-disable no-console */

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState } from "recoil";

import privateDataAtom from "../recoil/privateDataAtom";
import { BASE_URL } from "../utils/config";

/**
 * @returns useQuery 무한정 호출하여 API서버에서 데이터 출력
 * @example const { data } = useApiInfiniteQuery(url, "posts");
 */
export default function useApiInfiniteQuery(apiUrl, keyName = null) {
  const [privateData] = useRecoilState(privateDataAtom);
  const token = privateData || "";

  const LIMIT = 6;

  const executeInfiniteQuery = async ({ pageParam = { skip: 0 } }) => {
    const { skip } = pageParam;
    try {
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(
        `${BASE_URL + apiUrl}?limit=${LIMIT}&skip=${skip}`,
        { headers },
      );
      if (res.status === 200) {
        console.log("요청에 성공했습니다.");
        console.table(res.data);
        return res.data;
      }
    } catch (error) {
      return error;
    }
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isError } =
    useInfiniteQuery([apiUrl], executeInfiniteQuery, {
      getNextPageParam: (lastPage, allPages) => {
        const resKey = keyName;
        if (
          keyName
            ? lastPage[resKey] && lastPage[resKey].length < LIMIT
            : lastPage && lastPage.length < LIMIT
        ) {
          return undefined;
        }

        return { skip: allPages.length * LIMIT };
      },
    });

  if (isLoading) {
    console.warn("요청 실행 중...");
  }

  if (isError) {
    console.error("요청에 실패했습니다.");
  }

  return { data, hasNextPage, fetchNextPage, isLoading, isError };
}

// ✅ Usage
// const { data } = useApiQuery(
//   '/url',        // API 주소
//   'key',       	// response key 이름 ex. posts
// );
