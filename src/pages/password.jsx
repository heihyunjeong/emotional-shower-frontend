import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* 전역 → 공통 → 페이지 순서 (우선순위) */
import "../assets/css/all.css";
import "../assets/css/user/usermain.css";
import "../assets/css/phone.css";   // p- 접두사
import "../assets/css/popup.css";   // pbs- 접두사 (바텀시트)

export default function Phone() {
  const [phone, setPhone] = useState("");
  const [showSheet, setShowSheet] = useState(false);
  const navigate = useNavigate();
  const pageRef = useRef(null);

  // (선택) 이름 노출: Name 단계에서 sessionStorage.setItem("join_name", name) 해두면 반영됨
  const userName =
    (typeof window !== "undefined" && sessionStorage.getItem("join_name")) || "고객";

  const onlyDigits = (v) => v.replace(/\D/g, "");
  const digits = onlyDigits(phone);
  const isValid = digits.length >= 10 && digits.length <= 11;

  const handleNext = () => {
    if (!isValid) return;
    setShowSheet(true);
  };
  const handleCloseSheet = () => {
    setShowSheet(false);
    navigate("/easylogin");
  };

  // 모바일 키보드 대응: 하단 버튼바가 가려지지 않도록 visualViewport로 --kb-offset 업데이트
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

  // 팝업 열릴 때 바디 스크롤 잠금
  useEffect(() => {
    if (!showSheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [showSheet]);

  return (
    <div className="app-container">{/* 공통 컨테이너 */} 
      <div className="u-mobile-root">
        <div className="u-mobile-page">
          <div className="p-scope" data-page="phone">
            <div ref={pageRef} className="p-page" role="region" aria-label="Phone Verification">
              {/* 헤더 & 진행바 */}
              <header className="p-header">
                <button className="p-back" onClick={() => navigate(-1)} aria-label="뒤로가기">‹</button>
                <div className="p-progress">
                  <span className="p-progress-bg" />
                  {/* 예: 전체 5단계 중 4단계 => 80% */}
                  <span className="p-progress-bar" style={{ width: "80%" }} />
                </div>
              </header>

              {/* 타이틀 */}
              <h1 className="p-title">
                연락 가능한 휴대폰 번호를
                <br />
                입력해주세요
              </h1>

              {/* 입력 폼 */}
              <div className="p-form">
                <label className="p-label" htmlFor="phone-input">휴대폰 번호</label>
                <div className="p-inputbox">
                  <input
                    id="phone-input"
                    type="tel"
                    inputMode="numeric"
                    className="p-input"
                    value={phone}
                    onChange={(e) => setPhone(onlyDigits(e.target.value))}
                    placeholder="01012345678"
                    autoComplete="tel"
                  />
                </div>
                <p className="p-desc">
                  해당 연락처는 보관 신청 시 수거를 위한 용도로만 사용되며, 다른 목적으로는 절대 이용되지 않습니다.
                </p>
              </div>

              {/* 하단 고정 CTA (키보드 대응) */}
              <div className="p-button-bar u-safe-bottom">
                <button
                  type="button"
                  className={`p-button ${!isValid ? "is-disabled" : "is-active"}`}
                  onClick={handleNext}
                  disabled={!isValid}
                  aria-disabled={!isValid}
                >
                  확인
                </button>
              </div>

              {/* 바텀시트 팝업 */}
              {showSheet && (
                <div className="pbs-root" role="dialog" aria-modal="true" aria-labelledby="pbs-title">
                  <div className="pbs-overlay" onClick={handleCloseSheet} />
                  <div className="pbs-sheet pbs-enter">
                    <div className="pbs-handle" />
                    <div className="pbs-image">
                      <div className="pbs-image-placeholder">IMG<br/>128×128</div>
                    </div>
                    <h2 id="pbs-title" className="pbs-title">환영합니다, {userName}님!</h2>
                    <p className="pbs-subtitle">편하게 맡기고, 가볍게 즐겨보세요.</p>
                    <div className="pbs-cta-wrap u-safe-bottom">
                      <button className="pbs-cta" onClick={handleCloseSheet}>좋아요!</button>
                    </div>
                  </div>
                </div>
              )}
            </div>{/* p-page */}
          </div>{/* p-scope */}
        </div>{/* u-mobile-page */}
      </div>{/* u-mobile-root */}
    </div>
  );
}
