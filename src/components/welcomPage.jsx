import React from "react";
import "./../styles/WelcomePage.css"; // CSS 파일 임포트

const WelcomePage = () => {
  const handleGoogleLogin = () => {
    console.log("Google 로그인 버튼 클릭!");
  };

  return (
    <div className="container">
      <img
        src="https://via.placeholder.com/300x200.png?text=Doctor+Image"
        alt="Doctor"
        className="image"
      />
      <h1 className="title">Medicall</h1>
      <p className="subtitle">환영합니다!</p>
      <button className="googleButton" onClick={handleGoogleLogin}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google Logo"
          className="googleLogo"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default WelcomePage;