// src/pages/Password.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* Global → Page CSS */
import "../assets/css/all.css";
import "../assets/css/user/usermain.css";
import "../assets/css/passwordConfirm.css"; // ← confirm과 동일 스타일 재사용

/* Shared UI */
import TopAreaSubPage from "./components/TopAreaSubPage";
import ProgressBar from "./components/ProgressBar";
import PageTitle from "./components/PageTitle";
import PrimaryButton from "./components/PrimaryButton";

/* Icons */
import backBut from "../assets/img/backBut.png";
import xBut from "../assets/img/xBut.png";

export default function Password() {
  const navigate = useNavigate();
  const pageRef = useRef(null);

  const [password, setPassword] = useState("");

  // 규칙: 영문 + 숫자 포함, 8~16자
  const meetsRule = (pw) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,16}$/.test(pw.trim());

  const isValid = meetsRule(password);

  const handleNext = () => {
    if (!isValid) return;
    // 세션 스토리지 저장 + state로도 전달
    sessionStorage.setItem("join_password", password);
    navigate("/passwordconfirm", { state: { password } });
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

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/easylogin");

  return (
    <div className="app-container" ref={pageRef}>
      <div className="u-mobile-root">
        <div className="u-mobile-page" style={{ position: "relative" }}>
          {/* 상단 공용 영역 */}
          <TopAreaSubPage onBack={goBack} onClose={goHome} backIcon={backBut} closeIcon={xBut} />

          {/* 진행바 (예: 60%) */}
          <ProgressBar width="80%" />

          {/* 타이틀 */}
          <PageTitle>
            사용할 비밀번호를
            <br />
            입력해주세요
          </PageTitle>

          {/* 본문: PageTitle 아래로 (confirm과 동일한 클래스 사용) */}
          <div
            className="pc-form"
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
            <label className="pc-label" htmlFor="pw-input">비밀번호</label>
            <div className="pc-inputbox">
              <input
                id="pw-input"
                type="password"
                className="pc-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                autoComplete="new-password"
                inputMode="text"
              />
            </div>

          
              <p className="pw-hint fixed-hint">
              영문과 숫자를 포함해 8~16자로 입력해주세요
              </p>
          </div>

          {/* 하단 고정 CTA */}
          <div
            className="fixed-cta"
            style={{
              paddingBottom:
                "calc(16px + env(safe-area-inset-bottom) + var(--kb-offset, 0px))",
            }}
          >
            <PrimaryButton onClick={handleNext} disabled={!isValid} active={isValid}>
              다음
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
