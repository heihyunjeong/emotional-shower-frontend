import React from 'react';
import '../assets/css/popup.css';

export default function BottomSheetPopup() {
  return (
    <div className="bottom-sheets">
      <div className="bottom-sheets__background" />

      <div className="bottom-sheets__content">
        <div className="bottom-sheets__title">
          환영합니다, 김보린님!
        </div>
        <div className="bottom-sheets__subtitle">
          편하게 맡기고, 가볍게 즐겨보세요.
        </div>
      </div>

      <div className="bottom-sheets__cta-wrapper">
        <button className="bottom-sheets__cta">
          좋아요!
        </button>
      </div>

      <div className="bottom-sheets__image-container">
        <div className="bottom-sheets__image-placeholder">
          IMG영역<br/>128*128
        </div>
      </div>
    </div>
  );
}
