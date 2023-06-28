# EarthUs

![얼스어스](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F81769b02-3b9e-425b-ae88-d2b5e299771f%2FCover.jpg?table=block&id=8dd8f77e-25c4-443d-9020-345f2d360ea2&spaceId=a59ff032-eb41-4782-bcd9-6d0531e5d277&width=2000&userId=356d37e2-1f78-4a7c-9510-1056e62b4887&cache=v2)

### 🌎 우리의 지구를 함께 지켜요!

|          배포 링크          |        ID        | Password |
| :-------------------------: | :--------------: | :------: |
| https://earthus.netlify.app | jigujoa@user.com |  123123  |

<br>
<br>

# 목차

- [1. 프로젝트 개요](#1-프로젝트-개요)
- [2. 개발 환경](#2-개발-환경)
- [3. 협업 환경](#3-협업-환경)
- [4. 역할 분담](#4-역할-분담)
- [5. 프로젝트 구현](#5-프로젝트-구현)
- [6. 핵심 기술](#6-핵심-기술)
- [7. 트러블 슈팅](#7-트러블-슈팅)

<br>
<br>

# 1. 프로젝트 개요

- EarthUs(얼스어스)는 제로 웨이스트와 관련된 서비스를 제공하는 플랫폼입니다.
- 제로 웨이스트에 관심있는 사용자가 모여 정보를 공유하고 의견을 나누는 SNS 공간입니다.
- 브랜드 및 개인 판매자의 상품 홍보를 지원해 제로 웨이스트 경제 생태계를 형성합니다.
- 뉴스레터 발행을 통해 제로 웨이스트에 대한 최신 소식과 정보를 제공합니다.

<br>
<br>

# 2. 개발 환경

### 2-1. 프로젝트 기간

- 프로젝트 기획: 2023.06.01 ~ 2023.06.11
- 프로젝트 개발: 2023.06.12 ~ 2023.06.27

<br>
<br>

### 2-2. 기술 스택

| 프론트엔드                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |    백엔드     |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------: |
| <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/> <br> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"/> <img src="https://img.shields.io/badge/normalizedotcss-E3695F?style=for-the-badge&logo=normalizedotcss&logoColor=white"/> <img src="https://img.shields.io/badge/swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white"/> <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/> <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"/> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/> <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil-007af4.svg?style=for-the-badge&amp;logo=data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1NS4yMSA2MjMuOTEiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDp3aGl0ZX08L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im03NC42MiAyNzcuNDYgMS4yNC0uMTMgMzQuNzgtMy4yOC01My40Ny01OC42NkE5Ni40NyA5Ni40NyAwIDAgMSAzMiAxNTAuM0gzYTEyNS4zIDEyNS4zIDAgMCAwIDMyLjggODQuNTdaTTE3Ny4xMyAzNDdsLTM2IDMuNCA1My4zMiA1OC41MUE5Ni40MSA5Ni40MSAwIDAgMSAyMTkuNjMgNDc0aDI4LjkyYTEyNS4yOCAxMjUuMjggMCAwIDAtMzIuNzYtODQuNTdaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjUzLjY5IDIzMS42OGMtNi4zMy0zMS4zLTMwLjg5LTU0LjA5LTYyLjU3LTU4LjA3bC02LjM1LS43OWE0OS42MSA0OS42MSAwIDAgMS00My4zNS00OS4xM3YtMjBhNTIuNzUgNTIuNzUgMCAxIDAtMjguOTEtLjM2djIwLjM4YTc4LjU2IDc4LjU2IDAgMCAwIDY4LjY1IDc3LjgybDYuMzYuOGMyMy4yNCAyLjkyIDM0Ljc4IDIwIDM3LjgzIDM1LjFzLS45MyAzNS4zMi0yMS4yMiA0N2E3My44MSA3My44MSAwIDAgMS0zMC4wNiA5LjYybC05NS42NiA5YTEwMi40NSAxMDIuNDUgMCAwIDAtNDEuOCAxMy4zOEM5IDMzMi40NS00LjgxIDM2MyAxLjUyIDM5NC4yOXMzMC44OSA1NC4wOCA2Mi41NyA1OC4wNmw2LjM1LjhhNDkuNiA0OS42IDAgMCAxIDQzLjM1IDQ5LjEydjE4YTUyLjc1IDUyLjc1IDAgMSAwIDI4LjkxLjI2di0xOC4yNmE3OC41NSA3OC41NSAwIDAgMC02OC42NS03Ny44MWwtNi4zNi0uOGMtMjMuMjQtMi45Mi0zNC43OC0yMC4wNS0zNy44My0zNS4xMXMuOTMtMzUuMzIgMjEuMjItNDdhNzMuNjggNzMuNjggMCAwIDEgMzAuMDYtOS42M2w5NS42Ni05YTEwMi40NSAxMDIuNDUgMCAwIDAgNDEuOC0xMy4zOGMyNy42NS0xNi4wMiA0MS40LTQ2LjU0IDM1LjA5LTc3Ljg2WiIvPjwvc3ZnPg==&amp;logoColor=white"> | 제공 API 사용 |

<br>

|                                       종류                                       | 용도                                            |
| :------------------------------------------------------------------------------: | :---------------------------------------------- |
|         [React](https://react.dev/blog/2023/03/16/introducing-react-dev)         | 웹/앱의 화면을 SPA로 개발할 수 있도록 사용      |
|       [Recoil](https://recoiljs.org/ko/docs/introduction/getting-started/)       | 전역 상태 관리를 위해 사용                      |
|                [Styled Component](https://styled-components.com/)                | 스타일 구현의 편의를 위해 사용                  |
|            [@tanstack/react-query](https://tanstack.com/query/latest)            | 비동기 API 실행을 위해 사용                     |
|                  [axios](https://axios-http.com/kr/docs/intro)                   | 서버와 통신을 위해 사용                         |
|               [react-router-dom](https://reactrouter.com/en/main)                | 페이지 라우팅을 위해 사용                       |
|                      [uuid](https://www.uuidgenerator.net/)                      | 컴포넌트 리스트의 유니크한 key 생성을 위해 사용 |
| [react-infinite-scroller](https://www.npmjs.com/package/react-infinite-scroller) | 무한 스크롤 구현을 위해 사용                    |
|                       [swiper](https://swiperjs.com/react)                       | 여러 장 이미지 스와이프를 위해 사용             |
|        [styled-normalize](https://www.npmjs.com/package/styled-normalize)        | 일관된 표준 스타일을 적용하기 위해 사용         |

<br>
<br>

<p align="right" dir="auto"><a href="#top">(Top)</a></p>

<br>
<br>

# 3. 협업 환경

### 3-1. 협업 컨벤션 [(자세히 보기)](https://github.com/FRONTENDSCHOOL5/final-18-EarthUs/wiki/%F0%9F%A4%9D-%ED%98%91%EC%97%85-%ED%99%98%EA%B2%BD#1%EF%B8%8F%E2%83%A3-%ED%98%91%EC%97%85-%EC%BB%A8%EB%B2%A4%EC%85%98)

- 코드 컨벤션(ESlint, Prettier, 에어비앤비)
  - 코드 스타일 통일을 위해 ESlint를 기반으로 하는 에어비앤비 컨벤션을 사용하였습니다.
  - 코드 가독성 및 유지보수성 향상을 위해 작성 방식을 통일하였습니다.

```
{
  "singleQuote": false,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

<br>
<br>

- 커밋 컨벤션

```
🎉 init: 초기 설정
✨ feat: 기능 추가, 삭제, 변경
🐞 fix: 버그, 오류 수정
📃 docs: readme.md, json 파일 등 수정, 라이브러리 설치 (문서 관련, 코드 수정 없음)
🌈 style: CSS 등 사용자 UI 디자인 변경 (제품 코드 수정 발생, 코드 형식, 정렬, 주석 등의 변경)
🦄 refactor: 코드 리팩토링
🧪 test: 테스트 코드 추가, 삭제, 변경 등 (코드 수정 없음, 테스트 코드에 관련된 모든 변경에 해당)
🐎 ci: npm 모듈 설치 등
🐳 chore: 패키지 매니저 설정할 경우, etc 등
```

<br>
<br>

### 3-2. 협업 방식 [(자세히 보기)](https://github.com/FRONTENDSCHOOL5/final-18-EarthUs/wiki/%F0%9F%A4%9D-%ED%98%91%EC%97%85-%ED%99%98%EA%B2%BD#2%EF%B8%8F%E2%83%A3-%ED%98%91%EC%97%85-%EB%B0%A9%EC%8B%9D)

- 매일 아침 9시 데일리 스크럼 진행
- Git Flow 브랜치 전략 사용
- 디스코드 웹훅을 사용해서 github 활동 알림
- 피그마 디자인 시스템 사용 [(자세히 보기)](https://www.figma.com/file/NoUy639Gyvmg4VlEDZo5Eh/%F0%9F%8C%8E-EarthUs?type=design&node-id=75643%3A2114&mode=design&t=rPWxx0vlBcwpuYbp-1)

<br>
  
![협업방식](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7b5a64a7-26c8-414b-9982-bb20ceed219c%2FUntitled.png?table=block&id=9d21b2b1-663b-4158-9f98-07189b9e9ee6&spaceId=a59ff032-eb41-4782-bcd9-6d0531e5d277&width=2000&userId=356d37e2-1f78-4a7c-9510-1056e62b4887&cache=v2)

<br>
<br>

### 3-3. 프로젝트 관리 및 이슈 [(자세히 보기)](https://github.com/FRONTENDSCHOOL5/final-18-EarthUs/wiki/%F0%9F%A4%9D-%ED%98%91%EC%97%85-%ED%99%98%EA%B2%BD#3%EF%B8%8F%E2%83%A3-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B4%80%EB%A6%AC-%EB%B0%8F-%EC%9D%B4%EC%8A%88)

- Github Project를 통한 일정 관리 및 코드 리뷰
- Github Issue를 활용하여 업무 진행 확인 및 관리

<br>

![프로젝트 관리 및 이슈](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5403128c-e25c-438e-8634-2db75bd6d33e%2FUntitled.png?id=050483b2-9079-4ee0-a997-d68858af6bd8&table=block&spaceId=a59ff032-eb41-4782-bcd9-6d0531e5d277&width=2000&userId=356d37e2-1f78-4a7c-9510-1056e62b4887&cache=v2)

<br>
<br>

<p align="right" dir="auto"><a href="#top">(Top)</a></p>

<br>
<br>

# 4. 역할 분담

<details>
<summary>프로젝트 구조</summary>
<div markdown="1">

```
earth_us
├─ .eslintrc.json
├─ .gitignore
├─ .prettierrc.json
├─ .vscode
│  └─ settings.json
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
│  ├─ _redirects
│  ├─ assets
│  │  ├─ favicon.ico
│  │  └─ meta.png
│  └─ index.html
└─ src
   ├─ App.js
   ├─ assets
   │  ├─ fonts
   │  └─ images
   ├─ components
   │  ├─ blank
   │  │  ├─ Blank.jsx
   │  │  └─ blank.style.js
   │  ├─ chatBubble
   │  │  ├─ ChatBubble.jsx
   │  │  └─ chatBubble.style.js
   │  ├─ chatPreview
   │  │  ├─ ChatPreview.jsx
   │  │  └─ chatPreview.style.js
   │  ├─ common
   │  │  ├─ a11yHidden
   │  │  │  ├─ A11yHidden.jsx
   │  │  │  └─ a11yHidden.style.js
   │  │  ├─ avatar
   │  │  │  ├─ Avatar.jsx
   │  │  │  └─ avatar.style.js
   │  │  ├─ breakLine
   │  │  │  └─ BreakLine.jsx
   │  │  ├─ button
   │  │  │  └─ Button.jsx
   │  │  ├─ card
   │  │  │  ├─ Card.jsx
   │  │  │  └─ card.style.js
   │  │  ├─ comment
   │  │  │  ├─ Comment.jsx
   │  │  │  └─ comment.style.js
   │  │  ├─ header
   │  │  │  ├─ Header.jsx
   │  │  │  └─ header.style.js
   │  │  ├─ imagePrev
   │  │  │  ├─ ImagePrev.jsx
   │  │  │  └─ imagePrev.style.js
   │  │  ├─ input
   │  │  │  ├─ Input.jsx
   │  │  │  ├─ InputError.jsx
   │  │  │  ├─ input.style.js
   │  │  │  └─ inputError.style.js
   │  │  ├─ modal
   │  │  │  ├─ Modal.jsx
   │  │  │  └─ modal.style.js
   │  │  ├─ qrCode
   │  │  │  ├─ QrCode.jsx
   │  │  │  └─ qrCode.style.js
   │  │  ├─ tabBar
   │  │  │  ├─ TabBar.jsx
   │  │  │  └─ tabBar.style.js
   │  │  └─ textArea
   │  │     ├─ TextArea.jsx
   │  │     └─ textarea.style.js
   │  ├─ loading
   │  │  ├─ Loading.jsx
   │  │  └─ loading.style.js
   │  ├─ onboarding
   │  │  └─ Onboarding.jsx
   │  ├─ profileFeed
   │  │  ├─ ProfileFeed.jsx
   │  │  └─ profileFeed.style.js
   │  ├─ profileHeader
   │  │  ├─ ProfileHeader.jsx
   │  │  └─ profileHeader.style.js
   │  ├─ profileProduct
   │  │  ├─ ProfileProduct.jsx
   │  │  └─ profileProduct.style.js
   │  └─ userInfo
   │     ├─ UserInfo.jsx
   │     └─ userInfo.style.js
   ├─ hooks
   │  ├─ useApiInfiniteQuery.jsx
   │  ├─ useApiMutation.jsx
   │  ├─ useApiQuery.jsx
   │  ├─ useImageUploader.jsx
   │  └─ useValidations.jsx
   ├─ index.js
   ├─ pages
   │  ├─ chat
   │  │  ├─ chatList
   │  │  │  └─ ChatList.jsx
   │  │  └─ chatRoom
   │  │     ├─ ChatRoom.jsx
   │  │     └─ chatRoom.style.js
   │  ├─ error404
   │  │  └─ Error404.jsx
   │  ├─ feed
   │  │  ├─ Feed.jsx
   │  │  └─ feed.style.js
   │  ├─ follow
   │  │  ├─ Follow.jsx
   │  │  └─ follow.style.js
   │  ├─ intro
   │  │  ├─ Intro.jsx
   │  │  └─ intro.style.js
   │  ├─ post
   │  │  ├─ postDetail
   │  │  │  ├─ PostDetail.jsx
   │  │  │  └─ postDetail.style.js
   │  │  └─ postUpload
   │  │     ├─ PostImageField.jsx
   │  │     ├─ PostUpload.jsx
   │  │     └─ postUpload.style.js
   │  ├─ product
   │  │  ├─ productDetail
   │  │  │  ├─ ProductDetail.jsx
   │  │  │  └─ productDetail.style.js
   │  │  └─ productUpload
   │  │     ├─ ProductUpload.jsx
   │  │     └─ productUpload.style.js
   │  ├─ profile
   │  │  ├─ profileDetail
   │  │  │  └─ ProfileDetail.jsx
   │  │  ├─ profileEdit
   │  │  │  ├─ ProfileEdit.jsx
   │  │  │  └─ ProfileEditForm.jsx
   │  │  └─ profileUpload
   │  │     ├─ ProfileImageField.jsx
   │  │     ├─ ProfileTitle.jsx
   │  │     ├─ ProfileUpload.jsx
   │  │     └─ ProfileUpload.style.js
   │  ├─ search
   │  │  └─ Search.jsx
   │  ├─ sign
   │  │  ├─ SignIn.jsx
   │  │  ├─ SignUp.jsx
   │  │  └─ sign.style.js
   │  └─ splash
   │     ├─ Splash.jsx
   │     └─ splash.style.js
   ├─ recoil
   │  ├─ earthusDataAtom.js
   │  ├─ modalConfigAtom.js
   │  ├─ modalStateAtom.js
   │  ├─ privateDataAtom.js
   │  └─ userDataAtom.js
   ├─ routes
   │  ├─ InitRoute.jsx
   │  ├─ PrivateRoute.jsx
   │  └─ Router.jsx
   ├─ styles
   │  ├─ GlobalFont.jsx
   │  └─ GlobalStyle.jsx
   └─ utils
      └─ config.js
```

</div>
</details>

<br>

### 4-1. 팀원 소개

|                                                                                                                                                              심은지                                                                                                                                                               |                                                                                                                                                              윤지수                                                                                                                                                               |                                                                                                                                                              정신애                                                                                                                                                               |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![심은지](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb397f5fc-d3a4-496a-a865-67315dd5876a%2FUntitled.png?table=block&id=e229c596-d4c0-4e67-81e8-92066b0fe613&spaceId=a59ff032-eb41-4782-bcd9-6d0531e5d277&width=2000&userId=356d37e2-1f78-4a7c-9510-1056e62b4887&cache=v2) | ![윤지수](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd394a23e-1e06-4b77-9448-1d0204edaad4%2FUntitled.png?table=block&id=cd353067-f0e4-4d90-b27b-c1392a20d448&spaceId=a59ff032-eb41-4782-bcd9-6d0531e5d277&width=2000&userId=356d37e2-1f78-4a7c-9510-1056e62b4887&cache=v2) | ![정신애](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd73a3cff-97fa-4298-b187-849c09766a5f%2FUntitled.png?table=block&id=148f1e9f-7206-4b75-a53d-b639b0edace5&spaceId=a59ff032-eb41-4782-bcd9-6d0531e5d277&width=2000&userId=356d37e2-1f78-4a7c-9510-1056e62b4887&cache=v2) |
|                                                                                                                                              Team Leader <br> Semantic Markup Leader                                                                                                                                              |                                                                                                                                        Documentation Leader <br> Web Accessibility Leader                                                                                                                                         |                                                                                                                                              Design Leader <br> Optimization Leader                                                                                                                                               |
|                                                                                                                          [github](https://github.com/planted-ji) \| [Blog](https://velog.io/@simej1214)                                                                                                                           |                                                                                                                        [github](https://github.com/yoonmallang22) \| [Blog](https://velog.io/@yoonmallang)                                                                                                                        |                                                                                                                         [github](https://github.com/JAYCODE-git) \| [Blog](https://jaycode.tistory.com/)                                                                                                                          |

<br>
<br>

### 4-2. 역할분담

![역할분담](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0b472553-7db1-4825-8b79-bd33a5891d32%2F%25E1%2584%258B%25E1%2585%25A7%25E1%2586%25A8%25E1%2584%2592%25E1%2585%25A1%25E1%2586%25AF_%25E1%2584%2587%25E1%2585%25AE%25E1%2586%25AB%25E1%2584%2583%25E1%2585%25A1%25E1%2586%25B7.jpg?table=block&id=b71791e0-73e2-43fe-92fb-3cdb81314eb6&spaceId=a59ff032-eb41-4782-bcd9-6d0531e5d277&width=2000&userId=356d37e2-1f78-4a7c-9510-1056e62b4887&cache=v2)

<br>
<br>

<p align="right" dir="auto"><a href="#top">(Top)</a></p>

<br>
<br>

# 5. 프로젝트 구현

## 5-1. Ui

|                                                                                                                                                                 데스크탑                                                                                                                                                                 |                                                                                                                                                                 모바일                                                                                                                                                                  |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![데스크탑 버전](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe47d6d3e-ef24-4c5b-8117-81ff48ce673d%2FUntitled.png?id=2757cbd1-4e8b-4630-85dd-089d9f69ac4d&table=block&spaceId=a59ff032-eb41-4782-bcd9-6d0531e5d277&width=2000&userId=356d37e2-1f78-4a7c-9510-1056e62b4887&cache=v2) | ![모바일 버전](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F589a1948-4236-4257-b25b-201552336cec%2FFrame_140.png?table=block&id=cfaf565d-b5ad-4ae5-8340-43451b1458d2&spaceId=a59ff032-eb41-4782-bcd9-6d0531e5d277&width=2000&userId=356d37e2-1f78-4a7c-9510-1056e62b4887&cache=v2) |

## 5-2. 페이지 설명 [(자세히 보기)](https://github.com/FRONTENDSCHOOL5/final-18-EarthUs/wiki/%F0%9F%8C%8F-%EC%96%BC%EC%8A%A4%EC%96%B4%EC%8A%A4-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85)

### 로그인/회원가입

|                                                                                   인트로                                                                                   |                                                                                    로그인                                                                                    |                                                                                    회원가입                                                                                    |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![인트로](https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81q2Gj7BzFqdqpKEFVDrEaCs7wjkQh_qJZ0ksbtV6rmim4ZllN_fAsbGjsYo1fbq6fSMx4iEW8-x3QdPAP6EPQGd8oVE=w2008-h3092) | ![로그인](https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81oTnC-OcpBgeDCbcIJ5O4r3zNO9a69-GfgfWAFo5EIOLG0fnpwz3-2slt7qiK-P8GftRhomnlizH5OhFReOS4JQSyF05Q=w2008-h3092) | ![회원가입](https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81rzoB5ZJTLgZqILRNAqoBo7-8BYPehgHkQ9k1853ytvjSv44CdYTixv5M0sfgkYY9IbumZK45YYQMbF3HoUMiAZGzrkFA=w3008-h2978) |

<br>
<br>

### 홈

|                                                                                    피드                                                                                    |                                                                                    검색                                                                                    |                                                                                   채팅                                                                                   |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![피드](https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81rynfucWe9cG3TXUK8uGQPpg1Lt58zwQo4ilpygGMwE5b0OW7_AR9Y9GCaiCoh1E8hXVzWbWWtbhYRJrvARrkTJJU5e6A=w2006-h3091) | ![검색](https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81pMOE6G83FDjzMH3s0yUttNNEYgQmkYCB-DVKeFRVRIusshAsCxQ9VcCn6qj4f-EmHxazeqdrF0oEbaeidlYx_N80Joag=w2006-h3091) | ![채팅](https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81oOnZ-5bFNloBGZQhvfSixszsSU_aZ85Ne58c8jv39AemZoTTPVKFsiJpd84bhZzzdHaq6t7sojiBizaq9xhDrdTjkq=w2006-h3091) |

<br>
<br>

### 프로필

|                                                                                  내 프로필                                                                                   |                                                                                   유저 프로필                                                                                    |                                                                                    팔로워                                                                                    |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![내프로필](https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81pCK-BJ1nakYHevGz8KIi2lPz1NsCmq5JA4pUAG023BtQvHLfYtSF9nLDF4kL6NmZPFigcIx0IPrLNVgsnvx3DLfqah=w2006-h3091) | ![유저프로필](https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81qjBQ1-9o36n3kQkF1D_4iAVUkUvvyba19bBk4hahTbDokM0SQLVnfvWrI_DwpGQpHWyGhjzSAS-19KEnCMVGD_-hParA=w2008-h3092) | ![팔로워](https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81ozKQMQUQmg1sKCYi1zTZ_vZbUZMiSx7WUsPMma0SyjE6FgCCHjGgLYYsLMpuM8DYAMkkMquHIB_nlZUC2A2mvIQj2bOw=w2006-h3091) |

<br>
<br>

### 업로드

|                                                                                    게시글 작성                                                                                    |                                                                                    댓글                                                                                    |                                                                                  상품 업로드                                                                                   |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![게시물 작성](https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81rXhYYrrB9SztyFI6ay5j6ZVbkQlbABGETdf5DbGEtumg3lGyzcem9_qq5-v1q83rGlbU0UCDmig-FY80jKjrKQFLyFiA=w3008-h2978) | ![댓글](https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81rfUk36U2QofH3v-gy0_JzTAapTQ3u5b_twWClZl2kkCA4X_kVHhsKQY3zarp6hLNgjJs1A3YQAy8D76pn7qhS7WmNYKA=w3008-h2978) | ![상품업로드](https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81rTKGvEjyuWKUNdMp8YMAzHZuFTr45afwapX5NAf6IUzNQhLFYoOsQ-nCYDym4CUBIFbvkQQ5TtQeZpurnqYj_hi_t5=w3008-h2978) |

<br>
<br>

<p align="right" dir="auto"><a href="#top">(Top)</a></p>

<br>
<br>

# 6. 핵심 기술

### 6-1. 상태관리 라이브러리 도입 [(자세히 보기)](https://github.com/FRONTENDSCHOOL5/final-18-EarthUs/wiki/%F0%9F%94%A5-%ED%95%B5%EC%8B%AC-%EA%B8%B0%EC%88%A0#4%EF%B8%8F%E2%83%A3-%EC%9B%B9-%EC%A0%91%EA%B7%BC%EC%84%B1)

- 상태 관리를 하나의 라이브러리로만 진행하는 것이 아니라 각각의 라이브러리의 장점을 살려
  Client State를 관리하는 `Recoil`과 ServerState를 관리하는 `ReactQuery`를 조합하는 전략을 시행.

<br>
<br>

### 6-2. API 호출을 위한 커스텀 훅 제작 [(자세히 보기)](https://github.com/FRONTENDSCHOOL5/final-18-EarthUs/wiki/%F0%9F%94%A5-%ED%95%B5%EC%8B%AC-%EA%B8%B0%EC%88%A0#2%EF%B8%8F%E2%83%A3-api-%ED%98%B8%EC%B6%9C%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%BB%A4%EC%8A%A4%ED%85%80-%ED%9B%85-%EC%A0%9C%EC%9E%91)

- 사용자에게 데이터를 보여주는 `get` 메서드를 실행하는 경우 `useQuery` 기능을 실행.
- 사용자가 입력한 값을 전송하는 `Post` `Put` 메서드를 실행하는 경우 `useMutation` 기능을 실행.
- 사용자가 첨부한 이미지 파일을 전송하기 위해 `Post` 메서드를 실행하는 경우 `useMutation` 기능을 실행하고 첨부된 이미지 문자열을 치환해서 반환.
- 사용자가 스크롤할 때마다 새로운 데이터를 가져오기 위해 `useQuery`를 계속해서 호출하는 경우 `react-infinite-scroller` 라이브러리의 `InfiniteScroll` 컴포넌트와 호환성이 좋은 `useInfiniteQuery` 기능을 실행.

<br>
<br>

### 6-3. 시맨틱 마크업 [(자세히 보기)](https://github.com/FRONTENDSCHOOL5/final-18-EarthUs/wiki/%F0%9F%94%A5-%ED%95%B5%EC%8B%AC-%EA%B8%B0%EC%88%A0#3%EF%B8%8F%E2%83%A3-%EC%8B%9C%EB%A7%A8%ED%8B%B1-%EB%A7%88%ED%81%AC%EC%97%85)

- 검색 API를 통한 기능 구현에서 일치하는 검색어를 표현할 때 사용자의 현재 활동과 연관이 있는 부분에 주의를 끌기 위해 사용하는 `<mark>`로 하이라이트 표현.

<br>
<br>

### 6-4. 웹 접근성 [(자세히 보기)](https://github.com/FRONTENDSCHOOL5/final-18-EarthUs/wiki/%F0%9F%94%A5-%ED%95%B5%EC%8B%AC-%EA%B8%B0%EC%88%A0#4%EF%B8%8F%E2%83%A3-%EC%9B%B9-%EC%A0%91%EA%B7%BC%EC%84%B1)

- swiper slide 탭으로 페이지 전환 가능.
- 모달이 열렸을 때 모달 안에서 포커스 잃지 않고 이동.
- 일치하는 검색어에 적용되는 하이라이트 기능을 청각적인 강조로 추가 구현.
- 실시간으로 업데이트 되는 채팅 메세지를 인식해 스크린 리더로 읽어주는 기능 구현.

<br>
<br>

<p align="right" dir="auto"><a href="#top">(Top)</a></p>

<br>
<br>

# 7. 트러블 슈팅

- [은지] [검색 기능 최적화를 위한 debouncing 적용](https://github.com/FRONTENDSCHOOL5/final-18-EarthUs/wiki/%F0%9F%92%A5-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85#2%EF%B8%8F%E2%83%A3-%EA%B2%80%EC%83%89-%EA%B8%B0%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94%EB%A5%BC-%EC%9C%84%ED%95%9C-debouncing-%EC%A0%81%EC%9A%A9)
- [지수] [useInfiniteQuery의 queryFn 파라미터 사용](https://github.com/FRONTENDSCHOOL5/final-18-EarthUs/wiki/%F0%9F%92%A5-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85#useapiinfinitequery)
- [신애] [ReactQuery를 활용한 ServerState 제어](https://github.com/FRONTENDSCHOOL5/final-18-EarthUs/wiki/%F0%9F%92%A5-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85#1%EF%B8%8F%E2%83%A3-reactquery%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-serverstate-%EC%A0%9C%EC%96%B4)

<br>
<br>

<p align="right" dir="auto"><a href="#top">(Top)</a></p>
