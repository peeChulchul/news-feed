// import React from "react";
// import styled from "styled-components";
// import { useState, useRef } from "react";

// export default function Modal() {
//   // Login Modal
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalOpen2, setModalOpen2] = useState(false);
//   const modalBackgound = useRef();

//   // const [isLogin, setIsLogin]= useState(false)

//   const ModalOpenOnclickHandler = (event) => {
//     if (event.target === modalBackgound.current) {
//       setModalOpen(false);
//       setModalOpen2(false);
//     }
//   };
//   return (
//     <>
//       <div>
//         {modalOpen && (
//           <StModalContainer ref={modalBackgound} onClick={ModalOpenOnclickHandler}>
//             <StModalContent>
//               <StLoginModalTitle>로그인</StLoginModalTitle>
//               <StModalLoginInput
//                 type="email"
//                 value={email}
//                 name="email"
//                 onChange={onChange}
//                 required
//                 placeholder="이메일을 입력해주세요"
//               />
//               <StModalLoginInput
//                 type="password"
//                 value={password}
//                 name="password"
//                 onChange={onChange}
//                 required
//                 placeholder="비밀번호를 입력해주세요"
//               />
//               <StModalLonInBtn onClick={signIn}>로그인</StModalLonInBtn>
//               <StModalSignupBtn>회원가입</StModalSignupBtn>
//               <StModalGoogleBtn>Sign in Google</StModalGoogleBtn>
//             </StModalContent>
//           </StModalContainer>
//         )}
//       </div>
//       <div>
//         {modalOpen2 && (
//           <StModalContainer ref={modalBackgound} onClick={ModalOpenOnclickHandler}>
//             <StModalContent>
//               <StModalSignupTitle>회원가입</StModalSignupTitle>
//               <StModalLoginInput placeholder="이름 입력" />
//               <StModalLoginInput
//                 type="email"
//                 value={email}
//                 name="email"
//                 onChange={onChange}
//                 required
//                 placeholder="사용할 이메일 입력"
//               />
//               <StModalLoginInput
//                 type="password"
//                 value={password}
//                 name="password"
//                 onChange={onChange}
//                 required
//                 placeholder="사용할 비밀번호 입력"
//               />
//               <StModalLoginInput placeholder="비밀번호 다시한번 확인" />
//               <StModalLonInBtn onClick={signUp}>회원가입</StModalLonInBtn>
//               <StModalSignupBtn>로그인</StModalSignupBtn>
//               <StModalGoogleBtn>Sign in Google</StModalGoogleBtn>
//             </StModalContent>
//           </StModalContainer>
//         )}
//       </div>
//     </>
//   );
// }

// const StModalContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   position: fixed;
//   top: 0;
//   left: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: rgba(0, 0, 0, 0.5);
// `;
// const StModalContent = styled.div`
//   background-color: ${theme.color.white};
//   width: 300px;
//   height: 400px;
// `;
// const StLoginModalTitle = styled.div`
//   font-size: ${theme.fontSize.xxxl};
//   font-weight: bold;
//   margin: 65px 80px 20px 98px;
// `;
// const StModalLoginInput = styled.input`
//   width: 250px;
//   height: 40px;
//   margin: 5px 23px;
// `;
// const StModalLonInBtn = styled.button`
//   background-color: ${theme.color.white};
//   border: 1px solid ${theme.color.black};
//   width: 250px;
//   height: 40px;
//   margin: 5px 23px;

//   cursor: pointer;
// `;
// const StModalSignupBtn = styled.span`
//   border-bottom: 1px solid ${theme.color.black};
//   margin-left: 222px;
//   font-size: ${theme.fontSize.sm};

//   cursor: pointer;
// `;
// const StModalGoogleBtn = styled.button`
//   background-color: ${theme.color.success};
//   color: ${theme.color.white};
//   width: 250px;
//   height: 40px;
//   margin: 10px 23px;

//   cursor: pointer;
// `;
// const StModalSignupTitle = styled.div`
//   font-size: ${theme.fontSize.xxxl};
//   font-weight: bold;
//   margin: 20px 85px 20px 85px;
// `;
