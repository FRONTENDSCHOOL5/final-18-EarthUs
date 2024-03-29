import { useSetRecoilState } from "recoil";

import modalConfigState from "../recoil/modalConfigAtom";
import modalState from "../recoil/modalStateAtom";

export default function useModal() {
  const setModalOpen = useSetRecoilState(modalState);
  const setModalConfig = useSetRecoilState(modalConfigState);

  const setModal = (type, title, buttons, body = null) => {
    setModalConfig({ type, title, body, buttons });
    setModalOpen(true);
  };

  return { setModal, setModalOpen };
}

// ✅ Usage
// export function sampleModal(e, setModal, setModalOpen) {
//   e.stopPropagation();
//   setModal("confirm", "노출하기 원하는 메시지 입력", [ // "confirm" or "bottomSheet"
//     {
//       label: "취소",
//       onClick: e => {
//         e.stopPropagation();
//         setModalOpen(false);
//       },
//     },
//     {
//       label: "확인",
//       onClick: () => sampleFunction(),
//     },
//   ],
//   "본문데이터가 있다면 이곳에" // 생략 가능
// );
// }
