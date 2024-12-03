import React from "react";
import welcomeImage from "../images/welimg.jpeg";
import "../styles/WelcomePage.css";

const WelcomePage = () => {
  const handleKakaoLogin = () => {
    console.log("카카오 로그인 버튼 클릭!");
    // // 카카오 로그인 로직 추가 가능
    // const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID
    // const REDIRECT_URI = process.REDIRECT_URI
    // const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  return (
    <div className="container">
      {/* 이미지 */}
      <img src={welcomeImage} alt="Welcome" className="image" />

      {/* 텍스트 */}
      <h1 className="title">Medicall</h1>
      <p className="subtitle">환영합니다!</p>

      {/* 카카오 로그인 버튼 */}
      <button className="button" onClick={handleKakaoLogin}>
        카카오로 로그인
      </button>
    </div>
  );
};

export default WelcomePage;