import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userLocSel.css';


export default function UserLocationSelect() {
  return (
    <div className="location-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-bg" />
        <div className="progress-fill" style={{ width: '120px' }} />
      </div>

      {/* Page Title */}
      <div className="location-title">
        보관을 원하는 지역을<br />선택해주세요
      </div>

      {/* Region Option */}
      <div className="region-card">
        <div className="region-img">
          <img src="https://placehold.co/70x28" alt="휘닉스파크 로고" />
        </div>
        <div className="region-label">평창 휘닉스파크</div>
      </div>

      {/* CTA Button */}
      <div className="location-cta">다음</div>
    </div>
  );
}