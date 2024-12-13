import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/PrescriptionList.css";

const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]); // 처방전 목록 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const navigate = useNavigate();

    const getAccessToken = () => {
        return localStorage.getItem("accessToken");
    };

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const accessToken = getAccessToken();
                if (!accessToken) {
                    throw new Error("로그인이 필요합니다.");
                }
                const response = await axios.get("http://localhost:8080/api/v1/prescriptions", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // 인증 토큰 추가
                    },
                });

                setPrescriptions(response.data); // 처방전 데이터 상태에 저장
                setLoading(false);
            } catch (err) {
                console.error("Error fetching prescriptions:", err);
                setError("처방전 데이터를 불러오지 못했습니다.");
                setLoading(false);
            }
        };

        fetchPrescriptions();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="prescription-list-container">
            {/* Header */}
            <div className="header">
                <button className="back-button" onClick={() => window.history.back()}>
                    ←
                </button>
                <h2 className="header-title">처방전 목록</h2>
            </div>

            {/* 처방전 목록 */}
            <div className="prescriptions">
                {prescriptions.length > 0 ? (
                    prescriptions.map((prescription) => (
                        <div className="prescription-card" key={prescription.id}
                             onClick={() => navigate(`/prescriptions/${prescription.id}`)}
                        >
                            <p className="prescription-department">{prescription.specialty || "Unknown Department"}</p>
                            <p className="prescription-date">{new Date(prescription.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-prescriptions">처방전이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default PrescriptionList;