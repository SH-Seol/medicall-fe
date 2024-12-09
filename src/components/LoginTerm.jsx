import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginTerm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search);
    const token = queryString.get("token");

    if (token) {
      console.log("LoginTerm: Received allowance token:", token);
      localStorage.setItem("token", token);
    } else {
      console.error("LoginTerm: 약관 토큰 없음. /login으로 이동");
      alert("로그인에 실패했습니다.");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleAgree = () => {
    const TERM_URL = process.env.REACT_APP_TERM_DIRECTION;
    const token = localStorage.getItem("token");

    if (!TERM_URL || !token) {
      alert("환경 변수가 설정되지 않았거나 로그인 정보가 없습니다.");
      navigate("/login", { replace: true });
      return;
    }

    fetch(TERM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // 백엔드에서 allowance 토큰 검증
      },
      body: JSON.stringify({ token }),
    })
        .then((response) => {
          if (!response.ok) throw new Error("약관 동의 실패");
          return response.json();
        })
        .then(() => {
          // 약관 동의 후 다시 authRedirectUrl로 가거나 / 로 이동해서 Decision 통해 /main으로 갈 수도 있음
          // 여기서는 바로 /main으로 이동한다고 가정
          navigate("/main", { replace: true });
        })
        .catch((error) => {
          console.error(error);
          alert("약관 동의 요청에 실패했습니다. 다시 시도해주세요.");
        });
  };

  const containerStyle = {
    textAlign: "center",
    padding: "20px",
  };
  const buttonStyle = {
    backgroundColor: "#007BFF",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
      <div style={containerStyle}>
        <h1>약관 동의</h1>
        <p>이용 약관에 동의하시겠습니까?</p>
        <button onClick={handleAgree} style={buttonStyle}>
          동의하고 계속하기
        </button>
      </div>
  );
};

export default LoginTerm;