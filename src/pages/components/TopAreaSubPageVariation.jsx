// src/components/TopAreaSubPageVariation.jsx
import React from "react";

export default function TopAreaSubPageVariation({ onBack, backIcon, title }) {
  return (
    <header className="top-area-sub-page" role="banner">
      {/* 뒤로가기 버튼 (왼쪽) */}
      <button type="button" className="icon-arrow-left" onClick={onBack} aria-label="이전">
        <img src={backIcon} alt="" className="icon-img" />
      </button>

      {/* 제목 텍스트 (중앙 정렬) */}
      <div className="title-center">{title}</div>
    </header>
  );
}