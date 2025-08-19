import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* 전역 → 페이지 순으로 import (우선순위 중요) */
import "../assets/css/all.css";
import "../assets/css/user/usermain.css";
import "../assets/css/email.css";

export default function Email() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const pageRef = useRef(null);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleNext = () => {
    if (!isValid) return;
    // 다음 스텝(비밀번호)로 이동. 필요 시 경로만 바꿔줘.
    navigate("/password");
  };

  // 모바일 키보드 대응: 하단 버튼 바가 가려지지 않도록 offset 계산
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
          <div ref={pageRef} className="e-scope" role="region" aria-label="Email">
            {/* 헤더 + 진행바 */}
            <header className="e-header">
              <button
                className="e-back"
                onClick={() => navigate(-1)}
                aria-label="뒤로가기"
                type="button"
              >
                ‹
              </button>

              <div className="e-progress" aria-hidden="true">
                <span className="e-progress-bg" />
                {/* 예: 5단계 중 2단계라면 40% */}
                <span className="e-progress-bar" style={{ width: "40%" }} />
              </div>
            </header>

            {/* 타이틀 */}
            <h1 className="e-title">
              본인 확인을 위해
              <br />
              이메일 주소를 입력해주세요
            </h1>

            {/* 입력 폼 */}
            <div className="e-form">
              <label className="e-label" htmlFor="email-input">이메일</label>
              <div className="e-inputbox">
                <input
                  id="email-input"
                  type="email"
                  className="e-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="borini@outlook.com"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
            </div>

            {/* 하단 고정 CTA (키보드 대응 + safe-area) */}
            <div
              className="e-button-bar e-safe-bottom"
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + var(--kb-offset, 0px))" }}
            >
              <button
                type="button"
                className={`e-button ${isValid ? "is-active" : "is-disabled"}`}
                onClick={handleNext}
                disabled={!isValid}
                aria-disabled={!isValid}
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
