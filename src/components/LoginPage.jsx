import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import welcomeImage from "../images/welimg.jpeg";
import "../styles/LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // URL에서 토큰 추출
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");

        if (token) {
            console.log("Received token:", token);
            localStorage.setItem("token", token);
            console.log("Token stored in localStorage");
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const handleKakaoLogin = () => {
        // Spring Boot로 로그인 요청
        window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
    };

    return (
        <div className="container">
            <img src={welcomeImage} alt="Welcome" className="image" />
            <h1 className="title">Medicall</h1>
            <p className="subtitle">환영합니다!</p>
            <button className="button" onClick={handleKakaoLogin}>
                카카오로 로그인
            </button>
        </div>
    );
};

export default LoginPage;