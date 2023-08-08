/* eslint-disable no-shadow */
// 로그아웃 confirm
export function setLogout(e, handleSignOut, setModal, setModalOpen) {
  e.stopPropagation();
  setModal("confirm", "로그아웃 하시겠어요?", [
    {
      label: "취소",
      onClick: e => {
        e.stopPropagation();
        setModalOpen(false);
      },
    },
    {
      label: "로그아웃",
      onClick: () => handleSignOut(),
    },
  ]);
}

// 프로필 수정 bottomSheet
export function setProfileModal(
  e,
  navigate,
  handleSignOut,
  setModal,
  setModalOpen,
  PRODUCT_DETAIL,
  PROFILE_EDIT,
) {
  e.stopPropagation();
  setModal("bottomSheet", null, [
    {
      label: "판매중인 상품 보기",
      onClick: () => navigate(PRODUCT_DETAIL),
    },
    {
      label: "프로필 수정",
      onClick: () => navigate(PROFILE_EDIT),
    },
    {
      label: "로그아웃",
      onClick: e => setLogout(e, handleSignOut, setModal, setModalOpen), // Passing handleSignOut here
    },
  ]);
}

// 채팅방 나가기 bottomSheet
export function setChatRoom(e, navigate, setModal, CHAT_LIST) {
  e.stopPropagation();
  setModal("bottomSheet", null, [
    {
      label: "채팅방 나가기",
      onClick: () => navigate(CHAT_LIST),
    },
  ]);
}
