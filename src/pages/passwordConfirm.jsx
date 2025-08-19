// src/pages/PasswordConfirm.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* 전역 → 페이지 순으로 (우선순위 중요) */
import "../assets/css/all.css";
import "../assets/css/user/usermain.css";
import "../assets/css/passwordConfirm.css";

export default function PasswordConfirm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const pageRef = useRef(null);

  // 이전 단계에서 전달된 비밀번호(state) 또는 sessionStorage에서 읽기
  const originalPw =
    (state && state.password) ||
    sessionStorage.getItem("join_password") ||
    "";

  const [confirmPw, setConfirmPw] = useState("");

  const meetsRule = (pw) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,16}$/.test(pw.trim());

  const isMatch = confirmPw.length > 0 && confirmPw === originalPw;
  const isValid = isMatch && meetsRule(originalPw);

  const handleNext = () => {
    if (!isValid) return;
    navigate("/phone");
  };

  // 모바일 키보드 대응: 버튼바가 가려지지 않도록 visualViewport 사용
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv || !pageRef.current) return;

    const updateKbOffset = () => {
      const hidden = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop));
      pageRef.current.style.setProperty("--kb-offset", `${Math.round(hidden)}px`);
    };

    vv.addEventListener("resize", updateKbOffset);
    vv.addEventListener("scroll", updateKbOffset);
    updateKbOffset();

    return () => {
      vv.removeEventListener("resize", updateKbOffset);
      vv.removeEventListener("scroll", updateKbOffset);
      pageRef.current?.style.removeProperty("--kb-offset");
    };
  }, []);

  return (
    <div className="app-container">
      <div className="u-mobile-root">
        <div className="u-mobile-page">
          <div className="pc-scope" data-page="password-confirm">
            <div ref={pageRef} className="pc-page" role="region" aria-label="Password Confirm">
              {/* 헤더 & 진행바 */}
              <header className="pc-header">
                <button className="pc-back" onClick={() => navigate(-1)} aria-label="뒤로가기">‹</button>
                <div className="pc-progress">
                  <span className="pc-progress-bg" />
                  {/* 예: 4단계 중 3단계라면 75% */}
                  <span className="pc-progress-bar" style={{ width: "75%" }} />
                </div>
              </header>

              {/* 타이틀 */}
              <h1 className="pc-title">
                동일한 비밀번호를
                <br />
                다시 입력해주세요
              </h1>

              {/* 입력 폼 */}
              <div className="pc-form">
                <label className="pc-label" htmlFor="pc-input">비밀번호 확인</label>
                <div className="pc-inputbox">
                  <input
                    id="pc-input"
                    type="password"
                    className="pc-input"
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    placeholder="********"
                    autoComplete="new-password"
                    inputMode="text"
                  />
                </div>

                {/* ✅ 일치/불일치 안내 문구 */}
                {confirmPw.length > 0 && (
                  <p className={`pc-hint ${isMatch ? "ok" : "error"}`}>
                    {isMatch ? "비밀번호가 일치해요" : "비밀번호가 일치하지 않아요"}
                  </p>
                )}
              </div>

              {/* 하단 고정 CTA (키보드/세이프에어리어 대응) */}
              <div className="pc-button-bar pc-safe-bottom">
                <button
                  type="button"
                  className={`pc-button ${!isValid ? "is-disabled" : "is-active"}`}
                  onClick={handleNext}
                  disabled={!isValid}
                  aria-disabled={!isValid}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
          {/* /pc-scope */}
        </div>
      </div>
    </div>
  );
}
