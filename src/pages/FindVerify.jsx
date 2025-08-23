// src/pages/FindVerify.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/all.css";
import "../assets/css/user/usermain.css";
import "../assets/css/FindVerify.css";
import "../assets/css/components/uiCommon.css";

/* Shared UI */
import PrimaryButton from "./components/PrimaryButton";
/* ✅ New header */
import TopAreaSubPageVariation from "./components/TopAreaSubPageVariation";

/* (Optional) back icon asset — or pass null if you render a text arrow inside */
import backBut from "../assets/img/backBut.png";

/* Where to go after verification */
const NEXT_PATH = "/find/result";

export default function FindVerify() {
  const rootRef = useRef(null);
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(true);     // already sent (matches screenshot state)
  const [secondsLeft, setSecondsLeft] = useState(118); // 1:58

  // validity
  const digits = useMemo(() => phone.replace(/\D/g, ""), [phone]);
  const phoneValid = digits.length >= 10 && digits.length <= 11;
  const codeValid = /^\d{6}$/.test(code);
  const canNext = phoneValid && codeValid;

  // message
  const message = useMemo(() => {
    if (!code) return "여기에 메시지 입력";
    return codeValid ? "인증번호가 일치합니다" : "인증번호가 일치하지 않습니다";
  }, [code, codeValid]);
  const messageClass = !code ? "" : codeValid ? "ok" : "error";

  // timer
  useEffect(() => {
    if (!codeSent || secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [codeSent, secondsLeft]);

  const mmss = useMemo(() => {
    const m = String(Math.floor(secondsLeft / 60));
    const s = String(secondsLeft % 60).padStart(2, "0");
    return `${m}:${s}`;
  }, [secondsLeft]);

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(118);
    setCodeSent(true);
  };

  // keyboard-safe bottom inset
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv || !rootRef.current) return;
    const updateKbOffset = () => {
      const hidden = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop));
      rootRef.current.style.setProperty("--kb-offset", `${Math.round(hidden)}px`);
    };
    vv.addEventListener("resize", updateKbOffset);
    vv.addEventListener("scroll", updateKbOffset);
    updateKbOffset();
    return () => {
      vv.removeEventListener("resize", updateKbOffset);
      vv.removeEventListener("scroll", updateKbOffset);
      rootRef.current?.style.removeProperty("--kb-offset");
    };
  }, []);

  return (
    <div className="find-root" ref={rootRef}>

      {/* ✅ Top header (center title) */}
      <TopAreaSubPageVariation
        onBack={() => navigate(-1)}
        backIcon={backBut}
        title="아이디 · 비밀번호 찾기"
      />

      {/* Tabs */}
      <div className="tab-group-line">
        <div className="tab-line">
          <div className="label active">
            <div className="tab-text">아이디 찾기</div>
            <div className="tab-underline" />
          </div>
        </div>
        <div className="tab-line">
          <div className="label">
            <div className="tab-text dim">비밀번호 찾기</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="title-block">
        <div className="title">본인 인증하기</div>

        <div className="form">
          {/* 휴대폰 번호 */}
          <div className="field">
            <label className="label">휴대폰 번호</label>
            <div className={`input-field ${phoneValid ? "ok" : ""}`}>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="휴대폰 번호를 입력해주세요"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {!!phone && (
                <button className="clear-btn" onClick={() => setPhone("")} aria-label="지우기">⨯</button>
              )}
            </div>
          </div>

          {/* 인증 번호 */}
          <div className="field">
            <label className="label">인증 번호</label>
            <div className="verify-row">
              <div className={`input-field code ${codeValid ? "ok" : ""}`}>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="인증번호 6자리를 입력해주세요"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <div className="timer">{mmss}</div>
            </div>
          </div>

          <div className="hint-row">
            <div className={`hint ${messageClass}`}>{message}</div>
            <button
              className="resend-btn"
              disabled={secondsLeft > 0}
              onClick={handleResend}
              type="button"
            >
              인증번호 재발송
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fixed CTA using PrimaryButton */}
      <div
        className="cta-wrap"
        style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom) + var(--kb-offset, 0px))" }}
      >
        <PrimaryButton
          onClick={() => navigate(NEXT_PATH)}
          disabled={!canNext}
          active={canNext}
        >
          다음
        </PrimaryButton>
      </div>

      {/* (Dummy) home indicator */}
      <div className="home-indicator" />
    </div>
  );
}
