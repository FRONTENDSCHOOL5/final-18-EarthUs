import React, { useState, useEffect } from "react";

import Camera from "../../../assets/images/camera.svg";
import ChatBubble from "../../../components/chatBubble/ChatBubble";
import Button from "../../../components/common/button/Button";
import useImgMutationHook from "../../../hooks/useImageUploader";

import {
  GlobalStyle,
  ImgSection,
  ImgInput,
  Label,
  ImgAddBtn,
  ImgBtn,
  Article,
  TextInput,
} from "./chatRoom.style";

export default function ChatRoom() {
  const [content, setContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageCounter, setMessageCounter] = useState(0);

  const handleMessageInput = e => {
    setContent(e.target.value);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // * 메시지 등록하기
  const handlePostMessage = e => {
    e.preventDefault();

    if (content.trim() === "") {
      return; // 입력란이 비어 있을 경우 함수 실행 중지
    }

    // * 시간과 함께 메시지 생성
    const currentTime = getCurrentTime();
    const newMessage = {
      key: messageCounter,
      content,
      uploadedImage,
      time: currentTime,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessageCounter(prevCounter => prevCounter + 1); // 메시지가 생성될 때마다 카운터 증가
    setContent("");
    setUploadedImage(null);
    console.log("메시지가 전송되었습니다.", content);
  };

  // * 이미지 업로드 처리
  const { mutation: uploadProfileImage, image } =
    useImgMutationHook("/image/uploadfile");

  const handleImgUpload = e => {
    const uploadImageFile = e.target.files[0];
    uploadProfileImage.mutate(uploadImageFile);
  };

  // * 업로드 이미지 변경 시 재설정
  useEffect(() => {
    if (image) {
      setUploadedImage(image);
    }
  }, [image]);

  // * ChatRoom 페이지 여부
  const isChatRoom = true;

  return (
    <>
      {isChatRoom && <GlobalStyle chatRoom />}
      <section>
        <section>
          {messages.map(message => (
            <ChatBubble
              key={message.key}
              isReceived={false}
              sentMessage={message.content}
              uploadedImage={message.uploadedImage}
              currentTime={message.time}
            />
          ))}
        </section>
        <Article>
          <ImgSection>
            <Label htmlFor="image" aria-label="이미지 업로드하기" />
            <ImgInput
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImgUpload}
            />
            <ImgAddBtn type="submit">
              <ImgBtn src={Camera} className="cameraIcon" alt="" />
            </ImgAddBtn>
          </ImgSection>
          <TextInput
            type="text"
            value={content}
            placeholder="메시지 입력하기…"
            onChange={handleMessageInput}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handlePostMessage(e);
              }
            }}
          />
          <Button
            size="sm"
            variant={content || uploadedImage ? "primary" : "disabled"}
            type="submit"
            onClick={handlePostMessage}
            aria-label="메시지 전송하기"
          >
            입력
          </Button>
        </Article>
      </section>
    </>
  );
}
