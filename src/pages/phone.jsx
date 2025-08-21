import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* Global → Page CSS */
import "../assets/css/all.css";
import "../assets/css/user/usermain.css";
import "../assets/css/phone.css";   // p- 접두사(본문 스타일만 사용)
import "../assets/css/popup.css";   // pbs- 접두사 (바텀시트)

/* Shared UI */
import TopAreaSubPage from "./components/TopAreaSubPage";
import ProgressBar from "./components/ProgressBar";
import PageTitle from "./components/PageTitle";
import PrimaryButton from "./components/PrimaryButton";

/* Icons */
import backBut from "../assets/img/backBut.png";
import xBut from "../assets/img/xBut.png";

export default function Phone() {
  const [phone, setPhone] = useState("");
  const [showSheet, setShowSheet] = useState(false);
  const navigate = useNavigate();
  const pageRef = useRef(null);

  // (선택) 이전 단계에서 저장된 이름 표기
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

  // 모바일 키보드 대응
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

  // 팝업 시 스크롤 잠금
  useEffect(() => {
    if (!showSheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [showSheet]);

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/easylogin");

  return (
    <div className="app-container" ref={pageRef}>
      <div className="u-mobile-root">
        <div className="u-mobile-page" style={{ position: "relative" }}>
          {/* 상단 공용 영역 */}
          <TopAreaSubPage onBack={goBack} onClose={goHome} backIcon={backBut} closeIcon={xBut} />
          {/* 진행바 (예: 80%) */}
          <ProgressBar width="100%" />
          {/* 타이틀 */}
          <PageTitle>
            연락 가능한 휴대폰 번호를
            <br />
            입력해주세요
          </PageTitle>

          {/* 본문: PageTitle 아래로 */}
          <div
            className="p-form"
            style={{
              position: "absolute",
              top: 220,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              padding: "0 20px",
              boxSizing: "border-box",
            }}
          >
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
            <p className="p-help">
              해당 연락처는 보관 신청 시 수거를 위한 용도로만 사용되며, 다른 목적으로는 절대 이용되지 않습니다.
            </p>
          </div>

          {/* 하단 고정 CTA (safe-area + kb offset) */}
          <div
            className="fixed-cta"
            style={{
              paddingBottom:
                "calc(16px + env(safe-area-inset-bottom) + var(--kb-offset, 0px))",
            }}
          >
            <PrimaryButton
              onClick={handleNext}
              disabled={!isValid}
              active={isValid}
            >
              확인
            </PrimaryButton>
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
                <p className="pbs-subtitle">이제부터 장비는 저희가 안전하게 보관해드립니다.</p>
                <div className="pbs-cta-wrap u-safe-bottom">
                  <button className="pbs-cta" onClick={handleCloseSheet}>좋아요!</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
