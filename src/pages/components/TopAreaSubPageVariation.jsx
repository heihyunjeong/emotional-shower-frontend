// src/components/TopAreaSubPageVariation.jsx
import React from "react";

export default function TopAreaSubPageVariation({ onBack, backIcon, title }) {
  return (
    <header className="top-area-sub-page-variation" role="banner">
      <button
        type="button"
        className="icon-arrow-left"
        onClick={onBack}
        aria-label="이전"
      >
        {backIcon ? <img src={backIcon} alt="" className="icon-img" /> : "‹"}
      </button>

      <div className="title-center">{title}</div>
    </header>
  );
}
