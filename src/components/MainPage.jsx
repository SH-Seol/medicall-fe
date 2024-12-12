import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/MainPage.css";

import skinImage from "../images/skin.jpg";
import internalMedicineImage from "../images/internal.jpeg";
import orthopedicsImage from "../images/orthopedics.jpeg";
import familyMedicineImage from "../images/fam.jpg";
import orientalMedicineImage from "../images/kor.jpeg";
import entImage from "../images/ent.jpg";
import ReconImage from "../images/recon.jpg";

const MainPage = () => {
    const [profile, setProfile] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if(typeof e === "string") {
            navigate(`/search?keyword=${encodeURIComponent(e.trim())}`);
            return;
        }
        else if(e&& e.preventDefault) {
            e.preventDefault();
        }
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
        }
    };


    const medicalDepartments = [
        { name: "피부과", image: skinImage },
        { name: "내과", image: internalMedicineImage },
        { name: "정형외과", image: orthopedicsImage },
        { name: "가정의학과", image: familyMedicineImage },
        { name: "한의원", image: orientalMedicineImage },
        { name: "이비인후과", image: entImage },
        { name: "재활의학과", image: ReconImage },
    ];

    useEffect(() => {
        const profileUrl = process.env.REACT_APP_PROFILE_URL;
        const doctorsUrl = process.env.REACT_APP_DOCTORS_URL;
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            alert("로그인이 필요합니다.");
            navigate("/login");
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
                setProfile(response.data);
            })
            .catch((error) => {
                console.error("프로필 요청 오류:", error);
                alert("프로필을 불러오지 못했습니다. 다시 로그인해주세요.");
                navigate("/login");
            });

        axios
            .get(doctorsUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                console.log("의사 데이터:", response.data);
                setDoctors(response.data);
            })
            .catch((error) => {
                console.error("의사 데이터 요청 오류:", error);
            });
    }, [navigate]);

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

            <div className="search-section">
                <div className="search-wrapper">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="검색하기"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="search-icon">
                            <span role="img" aria-label="search">🔍</span>
                        </button>
                    </form>
                </div>
            </div>

            <div className="department-section">
                <h2>진료과목</h2>
                <div className="department-grid">
                    {medicalDepartments.map((department, index) => (
                        <div className="department-card"
                             key={index}
                             onClick={() => handleSearch(department.name)}
                        >
                            <img
                                className="department-image"
                                src={department.image}
                                alt={`${department.name} 이미지`}
                            />
                            <p className="department-name">{department.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="task-section">
                <h2>주요 기능</h2>
                <div className="task-icons">
                    <div className="task-icon">
                        <span>📅</span>
                        <p>예약 확인</p>
                    </div>
                    <div className="task-icon">
                        <span>💊</span>
                        <p>약 처방</p>
                    </div>
                    <div className="task-icon">
                        <span>📖</span>
                        <p>의료 기록</p>
                    </div>
                </div>
            </div>

            <div className="history-section">
                <h2>
                    의사 리스트
                    <span className="more-button" onClick={() => alert("더 보기")}>
                        더 보기
                    </span>
                </h2>
                {filteredDoctors.map((doctor) => (
                    <div className="doctor-card" key={doctor.id}>
                        <img
                            className="doctor-image"
                            src={doctor.image || "https://via.placeholder.com/50"}
                            alt="의사 이미지"
                        />
                        <div className="doctor-info">
                            <p className="doctor-name">{doctor.name}</p>
                            <p className="doctor-specialty">{doctor.specialty}</p>
                            <p className="doctor-review">{doctor.review}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;