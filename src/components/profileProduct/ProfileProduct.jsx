/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import useApiQuery from "../../hooks/useApiQuery";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import A11yHidden from "../common/a11yHidden/A11yHidden";
import Button from "../common/button/Button";
import Card from "../common/card/Card";

import ProfileProductList from "./profileProduct.style";

export default function ProfileProduct() {
  const { account } = useParams();
  const { data } = useApiQuery(`/product/${account}?limit=4`, "get");

  return (
    <ProfileProductList>
      {data && data.product.length > 1 ? (
        <>
          <header>
            <h2>판매 중인 상품</h2>
            <Link to={`/product/${account}`}>
              <A11yHidden>{account}님의 판매 중인 상품 더보기</A11yHidden>
            </Link>
          </header>

          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={2.5}
            spaceBetween={16}
            slidesOffsetBefore={16}
            slidesOffsetAfter={16}
          >
            {data &&
              data.product.map(product => {
                const { id, price, itemName, itemImage, link } = product;
                return (
                  <SwiperSlide
                    key={id}
                    onClick={() => {
                      window.open(link);
                    }}
                  >
                    <Card
                      key={id}
                      postImage={itemImage}
                      content={itemName}
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
                  </SwiperSlide>
                );
              })}
            <SwiperSlide>
              <Link to={`/product/${account}`}>
                <Button size="sm" variant="white">
                  더보기
                </Button>
              </Link>
            </SwiperSlide>
          </Swiper>
        </>
      ) : (
        <A11yHidden>판매중인 상품이 없습니다.</A11yHidden>
      )}
    </ProfileProductList>
  );
}
