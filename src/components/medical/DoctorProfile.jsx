// src/DoctorProfile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import doctorImage from "../../images/doctor2.png"; // 로컬 이미지 import


const DoctorProfile = ({ doctorId }) => {
    const [doctorData, setDoctorData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch doctor data from the API
    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`/api/v1/medical/${doctorId}`);
                setDoctorData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching doctor data:", error);
                setLoading(false);
            }
        };

        fetchDoctorData();
    }, [doctorId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!doctorData) {
        return <div>Error: Unable to load doctor data.</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>선생님 정보</h2>
            <DoctorCard doctor={doctorData} />
        </div>
    );
};

const DoctorCard = ({ doctor }) => {
    const { hospital, patientsTreated, experience, likes } = doctor;

    return (
        <div style={styles.card}>
            {/* Doctor Image */}
            <div style={styles.imageContainer}>
                <img src={doctorImage} alt="Doctor" style={styles.image} />
            </div>

            {/* Doctor Details */}
            <div style={styles.info}>
                <h3>{hospital} 선생님</h3>
                <p>
                    <strong>병원:</strong> {hospital}
                </p>
                <p>
                    <strong>진료 환자 수:</strong> {patientsTreated}명
                </p>
                <p>
                    <strong>경력:</strong> {experience}년
                </p>
                <p style={styles.likes}>
                    <span style={styles.heart}>❤️</span> {likes} 좋아요
                </p>
            </div>

            {/* Request Button */}
            <button style={styles.button}>진료 요청</button>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    title: {
        textAlign: "center",
        color: "#333",
        marginBottom: "20px",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    imageContainer: {
        marginBottom: "15px",
    },
    image: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover",
    },
    info: {
        textAlign: "center",
        lineHeight: "1.5",
    },
    likes: {
        color: "#e74c3c",
        fontSize: "16px",
        marginTop: "10px",
    },
    heart: {
        fontSize: "18px",
        verticalAlign: "middle",
    },
    button: {
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#3498db",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default DoctorProfile;