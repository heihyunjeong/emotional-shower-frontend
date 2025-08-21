import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* Global → Page CSS */
import "../assets/css/all.css";
import "../assets/css/user/usermain.css";
import "../assets/css/passwordConfirm.css";

/* Shared UI */
import TopAreaSubPage from "./components/TopAreaSubPage";
import ProgressBar from "./components/ProgressBar";
import PageTitle from "./components/PageTitle";
import PrimaryButton from "./components/PrimaryButton";

/* Icons */
import backBut from "../assets/img/backBut.png";
import xBut from "../assets/img/xBut.png";

export default function PasswordConfirm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const pageRef = useRef(null);

  // 이전 단계에서 받은 비밀번호 (없으면 sessionStorage)
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
          {/* 진행바 (예: 75%) */}
          <ProgressBar width="80%" />
          {/* 타이틀 */}
          <PageTitle>
            동일한 비밀번호를
            <br />
            다시 입력해주세요
          </PageTitle>

          {/* 본문: PageTitle 아래로 */}
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

            {confirmPw.length > 0 && (
              <p className={`pc-hint ${isMatch ? "ok" : "error"}`}>
                {isMatch ? "비밀번호가 일치해요" : "비밀번호가 일치하지 않아요"}
              </p>
            )}
          </div>

          {/* 하단 고정 CTA */}
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
              다음
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
