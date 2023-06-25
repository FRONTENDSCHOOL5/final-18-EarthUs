import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Camera from "../../../assets/images/camera.svg";
import ChatBubble from "../../../components/chatBubble/ChatBubble";
import A11yHidden from "../../../components/common/a11yHidden/A11yHidden";
import Button from "../../../components/common/button/Button";
import useImgMutationHook from "../../../hooks/useImageUploader";

import {
  GlobalStyle,
  ImgSection,
  ImgInput,
  Label,
  ImgAddBtn,
  ImgBtn,
  MessageSection,
  TextInput,
} from "./chatRoom.style";

export default function ChatRoom() {
  const [content, setContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [messages, setMessages] = useState([]);

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

    // * 시간과 함께 메시지 생성
    const currentTime = getCurrentTime();
    const newMessage = {
      key: uuidv4(),
      content,
      uploadedImage,
      time: currentTime,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
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
      <section className="wrap">
        <A11yHidden>채팅방</A11yHidden>
        <section className="bringBubble">
          <ChatBubble
            profileImg=""
            bringMessage="옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 넣는 풍부하게 뛰노는 인생의 힘있다."
            isReceived
          />
          <ChatBubble
            profileImg=""
            bringMessage="원하는 물건 있으신가용?"
            isReceived
          />
        </section>
        <section className="sendBubble">
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
        <MessageSection>
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
            variant={(content || uploadedImage) && "primary"}
            type="submit"
            onClick={handlePostMessage}
            disabled={!content && !uploadedImage}
            aria-label="메시지 전송하기"
          >
            입력
          </Button>
        </MessageSection>
      </section>
    </>
  );
}
