# Newsfeed Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 프로젝트

### 팀원
- [peeChulchul](https://github.com/peeChulchul)
  - Sidebar UI
  - redux 로직 작성
  - 발표 및 시연 영상 대본 작성
- [surely07](https://github.com/surely07)
  - github 협업 전략 및 규칙 설정
  - Home UI
  - 게시물 List
  - Hashtag Carousel UI
  - 발표 및 시연 영상 대본 작성
- [dosion9](https://github.com/dosion9)
  - 게시물 업로드 Form
  - 게시물 수정 Form
  - 유저 정보 수정 Form
  - 게시물 상세 페이지 UI
  - 발표 및 시연 영상 대본 작성
- [loveytheb](https://github.com/loveytheb)
  - Header UI
  - 회원가입 / 로그인 / 로그아웃 기능
  - 발표 및 시연 영상 대본 작성
  - 발표 및 시연

### 소개
- 뉴스피드의 컨셉은 <b>건강</b>으로 설정했으며, <b>건강</b>이라는 컨셉에 맞게 운동과 식단의 게시 및 공유할 수 있는 뉴스피드 프로젝트입니다.
- 회원가입은 사용자의 이메일 및 구글, github Oauth를 사용하였습니다.
### 사이트
![image](https://github.com/nbc-9gling/news-feed/assets/146798554/2fe3a066-990e-4607-bf43-e9636f3419d9)

[프로젝트로 이동하기](https://news-feed-eta-pied.vercel.app/)

## 기술 스택 및 사용 라이브러리
- react
- redux
- react-router-dom
- react-icons
- styled-components
- styled-reset
- uuid

- Firebase
- Firebase - Authentication
- Firebase - Storage
- Firebase - Firestore Database

## 프로젝트 설치

### clone repository

```
git clone https://github.com/nbc-9gling/news-feed.git
```

### Install npm dependencies

```
yarn
yarn install
```

### Start dev-server

```
yarn start
```

## 프로젝트 구조 (Redux)

```
📦 src
 ┣ 📂 components
 ┣ 📂 data
 ┃ ┗ 📂 sidebar
 ┣ 📂 fb
 ┣ 📂 pages
 ┃ ┣ 📂 common
 ┃ ┣ 📂 detail_post
 ┃ ┣ 📂 home
 ┃ ┣ 📂 layout
 ┃ ┣ 📂 manage_post
 ┃ ┗ 📂 modifyuser
 ┣ 📂 redux
 ┃ ┣ 📂 config
 ┃ ┗ 📂 modules
 ┣ 📂 routers
 ┣ 📂 styles
 ┣ 📂 utils
 ┣ 📜 App.js
 ┣ 📜 index.js
 ┣ 📜 reportWebVitals.js
 ┗ 📜 setupTests.js
```

## 요구사항

### 🔵 필수 구현 사항

##### 로그인, 회원 가입
- ✔️ Authentication에서 제공하는 api를 이용하여 아래 회원가입, 로그인을 구현해보세요.
- ✔️ 아이디(이메일), 패스워드
- ✔️ 소셜 로그인 (구글, 깃헙) [CORS 이슈]

##### CRUD
- ✔️ Firestore 에서 제공하는 api를 이용하여 CRUD 데이터베이스 핸들링을 구현해보세요
- ✔️ CUD(등록, 수정, 삭제)가 일어날 때 마다 R(조회)해서 자연스럽게 화면 변경을 해보세요.

##### 마이 페이지
- ✔️ [내 게시물 보기] Authentication 에서 제공하는 uid 를 이용해서 내 게시물들이 모일 수 있게 해보세요.
- ✔️ [프로필 수정 기능] Storage 에서 제공하는 api를 이용하여 이미지 업로드와 다운로드 url 을 받아서 이미지 핸들링을 해보세요.

##### 배포하기
- ✔️ Vercel 이라는 호스팅플랫폼을 이용해 배포합니다.
- ✔️ 배포에 적용될 브랜치는 main 또는 master 브랜치로 적용합니다.

##### Git을 최대한 활용해보기!
- ✔️ Pull Request 활용하기!
- ✔️ Branch 만들어 작업하기
- ✔️ 코드 리뷰 해보기!

### 🔵 추가 구현 사항
- ❌ 로그인, 회원가입 예외 처리
- ❌ 비밀번호 찾기 기능
- ❌ 팔로우, 팔로워 기능
- ❌ 팔로우한 상대 게시물 확인 기능
- ❌ 댓글 기능
- ❌ 좋아요, 북마크 기능
- ❌ 반응형 웹 구현
- ❌ 무한스크롤 기능
- ❌ 더보기 기능
- ❌ memo, useMemo, useCallback 을 이용한 렌더링 최적화 적용
- ❌ Vercel 에 배포한 뒤 커스텀 도메인 적용 (500원 정도하는 저렴한 도메인 권장)
