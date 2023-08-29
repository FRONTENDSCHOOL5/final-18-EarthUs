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
        {modalConfig.body ? modalConfig.body : ""}
        <div className="button-wrap" ref={modal}>
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
// // 1. useModal Hook 호출
// const { setModal, setModalOpen } = useModal();

// // 2. 모달 트리거 설정
// <button
//   type="button"
//   onClick={e => setSampleModalData(e, setModal, setModalOpen)}
// >
//   모달 열기 버튼
// </button>;
