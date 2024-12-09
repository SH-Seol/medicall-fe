import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Loading() {
    const navigate = useNavigate();

    useEffect(() => {
        // 백엔드가 쿠키로 보내준 토큰을 가져옴
        const accessToken = Cookies.get("ac_t");
        const refreshToken = Cookies.get("rf_t");

        console.log("Loading: accessToken from cookie:", accessToken);
        console.log("Loading: refreshToken from cookie:", refreshToken);

        if (!accessToken) {
            // accessToken이 없으면 로그인 페이지로 이동
            console.error("Loading: 쿠키에 accessToken 없음. /login으로 이동");
            navigate("/login", { replace: true });
            return;
        }

        // 토큰을 localStorage에 저장
        localStorage.setItem("accessToken", accessToken);
        // 필요하다면 refreshToken도 저장
        localStorage.setItem("refreshToken", refreshToken);

        console.log("Loading: localStorage에 토큰 저장 완료, /main으로 이동");

        // 토큰이 있으면 메인 페이지로 이동
        navigate("/main", { replace: true });
    }, [navigate]);

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '20px'
    };

    return (
        <div style={containerStyle}>
            <div>토큰 처리 중...</div>
        </div>
    );
}