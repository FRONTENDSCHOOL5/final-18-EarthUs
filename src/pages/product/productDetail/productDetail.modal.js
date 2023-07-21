/* eslint-disable no-undef */
/* eslint-disable no-shadow */

// 신고하기 confirm
export default function setDeleteConfirm(
  e,
  id,
  handleDeleteFeed,
  setModal,
  setModalOpen,
) {
  e.stopPropagation();
  setModal("confirm", "게시물을 신고하시겠어요?", [
    {
      label: "취소",
      onClick: e => {
        e.stopPropagation();
        setModalOpen(false);
      },
    },
    {
      label: "삭제",
      onClick: () => handleDeleteFeed(id),
    },
  ]);
}
