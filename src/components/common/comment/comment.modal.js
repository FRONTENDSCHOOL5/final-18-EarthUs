/* eslint-disable no-shadow */

// 댓글삭제 confirm
export function deleteConfirm(e, handleDeleteComment, setModal, setModalOpen) {
  e.stopPropagation();
  setModal("confirm", "댓글을 삭제하시겠어요?", [
    {
      label: "취소",
      onClick: e => {
        e.stopPropagation();
        setModalOpen(false);
      },
    },
    {
      label: "신고하기",
      onClick: () => handleDeleteComment(),
    },
  ]);
}

// 댓글신고 confirm
export function reportConfirm(e, handleReportComment, setModal, setModalOpen) {
  e.stopPropagation();
  setModal("confirm", "댓글을 신고하시겠어요?", [
    {
      label: "취소",
      onClick: e => {
        e.stopPropagation();
        setModalOpen(false);
      },
    },
    {
      label: "신고하기",
      onClick: () => handleReportComment(),
    },
  ]);
}
