/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

import modalConfigState from "../../../recoil/modalConfigAtom";
import modalState from "../../../recoil/modalStateAtom";

import { ModalContainer, Dialog } from "./modal.style";

export default function Modal() {
  const modal = useRef(null);

  // Recoil State 호출
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [modalConfig] = useRecoilState(modalConfigState);
  // console.log(modalConfig);
  const maxButtonsIdx = modalConfig.buttons.length - 1;

  // isOpen의 상태가 변경되면 모달 토글
  const toggleModal = () => setIsOpen(!isOpen);

  const closeModal = e => {
    setIsOpen(false);
    e.stopPropagation();
    e.preventDefault();
    e.returnValue = "";
  };

  // ESC키 누르면 모달 종료
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (keyCode === 27 && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [isOpen, toggleModal]);

  // 모달 열렸을 때 모달 안에서만 포커스 이동
  useEffect(() => {
    // console.log(modal.current);

    if (modal.current) {
      modal.current.children[0].focus();

      modal.current.children[0].addEventListener("keydown", e => {
        if (e.shiftKey && e.key === "Tab") {
          e.preventDefault();
          modal.current.children[maxButtonsIdx].focus();
        }
      });

      modal.current.children[maxButtonsIdx].addEventListener("keydown", e => {
        if (!e.shiftKey && e.key === "Tab") {
          e.preventDefault();
          modal.current.children[0].focus();
        }
      });
    }
  }, [isOpen, modalConfig.type]);

  // recoil의 isOpen State가 변경되면 모달 토글.
  return isOpen ? (
    <ModalContainer onClick={toggleModal}>
      <Dialog
        onClick={e => closeModal(e)}
        className={modalConfig.type}
        type={modalConfig.type}
        open
      >
        {modalConfig.title && <h2>{modalConfig.title}</h2>}
        {modalConfig.body && <p>{modalConfig.body}</p>}
        <div ref={modal}>
          {modalConfig.buttons.map((button, index) => (
            // <button type="button" key={index} onClick={button.onClick}>
            <button type="button" key={index} onClick={e => button.onClick(e)}>
              {button.label}
            </button>
          ))}
        </div>
      </Dialog>
    </ModalContainer>
  ) : null;
}

// ✅ Usage
// // 1. Recoil import 경로에 맞게 수정
// import { useSetRecoilState } from "recoil";
// import modalConfigState from "../../recoil/modalConfigAtom";
// import modalState from "../../recoil/modalStateAtom";

// // 2. 전역 상태 관리를 위한 Recoil State
// const setModalOpen = useSetRecoilState(modalState);
// const setModalConfig = useSetRecoilState(modalConfigState);

// // 3. 모달 데이터 사용 (함수명 중복되지 않도록 반드시 변경)
// const setSampleModalData = () => { // 이벤트 사용하면 'e' 인자 추가. 아니면 생략
//   e.stopPropagation();  // 이벤트 사용하면 stopPropagation. 아니면 생략
//   setModalConfig({
//     type: "confirm",    // "confirm" or "bottomSheet"
//     title: "타이틀메시지를 작성해주세요?",
//     body: "",
//     buttons: [
//       {
//         label: "취소",
//         onClick: () => setModalOpen(false), // 모달 닫기
//       },
//       {
//         label: "로그아웃",
//         onClick: () => logout(),
//       },
//     ],
//   });
//   setModalOpen(true);
// };
//
// // 4-1. Confirm 모달 버튼 Return
//   <button button type="button" onClick={ setSampleModalData } >
//      <A11yHidden>모달 열기 버튼 제목을 설정하세요.</A11yHidden>
//   </button>
// // 4-2. BottomSheet에서 Confirm을 한번 더 띄우는 경우 핸들러함수 실행
//   <button button type="button" onClick={e => setSampleModalData(e)}>
//      <A11yHidden>모달 열기 버튼 제목을 설정하세요.</A11yHidden>
//   </button>
