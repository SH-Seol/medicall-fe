import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/QrPage.css";
const QrPage = () => {
    const { prescriptionId } = useParams(); // URL 파라미터에서 처방전 ID 가져오기
    const navigate = useNavigate();
    const [qrCode, setQrCode] = useState(null); // QR 코드 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        const fetchQrCode = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                if (!accessToken) {
                    throw new Error("로그인이 필요합니다.");
                }
                const response = await axios.get(
                    `http://localhost:8080/api/v1/prescriptions/${prescriptionId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                        responseType: "arraybuffer", // QR 코드 이미지 데이터를 처리하기 위해
                    }
                );
                const qrCodeData = `data:image/png;base64,${btoa(
                    new Uint8Array(response.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), "")
                )}`;
                setQrCode(qrCodeData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching QR code:", err);
                setError("QR 코드를 불러오는 데 실패했습니다.");
                setLoading(false);
            }
        };
        fetchQrCode();
    }, [prescriptionId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="qr-page">
            {/* Header */}
            <header className="qr-header">
                <div className="header-left">
                    <button className="back-button" onClick={() => navigate(-1)}>
                        ←
                    </button>
                </div>
                <div className="header-center">
                    <h2 className="qr-title">처방전</h2>
                </div>
            </header>

            {/* QR Code Display */}
            <div className="qr-code-container">
                {qrCode ? (
                    <img src={qrCode} alt="QR Code" className="qr-code-image"/>
                ) : (
                    <p>QR 코드가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default QrPage;