import React, { useState } from 'react';
import '../assets/css/phone.css';

export default function IdentityVerification({ onBack, onNext }) {
  const [phone, setPhone] = useState('');
  const [showDone, setShowDone] = useState(false);

  const isValid = phone.trim().length > 0;

  const handleNext = () => {
    onNext(phone);
    setShowDone(true);
    setTimeout(() => setShowDone(false), 2000);
  };

  return (
    <div className="identity-container">
      {/* 헤더: 진행바 */}
      <header className="header">
        <div className="progress-bar">
          <div className="progress" />
        </div>
      </header>

      {/* 안내 문구 */}
      <h1 className="step-title">
        연락 가능한 휴대폰 번호를<br />
        입력해주세요
      </h1>

      {/* 휴대폰 입력 폼 */}
      <div className="form-group">
        <label className="form-label" htmlFor="phone-input">
          휴대폰 번호
        </label>
        <div className="input-box">
          <input
            id="phone-input"
            type="tel"
            className="phone-input"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="휴대폰 번호 입력"
            autoComplete="tel"
          />
        </div>
      </div>

      {/* 폼 바로 아래 안내 메시지 */}
      <div data-layer="여기에 메시지 입력" className="contact-info">
        해당 연락처는 보관 신청 시 수거를 위한 용도로만 사용되며, 다른 목적으로는 절대 이용되지 않습니다.
      </div>

      {/* 다음 버튼 */}
      <button
        type="button"
        className="next-btn"
        onClick={handleNext}
        disabled={!isValid}
      >
        다음
      </button>

      {/* Done 팝업 */}
      {showDone && <div className="done-popup">Done</div>}
    </div>
  );
}
