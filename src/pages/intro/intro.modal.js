// SNS 간편 로그인 confirm
export default function setSnsLoginConfirm(e, setModal, setModalOpen) {
  e.stopPropagation();
  setModal(
    "confirm",
    "SNS 간편 로그인",
    [
      {
        label: "닫기",
        onClick: () => setModalOpen(false),
      },
    ],
    "준비중입니다.",
  );
}
