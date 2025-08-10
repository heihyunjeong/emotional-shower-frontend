import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userTerms.css';

const termsData = [
  { id: 'age', label: '[필수] 만 14세 이상입니다', required: true },
  { id: 'service', label: '[필수] 서비스 이용 약관 동의', required: true },
  { id: 'privacy', label: '[필수] 개인정보 수집 및 이용 동의', required: true },
  { id: 'marketing', label: '[선택] 마케팅 정보 수신 동의', required: false },
];

export default function TermsAgreement() {
  // { age: true, service: false, ... }
  const [checked, setChecked] = useState({});

  const allChecked = termsData.every(t => checked[t.id]);
  const allRequiredChecked = termsData
    .filter(t => t.required)
    .every(t => checked[t.id]);

  const toggleOne = id => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = () => {
    const newState = {};
    termsData.forEach(t => {
      newState[t.id] = !allChecked;
    });
    setChecked(newState);
  };

  return (
    <div className="terms-container">
      <header className="terms-header">
        <button className="back-btn">←</button>
        <div className="progress-bar">
          <div className="progress" />
        </div>
      </header>

      <h1 className="terms-title">이용 약관에 동의해주세요</h1>

      <div className="term-list">
        {/* 전체 동의 */}
        <div className="term-item" onClick={toggleAll}>
          <span className={`checkbox ${allChecked ? 'checked' : ''}`}>
            {allChecked && '✔︎'}
          </span>
          <span className="term-label">약관 전체동의</span>
        </div>

        {/* 개별 동의 항목 */}
        {termsData.map(term => (
          <div
            key={term.id}
            className="term-item"
            onClick={() => toggleOne(term.id)}
          >
            <span
              className={`checkbox ${checked[term.id] ? 'checked' : ''}`}
            >
              {checked[term.id] && '✔︎'}
            </span>
            <span className="term-label">{term.label}</span>
            <span className="arrow">›</span>
          </div>
        ))}
      </div>

      <button
        className="next-btn"
        disabled={!allRequiredChecked}
      >
        다음
      </button>
    </div>
  );
}
