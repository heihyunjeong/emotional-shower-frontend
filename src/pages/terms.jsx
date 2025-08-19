import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/css/all.css";
import "../assets/css/user/usermain.css";
import "../assets/css/terms.css";

const TERMS = [
  { id: "age",       label: "[필수] 만 14세 이상입니다",          required: true  },
  { id: "service",   label: "[필수] 서비스 이용 약관 동의",        required: true  },
  { id: "privacy",   label: "[필수] 개인정보 수집 및 이용 동의",    required: true  },
  { id: "marketing", label: "[선택] 마케팅 정보 수신 동의",        required: false },
];

function Terms() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});

  const allChecked = TERMS.every(t => !!checked[t.id]);
  const allRequiredChecked = TERMS.filter(t => t.required).every(t => !!checked[t.id]);

  const toggleAll = () => {
    const ns = {};
    TERMS.forEach(t => { ns[t.id] = !allChecked; });
    setChecked(ns);
  };

  const toggleOne = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="u-mobile-root t-screen" role="region" aria-label="Terms">
      <div className="u-mobile-page t-container">
        {/* Header */}
        <header className="t-header">
          <button className="t-back" onClick={() => navigate(-1)} aria-label="뒤로가기">‹</button>
          <h1 className="t-title">이용 약관에 동의해주세요</h1>
        </header>

        {/* Progress Bar */}
        <div className="t-progress" aria-hidden="true">
          <span className="t-progress-bg" />
          <span className="t-progress-bar" style={{ width: "25%" }} />
        </div>

        {/* All Agree Chip */}
        <button type="button" className="t-all" onClick={toggleAll} aria-pressed={allChecked}>
          <span className="t-all-text">약관 전체동의</span>
          <span className={`t-check t-round ${allChecked ? "t-checked" : ""}`} />
        </button>

        {/* Terms List */}
        <div className="t-list">
          {TERMS.map(term => (
            <div key={term.id} className="t-row">
              <button
                type="button"
                className="t-label t-link"
                onClick={() => { /* TODO: 약관 문서 보기(모달/라우트) */ }}
              >
                <span className={term.required ? "t-badge t-required" : "t-badge t-optional"}>
                  {term.required ? "[필수]" : "[선택]"}
                </span>
                <span className="t-label-text">
                  {term.label.replace(/\[(필수|선택)\]\s?/, "")} <span className="t-chevron">›</span>
                </span>
              </button>

              <button
                type="button"
                className={`t-check t-round ${checked[term.id] ? "t-checked" : ""}`}
                onClick={() => toggleOne(term.id)}
                aria-label={`${term.label} 동의 토글`}
                aria-pressed={!!checked[term.id]}
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="t-cta-wrap">
          <button
            className="t-cta"
            disabled={!allRequiredChecked}
            onClick={() => navigate("/name")}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default Terms;
