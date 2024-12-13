import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/auth/Loading";
import LoginPage from "./components/auth/LoginPage";
import LoginTerm from "./components/auth/LoginTerm";
import MainPage from "./components/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DoctorProfile from "./components/medical/DoctorProfile";
import HospitalSearchPage from "./components/medical/HospitalSearchPage";
import PrescriptionList from "./components/medical/PrescriptionList";
import QrPage from "./components/medical/QrPage";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* 초기 결정 라우트: 토큰 및 약관 동의 여부 확인 후 라우팅 */}
                <Route path="/loading" element={<Loading />} />

                {/* 로그인 페이지 */}
                <Route path="/login" element={<LoginPage />} />

                {/* 약관 동의 페이지 */}
                <Route path="/login/term" element={<LoginTerm />} />

                {/* 의사 세부 사항 조회 페이지 */}
                <Route path="/doctors/:doctorId" element={<DoctorProfile />} />

                {/* 병원 검색 페이지 */}
                <Route path="/search" element={<HospitalSearchPage />} />

                {/* 처방전 목록 페이지 */}
                <Route path="/prescriptions" element={<PrescriptionList />} />
                {/* 처방전 qr 페이지 */}
                <Route path="/prescriptions/:prescriptionId" element={<QrPage />} />
                {/* 보호된 경로: 토큰 없으면 /login으로 이동 */}
                <Route
                    path="/main"
                    element={
                        <ProtectedRoute>
                            <MainPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;