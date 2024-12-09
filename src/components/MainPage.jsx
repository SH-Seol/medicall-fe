import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/MainPage.css";

const MainPage = () => {
    const [profile, setProfile] = useState(null); // 프로필 상태
    const navigate = useNavigate();

    useEffect(() => {
        const profileUrl = process.env.REACT_APP_PROFILE_URL; // 기본 URL 설정
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/login"); // 토큰 없음 -> 로그인 페이지로 이동
            return;
        }

        // API 요청
        axios
            .get(profileUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                console.log("프로필 데이터:", response.data);
                setProfile(response.data); // 응답 데이터를 상태에 저장
            })
            .catch((error) => {
                console.error("프로필 요청 오류:", error);
                alert("프로필을 불러오지 못했습니다. 다시 로그인해주세요.");
                navigate("/login"); // 오류 발생 시 로그인 페이지로 이동
            });
    }, [navigate]);

    return (
        <div className="dashboard-container">
            {profile ? (
                <div className="profile-section">
                    <img
                        className="profile-image"
                        src={profile.profileImage || "https://via.placeholder.com/50"}
                        alt="프로필 이미지"
                    />
                    <div className="profile-info">
                        <p>안녕하세요 {profile.nickname} 님,</p>
                        <span>건강한 하루 보내세요!</span>
                    </div>
                    <div className="notification-icon">🔔</div>
                </div>
            ) : (
                <div className="loading-message">프로필 정보를 불러오는 중...</div>
            )}
        </div>
    );
};

export default MainPage;