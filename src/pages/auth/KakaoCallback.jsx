import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { kakaoAuth, saveUserSession } from '../../utils/kakaoAuth';

function KakaoCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing'); // processing, success, error
  const [message, setMessage] = useState('카카오 로그인을 처리하고 있습니다...');

  useEffect(() => {
    const handleKakaoCallback = async () => {
      try {
        // URL에서 인가 코드와 상태값 추출
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        // 에러가 있는 경우
        if (error) {
          console.error('카카오 로그인 에러:', error, errorDescription);
          setStatus('error');
          setMessage(
            error === 'access_denied' 
              ? '카카오 로그인이 취소되었습니다.' 
              : `로그인 중 오류가 발생했습니다: ${errorDescription || error}`
          );
          
          // 3초 후 로그인 페이지로 이동
          setTimeout(() => {
            navigate('/login');
          }, 3000);
          return;
        }

        // 인가 코드가 없는 경우
        if (!code) {
          setStatus('error');
          setMessage('인가 코드를 받지 못했습니다.');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
          return;
        }

        // CSRF 방지를 위한 상태값 검증
        const savedState = sessionStorage.getItem('kakao_state');
        if (state && savedState && state !== savedState) {
          console.error('상태값 불일치:', { received: state, saved: savedState });
          setStatus('error');
          setMessage('보안 검증에 실패했습니다.');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
          return;
        }

        setMessage('토큰을 요청하고 있습니다...');

        // 1. 인가 코드로 액세스 토큰 요청
        const tokenData = await kakaoAuth.getAccessToken(code);
        
        if (!tokenData.access_token) {
          throw new Error('액세스 토큰을 받지 못했습니다.');
        }

        setMessage('사용자 정보를 가져오고 있습니다...');

        // 2. 액세스 토큰으로 사용자 정보 조회
        const userInfo = await kakaoAuth.getUserInfo(tokenData.access_token);

        // 3. 사용자 정보와 토큰 정보를 로컬 스토리지에 저장
        saveUserSession(userInfo, tokenData);

        // 4. 상태값 정리
        sessionStorage.removeItem('kakao_state');

        setStatus('success');
        setMessage('로그인이 완료되었습니다. 홈으로 이동합니다...');

        // 성공 시 홈으로 이동
        setTimeout(() => {
          navigate('/home');
        }, 1500);

      } catch (error) {
        console.error('카카오 로그인 콜백 처리 오류:', error);
        setStatus('error');
        setMessage('로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
        
        // 3초 후 로그인 페이지로 이동
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    handleKakaoCallback();
  }, [searchParams, navigate]);

  return (
    <div className="u-mobile-root" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        {/* 로딩 스피너 */}
        {status === 'processing' && (
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #FEE500',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
        )}

        {/* 성공 아이콘 */}
        {status === 'success' && (
          <div style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#4CAF50',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: 'white',
            fontSize: '24px'
          }}>
            ✓
          </div>
        )}

        {/* 에러 아이콘 */}
        {status === 'error' && (
          <div style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#f44336',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: 'white',
            fontSize: '24px'
          }}>
            ✕
          </div>
        )}

        <h2 style={{
          margin: '0 0 16px',
          color: status === 'error' ? '#f44336' : '#333',
          fontSize: '20px',
          fontWeight: '600'
        }}>
          {status === 'processing' && '로그인 처리 중'}
          {status === 'success' && '로그인 성공'}
          {status === 'error' && '로그인 실패'}
        </h2>

        <p style={{
          margin: '0',
          color: '#666',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          {message}
        </p>

        {status === 'error' && (
          <button
            onClick={() => navigate('/login')}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              backgroundColor: '#FEE500',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              color: '#000'
            }}
          >
            로그인 페이지로 돌아가기
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default KakaoCallback;
