/* eslint-disable no-undef */
/* eslint-disable no-shadow */

// 신고하기 confirm
export function reportConfirm(e, handleReport, postId, setModal, setModalOpen) {
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
      label: "신고하기",
      onClick: () => handleReport(postId),
    },
  ]);
}

// 게시물 삭제 confirm
export function deleteConfirm(
  e,
  handleDeleteFeed,
  postId,
  setModal,
  setModalOpen,
) {
  e.stopPropagation();
  setModal("confirm", "파일을 삭제하시겠어요?", [
    {
      label: "취소",
      onClick: e => {
        e.stopPropagation();
        setModalOpen(false);
      },
    },
    {
      label: "삭제",
      onClick: () => handleDeleteFeed(postId),
    },
  ]);
}

// 게시물 수정/삭제 bottomSheet
export function deleteCardModal(
  e,
  navigate,
  postId,
  deleteConfirm,
  setModal,
  setModalOpen,
  handleDeleteFeed,
  POST_EDIT,
) {
  e.stopPropagation();
  setModal("bottomSheet", null, [
    {
      label: "삭제",
      onClick: e =>
        deleteConfirm(e, handleDeleteFeed, postId, setModal, setModalOpen),
    },
    {
      label: "수정",
      onClick: () => navigate(POST_EDIT),
    },
  ]);
}

// 게시물 알림 설정 bottomSheet
export function notificationsConfirm(e, setModal, setModalOpen) {
  e.stopPropagation();
  setModal("confirm", "알림을 설정할까요?", [
    {
      label: "해제",
      onClick: e => {
        e.stopPropagation();
        setModalOpen(false);
      },
    },
    {
      label: "설정",
      onClick: e => {
        e.stopPropagation();
        setModalOpen(false);
      },
    },
  ]);
}

// 게시물 알림 설정 bottomSheet
export function notificationsModal(e, accountname, setModal, setModalOpen) {
  e.stopPropagation();
  setModal("bottomSheet", `@${accountname}`, [
    {
      label: "알림 관리",
      onClick: e => notificationsConfirm(e, setModal, setModalOpen),
    },
  ]);
}
