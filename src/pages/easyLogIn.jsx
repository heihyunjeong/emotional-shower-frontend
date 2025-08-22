import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase imports
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../firebase'; // Firebase 앱 인스턴스

// CSS
import "../assets/css/all.css";
import "../assets/css/user/usermain.css";
import "../assets/css/easylogin.css";

function EasyLogin() {
  const auth = getAuth(app); // Firebase Auth 인스턴스
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  const goHome = (e) => {
    e?.preventDefault();
    navigate("/home");
  };

  const goTerms = () => navigate("/terms");
  const goFind = () => navigate("/find/id");

  // Google 로그인 처리
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      console.error("Google login failed:", error);
      alert("구글 로그인에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 임시 소셜 로그인 (심사용)
  const handleSocialLogin = (provider) => {
    console.log(`${provider} 로그인 시도 (심사용 임시 구현)`);
    navigate("/home");
  };

  return (
    <div className="u-mobile-root eL-screen" role="region" aria-label="Easy Login">
      <div className="u-mobile-page eL-container">
        <header className="eL-header">
          <div className="eL-logo-wrap">
            <span className="eL-logo-text">BORINI</span>
          </div>
        </header>

        {/* 이메일 로그인 폼 */}
        <form className="eL-form" onSubmit={goHome}>
          <div className="eL-inputs">
            <label className="eL-field">
              <span className="eL-label">메일 주소</span>
              <input
                type="email"
                className="eL-input"
                placeholder="메일주소 입력"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span aria-hidden="true" className="eL-input-icon eL-icon-mail" />
            </label>

            <label className="eL-field">
              <span className="eL-label">비밀번호</span>
              <input
                type={showPw ? "text" : "password"}
                className="eL-input"
                placeholder="비밀번호 입력"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                required
              />
              <button
                type="button"
                className="eL-input-icon eL-icon-eye"
                aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
                onClick={() => setShowPw((v) => !v)}
              />
            </label>
          </div>

          <button type="submit" className="eL-login-btn">로그인</button>

          <div className="eL-links">
            <button type="button" className="eL-text-btn" onClick={goFind}>아이디 · 비밀번호 찾기</button>
            <span className="eL-sep" aria-hidden="true" />
            <button type="button" className="eL-text-btn" onClick={goTerms}>회원가입</button>
          </div>
        </form>

        {/* 구분선 및 간편로그인 */}
        <div className="eL-divider">
          <span className="eL-divider-line" />
          <span className="eL-divider-text">간편로그인</span>
          <span className="eL-divider-line" />
        </div>

        {/* 소셜 로그인 버튼 */}
        <div className="eL-socials" role="group" aria-label="간편로그인">
          <button
            className="eL-social eL-kakao"
            aria-label="카카오로 로그인"
            onClick={() => handleSocialLogin('kakao')}
          >
            K
          </button>
          <button
            className="eL-social eL-naver"
            aria-label="네이버로 로그인"
            onClick={() => handleSocialLogin('naver')}
          >
            N
          </button>
          <button
            className="eL-social eL-google"
            aria-label="구글로 로그인"
            onClick={handleGoogleLogin}
          >
            G
          </button>
          <button
            className="eL-social eL-apple"
            aria-label="애플로 로그인"
            onClick={() => handleSocialLogin('apple')}
          >
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default EasyLogin;