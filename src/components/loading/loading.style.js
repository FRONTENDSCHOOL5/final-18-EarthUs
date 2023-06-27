import styled from "styled-components";

const LoadingImg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 4px;

  img {
    transform: translateY(20px);
    filter: drop-shadow(0 10px 2px rgba(0, 0, 0, 0.2));
    animation: bounce 0.3s ease infinite alternate;
    @keyframes bounce {
      100% {
        transform: translateY(0px);
        filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.2));
      }
    }
  }

  img:nth-child(1) {
    animation-delay: 0.1s;
  }
  img:nth-child(2) {
    animation-delay: 0.2s;
  }
  img:nth-child(3) {
    animation-delay: 0.3s;
  }
`;

export default LoadingImg;
