// src/pages/name.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/name.css';

export default function NameVerification() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const isValid = name.trim().length > 0;

  const handleNext = () => {
    // you could also pass state: navigate('/phone', { state: { name } });
    navigate('/phone');
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
        본인 확인을 위해<br />
        실명을 입력해주세요
      </h1>

      {/* 이름 입력 폼 */}
      <div className="form-group">
        <label className="form-label" htmlFor="name-input">
          이름
        </label>
        <div className="input-box">
          <input
            id="name-input"
            type="text"
            className="name-input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="김보린"
            autoComplete="name"
          />
        </div>
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
    </div>
  );
}
