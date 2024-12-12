// src/components/hospital/HospitalSearchPage.jsx
import React, { useState } from "react";
import axios from "axios";
import "../styles/HospitalSearchPage.css";

const HospitalSearchPage = () => {
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
    const [hospitals, setHospitals] = useState([]); // 병원 데이터 상태
    const [loading, setLoading] = useState(false);

    // 병원 검색 핸들러
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(
                `/api/v1/hospitals?specialty=${encodeURIComponent(searchTerm)}`
            );
            setHospitals(response.data); // 병원 데이터 업데이트
        } catch (error) {
            console.error("병원 검색 오류:", error);
            alert("병원 데이터를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hospital-search-container">
            {/* 검색 바 */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="진료과목을 검색하세요 (예: 내과, 안과)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
            </div>

            {/* 검색 결과 */}
            {loading ? (
                <div className="loading-message">병원 정보를 불러오는 중...</div>
            ) : (
                <div className="hospital-list">
                    {hospitals.length > 0 ? (
                        hospitals.map((hospital) => (
                            <div className="hospital-card" key={hospital.id}>
                                {/* 병원 사진 */}
                                <img
                                    className="hospital-image"
                                    src={hospital.image || "https://via.placeholder.com/150"}
                                    alt={`${hospital.name} 사진`}
                                />
                                {/* 병원 정보 */}
                                <div className="hospital-info">
                                    <h3>{hospital.name}</h3>
                                    <p>{hospital.specialties.join(", ")}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">검색 결과가 없습니다.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HospitalSearchPage;