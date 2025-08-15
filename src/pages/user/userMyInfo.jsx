import React, { useEffect, useMemo, useState } from "react";
import "../../assets/css/user/userMyInfo.css";

export default function UserMyInfo() {
  // overlays
  const [showPhoneSheet, setShowPhoneSheet] = useState(false);
  const [showOtpSheet, setShowOtpSheet] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  // phone input
  const [phone, setPhone] = useState("");
  const phoneDigits = useMemo(() => phone.replace(/\D/g, ""), [phone]);
  const phoneValid = useMemo(
    () => /^010\d{8}$/.test(phoneDigits),
    [phoneDigits]
  );

  // otp input + timer
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120); // seconds

  // lock body scroll when any overlay is open
  const anyOpen = showPhoneSheet || showOtpSheet || logoutOpen;
  useEffect(() => {
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [anyOpen]);

  // start/reset timer whenever OTP sheet opens
  useEffect(() => {
    if (!showOtpSheet) return;
    setTimer(120);
    const id = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [showOtpSheet]);

  const mmss = useMemo(() => {
    const m = String(Math.floor(timer / 60));
    const s = String(timer % 60).padStart(2, "0");
    return `${m}:${s}`;
  }, [timer]);

  // phone auto-format: 010-1234-5678
  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (digits.startsWith("010")) {
      const p1 = digits.slice(0, 3);
      const p2 = digits.slice(3, 7);
      const p3 = digits.slice(7, 11);
      const next =
        digits.length <= 3
          ? p1
          : digits.length <= 7
          ? `${p1}-${p2}`
          : `${p1}-${p2}-${p3}`;
      setPhone(next);
    } else {
      // fallback formatting for non-010 prefixes
      const p1 = digits.slice(0, 3);
      const p2 = digits.slice(3, 7);
      const p3 = digits.slice(7, 11);
      const next =
        digits.length <= 3
          ? p1
          : digits.length <= 7
          ? `${p1}-${p2}`
          : `${p1}-${p2}-${p3}`;
      setPhone(next);
    }
  };

  const openPhoneSheet = () => {
    setShowPhoneSheet(true);
    setShowOtpSheet(false);
  };

  const sendCode = () => {
    if (!phoneValid) return;
    // TODO: call your API to send the code
    setShowPhoneSheet(false);
    setShowOtpSheet(true); // open OTP sheet and start timer via effect
    setOtp("");
  };

  const resendCode = () => {
    // TODO: call your API to resend code
    setTimer(120);
  };

  const verifyCode = () => {
    // TODO: verify OTP with your backend
    // success flow example:
    setShowOtpSheet(false);
    alert("인증이 완료되었습니다.");
  };

  const handleConfirmLogout = () => {
    // TODO: replace with real sign-out logic
    localStorage.removeItem("token");
    setLogoutOpen(false);
    // window.location.href = "/login";
  };

  return (
    <div className="myinfo" data-layer="계정관리 / 메인">
      {/* Top bar */}
      <div className="subpage-top">
        <button
          className="back-btn"
          aria-label="뒤로가기"
          onClick={() => window.history.back()}
        />
      </div>

      {/* Title */}
      <section className="title-block">
        <h1 className="page-head">내 계정 관리하기</h1>
        <p className="page-sub">
          연락처는 필요 시 언제든지 수정 가능합니다. 이름은 보관 장비 확인을 위해
          변경이 제한됩니다.
        </p>
      </section>

      {/* Static fields (tap to open sheet) */}
      <section className="fields">
        <div className="field">
          <div className="field-label">이름</div>
          <button className="field-box" type="button" onClick={openPhoneSheet}>
            <span className="field-value dim">김보린</span>
            <i className="field-icon" aria-hidden />
          </button>
        </div>

        <div className="field">
          <div className="field-label">연락처</div>
          <button className="field-box" type="button" onClick={openPhoneSheet}>
            <span className="field-value dim">010-5678-1234</span>
            <i className="field-icon show" aria-hidden />
          </button>
        </div>
      </section>

      <div className="divider-10" />

      {/* Actions */}
      <section className="actions">
        <button
          type="button"
          className="list-row"
          onClick={() => setLogoutOpen(true)}
          aria-haspopup="dialog"
          aria-controls="logout-modal"
          aria-expanded={logoutOpen}
        >
          <span className="list-title">로그아웃</span>
        </button>

        <button type="button" className="list-row">
          <span className="list-title muted">탈퇴 / 계정 삭제</span>
          <span className="chev" aria-hidden />
        </button>
      </section>

      {/* Backdrop for sheets / modal */}
      {anyOpen && <div className="backdrop" aria-hidden onClick={() => {}} />}

      {/* Phone sheet */}
      {showPhoneSheet && (
        <div className="sheet" role="dialog" aria-modal="true">
          <div className="sheet-header">
            <div className="sheet-title">연락처 변경하기</div>
            <p className="sheet-desc">
              설명을 여기에 입력해주세요. 두줄로 들어가면 좋을 것 같습니다.
            </p>
          </div>

          <div className="sheet-body">
            <label className="input-label" htmlFor="phone">
              새 휴대폰 번호
            </label>
            <div
              className={
                "input-wrap" + (phoneValid ? " input-wrap--active" : "")
              }
            >
              <input
                id="phone"
                inputMode="tel"
                type="tel"
                placeholder="010-5678-1234"
                value={phone}
                onChange={handlePhoneChange}
                autoFocus
              />
              <i className="end-icon" aria-hidden />
            </div>

            <button
              className={"primary-btn" + (phoneValid ? " on" : "")}
              type="button"
              onClick={sendCode}
              disabled={!phoneValid}
            >
              인증번호 전송
            </button>
          </div>
        </div>
      )}

      {/* OTP sheet */}
      {showOtpSheet && (
        <div className="sheet" role="dialog" aria-modal="true">
          <div className="sheet-header">
            <div className="sheet-title">인증번호 입력</div>
            <p className="sheet-desc">
              설명을 여기에 입력해주세요. 두줄로 들어가면 좋을 것 같습니다.
            </p>
          </div>

          <div className="sheet-body">
            <label className="input-label" htmlFor="otp">
              인증번호
            </label>
            <div
              className={
                "input-wrap" + (otp.length > 0 ? " input-wrap--active" : "")
              }
            >
              <input
                id="otp"
                inputMode="numeric"
                type="tel"
                placeholder="Placeholder"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                autoFocus
              />
              <span className="otp-timer">{mmss}</span>
            </div>

            <div className="otp-row">
              <span className="hint">여기에 메시지 입력</span>
              <button
                type="button"
                className="link-btn"
                onClick={resendCode}
                disabled={timer === 0 ? false : false} // always allowed to resend; adjust if needed
              >
                인증번호 재발송
              </button>
            </div>

            <button
              className={"primary-btn" + (otp.length >= 4 ? " on" : "")}
              type="button"
              onClick={verifyCode}
              disabled={otp.length < 4 || timer === 0}
            >
              인증하기
            </button>
          </div>
        </div>
      )}

      {/* Logout confirm modal */}
      {logoutOpen && (
        <div id="logout-modal" className="modal" role="dialog" aria-modal="true">
          <p className="modal-title">계속해서 로그아웃 할까요?</p>
          <div className="modal-actions">
            <button
              className="btn outline"
              type="button"
              onClick={() => setLogoutOpen(false)}
            >
              취소
            </button>
            <button className="btn primary" type="button" onClick={handleConfirmLogout}>
              네
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
