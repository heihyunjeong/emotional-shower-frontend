import React from "react";

export default function TopAreaSubPage({ onBack, onClose, backIcon, closeIcon }) {
  return (
    <header className="top-area-sub-page" role="banner">
      <button type="button" className="icon-arrow-left" onClick={onBack} aria-label="이전">
        <img src={backIcon} alt="" className="icon-img" />
      </button>
      <button type="button" className="icon-close" onClick={onClose} aria-label="닫기">
        <img src={closeIcon} alt="" className="icon-img" />
      </button>
    </header>
  );
}
