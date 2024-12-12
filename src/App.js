import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/auth/Loading";
import LoginPage from "./components/auth/LoginPage";
import LoginTerm from "./components/auth/LoginTerm";
import MainPage from "./components/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";

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