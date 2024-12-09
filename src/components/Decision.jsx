// Decision.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Decision = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            // 토큰이 없으면 로그인 페이지로
            navigate('/login', { replace: true });
            return;
        }

        // 토큰이 있으면 약관 동의 여부 확인
        const TERMS_CHECK_URL = process.env.REACT_APP_TERMS_CHECK_URL;
        if (!TERMS_CHECK_URL) {
            console.error("TERMS_CHECK_URL 환경변수가 설정되지 않았습니다.");
            navigate('/login', { replace: true });
            return;
        }

        fetch(TERMS_CHECK_URL, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (!response.ok) throw new Error("약관 여부 확인 실패");
                return response.json();
            })
            .then(data => {
                // data.accepted가 true라면 이미 약관 동의한 유저
                if (data.accepted) {
                    navigate('/main', { replace: true });
                } else {
                    // 약관 미동의 유저라면 약관 동의 페이지로
                    navigate('/login/term', { replace: true });
                }
            })
            .catch(error => {
                console.error("약관 동의 여부 확인 중 오류:", error);
                // 오류 시 일단 로그인 페이지로
                navigate('/login', { replace: true });
            });
    }, [navigate]);

    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '20px'
    };

    return (
        <div style={style}>
            결정 중...
        </div>
    );
};

export default Decision;