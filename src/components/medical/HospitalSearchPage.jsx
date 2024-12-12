// src/components/hospital/HospitalSearchPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/HospitalSearchPage.css";

const HospitalSearchPage = () => {
    const [hospitals, setHospitals] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("All");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAccessToken = () => {
        return localStorage.getItem("accessToken");
    };

    // API 요청을 수행하는 함수
    const fetchHospitals = async (keyword) => {
        setIsLoading(true);
        setError(null);
        try {
            const accessToken = getAccessToken();
            if (!accessToken) {
                throw new Error("로그인이 필요합니다.");
            }
            const response = await axios.get(`http://localhost:8080/api/v1/medical/search`, {
                params: { keyword },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (Array.isArray(response.data)) {
                // Transform the data to match frontend's expected structure
                const transformedData = response.data.map((hospital) => ({
                    id: hospital.id,
                    name: hospital.title || "No Name",
                    type: hospital.specialities.join(", ") || "No Type",
                    doctors: hospital.doctors,
                }));
                setHospitals(transformedData);
            } else {
                throw new Error("Unexpected API response format.");
            }
        } catch (err) {
            console.error("Error fetching hospitals:", err);
            setError("병원 데이터를 가져오는 데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const keyword = params.get("keyword") || "";
        setSearchQuery(keyword);
        if (keyword.trim() !== "") {
            fetchHospitals(keyword);
        } else {
            fetchHospitals("");
        }
    }, []);

    // 검색어가 변경될 때마다 API 요청 수행
    useEffect(() => {
        if (searchQuery.trim() !== "") {
            fetchHospitals(searchQuery);
        } else {
            // 검색어가 비어있을 경우 모든 병원 데이터를 가져옵니다.
            fetchHospitals("");
        }
    }, [searchQuery]);

    // 필터링된 병원 목록 계산
    // 필터링된 병원 목록 계산
    const filteredHospitals = hospitals.filter((hospital) => {
        // Safeguard against undefined 'name' and 'type'
        const hospitalName = hospital.name || "";
        const hospitalType = hospital.type || "";

        const matchesSearch =
            hospitalName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
            filter === "All" || hospitalType.toLowerCase() === filter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="hospital-page">
            <header className="hospital-header">
                <button className="back-button" onClick={() => window.history.back()}>
                    ←
                </button>
                <h1>Hospital Search</h1>
            </header>
            <div className="search-section">
                <input
                    type="text"
                    placeholder="병원 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="filter-buttons">
                    {["All", "General", "Specialized", "Clinic"].map((category) => (
                        <button
                            key={category}
                            className={`filter-button ${filter === category ? "active" : ""}`}
                            onClick={() => setFilter(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <div className="hospital-list">
                {isLoading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {!isLoading && !error && filteredHospitals.length === 0 && (
                    <p className="no-results">검색 결과가 없습니다.</p>
                )}
                {!isLoading &&
                    !error &&
                    filteredHospitals.map((hospital) => (
                        <div className="hospital-card" key={hospital.id}>
                            <img
                                src={hospital.image || "https://via.placeholder.com/100"}
                                alt={`${hospital.name}`}
                                className="hospital-image"
                            />
                            <div className="hospital-info">
                                <h3>{hospital.name}</h3>
                                <p>{hospital.type}</p>
                                <div className="hospital-doctors">
                                    <span>의사 수</span>
                                    <span>{hospital.doctors || "0"} 명</span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default HospitalSearchPage;