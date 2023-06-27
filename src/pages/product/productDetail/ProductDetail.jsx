/* eslint-disable no-console */
// import React from "react";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Blank from "../../../components/blank/Blank";
import A11yHidden from "../../../components/common/a11yHidden/A11yHidden";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import useApiInfiniteQuery from "../../../hooks/useApiInfiniteQuery";
import useApiMutation from "../../../hooks/useApiMutation";
import modalConfigState from "../../../recoil/modalConfigAtom";
import modalState from "../../../recoil/modalStateAtom";
import userDataAtom from "../../../recoil/userDataAtom";
import {
  PRODUCT_UPLOAD,
  getProductDetailPath,
  getProductEditPath,
} from "../../../utils/config";

import ProdDetailWrap from "./productDetail.style";

export default function ProfileProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { account } = useParams();
  const PRODUCT_DETAIL = getProductDetailPath(account);

  // * 전역 상태 관리를 위한 Recoil State
  const [userData] = useRecoilState(userDataAtom);
  const setModalOpen = useSetRecoilState(modalState);
  const setModalConfig = useSetRecoilState(modalConfigState);

  const myName = userData ? userData.accountname.trim().toLowerCase() : "";
  const currentUser = account.trim().toLowerCase() === myName;

  const [deleteProd, setDeleteProd] = useState(null);

  // * 상품 정보 무한스크롤 호출
  const {
    data: productData,
    hasNextPage: productHasNextPage,
    fetchNextPage: productFetchNextPage,
  } = useApiInfiniteQuery(`/product/${account}`, "product");
  console.log(productData);

  // 404 에러 처리
  useEffect(() => {
    if (
      productData &&
      productData.pages &&
      productData.pages[0] &&
      productData.pages[0].response &&
      productData.pages[0].response.status === 404
    ) {
      navigate("/error");
    }
  }, [productData, navigate]);

  // * 상품 삭제
  const deleteProductMutation = useApiMutation(
    deleteProd,
    "DELETE",
    {},
    {
      onSuccess: () => {
        console.log("상품이 삭제되었습니다.");
        queryClient.invalidateQueries(PRODUCT_DETAIL);
      },
    },
  );

  const handleDeleteFeed = prodId => {
    const url = `/product/${prodId}`;
    setDeleteProd(url);
    deleteProductMutation.mutate();
  };

  // * 게시물 삭제 확인 모달
  const setDeleteConfirm = (e, id) => {
    e.stopPropagation();
    setModalConfig({
      type: "confirm",
      title: "게시물을 삭제하시겠어요?",
      body: "",
      buttons: [
        {
          label: "취소",
          onClick: eventInner => {
            eventInner.stopPropagation();
            setModalOpen(false);
          },
        },
        {
          label: "삭제",
          onClick: () => handleDeleteFeed(id),
        },
      ],
    });
    setModalOpen(true);
  };

  if (!productData || !productData.pages) return null;

  return (
    <ProdDetailWrap>
      <h2>
        <A11yHidden>{account}님이 판매 중인 상품</A11yHidden>
      </h2>
      {productData ? (
        <InfiniteScroll
          hasMore={productHasNextPage}
          loadMore={() => productFetchNextPage()}
        >
          {productData.pages &&
            productData.pages.map(page => {
              return (
                <React.Fragment key={uuidv4()}>
                  {page.product &&
                    page.product.map(prod => {
                      const { id, price, link, itemName, itemImage } = prod;
                      const PRODUCT_EDIT = getProductEditPath(id);
                      return (
                        <div key={id}>
                          <Card
                            postImage={itemImage}
                            content={itemName}
                            onClick={() => {
                              window.open(link);
                            }}
                            prod
                          >
                            <strong>
                              {/*  Intl객체로 원화 Formatter */}
                              {new Intl.NumberFormat("ko", {
                                currency: "KRW",
                              }).format(price)}
                              원
                            </strong>
                          </Card>
                          {/* 나의 프로필인지 확인하고 상품 관리버튼 노출 */}
                          {currentUser && (
                            <div>
                              <Button
                                size="sm"
                                variant="white"
                                onClick={() => navigate(PRODUCT_EDIT)}
                              >
                                수정
                              </Button>
                              <Button
                                size="sm"
                                variant="white"
                                onClick={e => setDeleteConfirm(e, id)}
                              >
                                삭제
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </React.Fragment>
              );
            })}
        </InfiniteScroll>
      ) : (
        <Blank btn="홈으로 바로가기">판매중인 상품이 없습니다.</Blank>
      )}
      {currentUser && (
        <Button
          size="cta"
          variant="primary"
          onClick={() => navigate(PRODUCT_UPLOAD)}
        >
          상품 업로드
        </Button>
      )}
    </ProdDetailWrap>
  );
}
