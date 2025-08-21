// src/pages/user/UserEquipmentSelect.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/user/userEquipSel.css";

export default function UserEquipmentSelect() {
  const [selected, setSelected] = useState(null); // null | 'snowboard' | 'ski'
  const navigate = useNavigate();

  const handleSelect = (type) => setSelected(type);
  const handleNext = () => {
    if (!selected) return;
    navigate("/storing/locationselection");
  };

  const goHome = () => navigate("/home");

  return (
    <div className="storage-container">
      {/* Top area (back + close) */}
      <header className="top-area-sub-page" role="banner">
        <button
          type="button"
          className="icon-arrow-left"
          onClick={goHome}
          aria-label="홈으로"
        >
          {/* Inline SVG so no asset import is needed */}
          <svg className="vector" viewBox="0 0 12 21" aria-hidden="true">
            <path
              d="M10 2L2 10l8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          className="icon-close"
          aria-label="닫기"
          onClick={goHome}
        >
          ×
        </button>
      </header>

      {/* Progress Bar */}
      <div className="progress-bar" aria-hidden="true">
        <div className="progress-bg" />
        <div className="progress-fill" />
      </div>

      {/* Page Title */}
      <h1 className="section-title">
        어떤 장비를 <br />
        보관하고 싶으세요?
      </h1>

      {/* Equipment Selection */}
      <div className="equipment-options" role="group" aria-label="장비 선택">
        <button
          type="button"
          className={`equipment-card ${
            selected === "snowboard" ? "selected" : ""
          }`}
          onClick={() => handleSelect("snowboard")}
          aria-pressed={selected === "snowboard"}
        >
          <div className="equipment-img">
            <img src="https://placehold.co/60x60" alt="스노보드" />
          </div>
          <div className="equipment-text">
            <div className="equipment-title">스노보드</div>
            <div className="equipment-sub">프리스타일 · 해머 등</div>
          </div>
        </button>

        <button
          type="button"
          className={`equipment-card ${selected === "ski" ? "selected" : ""}`}
          onClick={() => handleSelect("ski")}
          aria-pressed={selected === "ski"}
        >
          <div className="equipment-img">
            <img src="https://placehold.co/60x60" alt="스키" />
          </div>
          <div className="equipment-text">
            <div className="equipment-title">스키</div>
            <div className="equipment-sub">프리스타일 등</div>
          </div>
        </button>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        className={`cta-button ${selected ? "active" : ""}`}
        onClick={handleNext}
        disabled={!selected}
        aria-disabled={!selected}
      >
        다음
      </button>

      {/* (기존) Navigation Bar - 그대로 유지 */}
    </div>
  );
}
