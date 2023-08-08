// 공유하기 confirm
export default function setShareConfirm(e, setModal, setModalOpen) {
  e.stopPropagation();
  setModal(
    "confirm",
    "공유하기",
    [
      {
        label: "닫기",
        onClick: () => setModalOpen(false),
      },
    ],
    "준비중",
  );
}
