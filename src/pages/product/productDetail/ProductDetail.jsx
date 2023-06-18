/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import Blank from "../../../components/blank/Blank";
import A11yHidden from '../../../components/common/a11yHidden/A11yHidden';
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import useApiMutation from "../../../hooks/useApiMutation";
import useApiQuery from "../../../hooks/useApiQuery";
import userDataAtom from "../../../recoil/userDataAtom";


import ProdDetailWrap from "./productDetail.style";

export default function ProfileProduct() {
  const queryClient = useQueryClient();

  const { account } = useParams();
  const { data } = useApiQuery(`/product/${account}`, "get");
  const navigate = useNavigate();


  // * 유저데이터를 가져오기 위한 userDataAtom 사용
  const [userData] = useRecoilState(userDataAtom);
  const myName = userData ? userData.accountname.trim().toLowerCase() : '';
  const normalizedAccount = account.trim().toLowerCase();

  const [deleteProd, setDeleteProd] = useState(null);

  // * 상품 삭제 API 호출
  const deleteProductMutation = useApiMutation(
    deleteProd,
    'DELETE',
    {},
    {
      onSuccess: () => {
        // eslint-disable-next-line no-console
        console.log('상품이 삭제되었습니다.');
        queryClient.invalidateQueries(`/product/${account}`);
      }
    }
  );

  const deleteProduct = (id) => {
    const url = `/product/${id}`;
    setDeleteProd(url);
    deleteProductMutation.mutate();
  }


  return (
    <ProdDetailWrap>
      <h2>
        <A11yHidden>
          {account}님이 판매 중인 상품
        </A11yHidden>
      </h2>
      {data && data.product.length > 1 ? (
        data.product.map(product => {
          const { id, price, link, itemName, itemImage } = product;
          return (
            <div>
              <Card
                key={id}
                postImage={itemImage}
                content={itemName}
                onClick={() => {
                  window.open(link);
                }}
                prod>
                <strong>
                  {/*  Intl객체로 원화 Formatter */}
                  {new Intl.NumberFormat("ko", {
                    currency: "KRW",
                  }).format(price)}
                  원
                </strong>
              </Card>

              {/* 나의 프로필인지 확인하고 상품 관리버튼 노출 */}
              {normalizedAccount === myName && (
                <div>
                  <Button size="sm" variant="white" onClick={() => navigate(`/product/${id}/edit`)}>
                    수정
                  </Button>
                  <Button size="sm" variant="white" onClick={() => deleteProduct(id)}>
                    삭제
                  </Button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <Blank btn="홈으로 바로가기">
          판매중인 상품이 없습니다.
        </Blank>
      )
      }
      {
        normalizedAccount === myName && (
          <Button size="cta" variant="primary" onClick={() => navigate(`/product/upload`)}>
            상품등록
          </Button>)
      }
    </ProdDetailWrap >
  );
}
