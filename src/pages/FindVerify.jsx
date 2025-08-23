// src/pages/FindVerify.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* global CSS you already have */
import "../assets/css/all.css";
import "../assets/css/user/usermain.css";

/* page-scoped CSS */
import "../assets/css/FindVerify.css";
import "../assets/css/components/uiCommon.css";
import "../assets/css/components/topAreaHeader.css";

/* shared UI */
import TopAreaSubPageVariation from "./components/TopAreaSubPageVariation";
import ProgressBar from "./components/ProgressBar";
import PageTitle from "./components/PageTitle";
import PrimaryButton from "./components/PrimaryButton";

/* icon */
import backBut from "../assets/img/backBut.png";

const NEXT_PATH = "/find/result";

export default function FindVerify() {
  const navigate = useNavigate();
  const pageRef = useRef(null);

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(118); // 1:58

  // validity
  const digits = useMemo(() => phone.replace(/\D/g, ""), [phone]);
  const phoneValid = digits.length >= 10 && digits.length <= 11;
  const codeValid = /^\d{6}$/.test(code);
  const canNext = phoneValid && codeValid;

  // hint
  const message = useMemo(() => {
    if (!code) return "여기에 메시지 입력";
    return codeValid ? "인증번호가 일치합니다" : "인증번호가 일치하지 않습니다";
  }, [code, codeValid]);
  const messageClass = !code ? "" : codeValid ? "ok" : "error";

  // timer
  useEffect(() => {
    if (!codeSent || secondsLeft <= 0) return;
    const t = setInterval(
      () => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)),
      1000
    );
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

  const handleNext = () => {
    if (!canNext) return;
    navigate(NEXT_PATH);
  };

  // keyboard-safe bottom inset (no fake status/home bars)
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
    <div className="fv-app" ref={pageRef}>
      <div className="fv-page">
        {/* Header */}
        <TopAreaSubPageVariation
          onBack={() => navigate(-1)}
          backIcon={backBut}
          title="아이디 · 비밀번호 찾기"
        />

        {/* Tabs (active: 아이디 찾기) */}
        <div className="fv-tabs">
          <div className="fv-tab active">
            <span className="txt">아이디 찾기</span>
            <span className="bar" />
          </div>
          <div className="fv-tab">
            <span className="txt dim">비밀번호 찾기</span>
          </div>
        </div>

        {/* Title */}
        <PageTitle>본인 인증하기</PageTitle>

        {/* Form */}
        <form className="fv-form" onSubmit={(e) => e.preventDefault()}>
          {/* 휴대폰 번호 */}
          <label htmlFor="fv-phone" className="fv-label">
            휴대폰 번호
          </label>
          <div className={`fv-input ${phoneValid ? "ok" : ""}`}>
            <input
              id="fv-phone"
              type="tel"
              inputMode="numeric"
              placeholder="휴대폰 번호를 입력해주세요"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {!!phone && (
              <button
                type="button"
                className="fv-clear"
                aria-label="지우기"
                onClick={() => setPhone("")}
              >
                ⨯
              </button>
            )}
          </div>

          {/* 인증 번호 + 타이머 */}
          <label htmlFor="fv-code" className="fv-label">
            인증 번호
          </label>
          <div className="fv-input code">
            <input
              id="fv-code"
              type="tel"
              inputMode="numeric"
              maxLength={6}
              placeholder="인증번호 6자리를 입력해주세요"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            />
            <span className="fv-timer">{mmss}</span>
          </div>


          {/* 힌트 + 재발송 */}
          <div className="fv-hint-row">
            <span className={`fv-hint ${messageClass}`}>{message}</span>
            <button
              type="button"
              className="fv-resend"
              disabled={secondsLeft > 0}
              onClick={handleResend}
            >
              인증번호 재발송
            </button>
          </div>
        </form>

        {/* Bottom CTA */}
        <div
          className="fv-cta"
          style={{
            paddingBottom:
              "calc(16px + env(safe-area-inset-bottom) + var(--kb-offset, 0px))",
          }}
        >
          <PrimaryButton onClick={handleNext} disabled={!canNext} active={canNext}>
            다음
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
