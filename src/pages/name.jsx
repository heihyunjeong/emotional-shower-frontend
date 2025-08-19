import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* 전역 → 페이지 순으로 import (우선순위 중요) */
import "../assets/css/all.css";
import "../assets/css/user/usermain.css";
import "../assets/css/name.css";

export default function Name() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const pageRef = useRef(null);

  const isValid = name.trim().length > 0;

  const handleNext = () => {
    if (!isValid) return;
    navigate("/email");
  };

  // 모바일 키보드 대응: 버튼바가 가려지지 않도록 safe-area + visualViewport
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
    <div className="app-container">{/* 공통 컨테이너 (usermain.css) */}
      <div className="u-mobile-root">
        <div className="u-mobile-page">
          {/* Page scope (충돌 방지 전용 네임스페이스) */}
          <div className="n-scope" data-page="name">
            <div ref={pageRef} className="n-page" role="region" aria-label="Name Verification">
              {/* 헤더 & 진행바 */}
              <header className="n-header">
                <button className="n-back" onClick={() => navigate(-1)} aria-label="뒤로가기">‹</button>
                <div className="n-progress">
                  <span className="n-progress-bg" />
                  {/* 예: 회원가입 4단계 중 1단계라면 25% 같은 식으로 조정 */}
                  <span className="n-progress-bar" style={{ width: "33%" }} />
                </div>
              </header>

              {/* 타이틀 */}
              <h1 className="n-title">
                본인 확인을 위해
                <br />
                실명을 입력해주세요
              </h1>

              {/* 입력 폼 */}
              <div className="n-form">
                <label className="n-label" htmlFor="name-input">이름</label>
                <div className="n-inputbox">
                  <input
                    id="name-input"
                    type="text"
                    className="n-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="김보린"
                    autoComplete="name"
                    inputMode="text"
                  />
                </div>
              </div>

              {/* 하단 고정 CTA (키보드/세이프에어리어 대응) */}
              <div className="n-button-bar n-safe-bottom">
                <button
                  type="button"
                  className={`n-button ${!isValid ? "is-disabled" : "is-active"}`}
                  onClick={handleNext}
                  disabled={!isValid}
                  aria-disabled={!isValid}
                >
                  다음
                </button>
              </div>
            </div>
          </div>
          {/* /n-scope */}
        </div>
      </div>
    </div>
  );
}
