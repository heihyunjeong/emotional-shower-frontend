import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userEquipSel.css';

export default function UserEquipmentSelect() {
  const [selected, setSelected] = useState(null); // null, 'snowboard', 'ski'

  const handleSelect = (type) => {
    setSelected(type);
  };

  return (
    <div className="storage-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-bg" />
        <div className="progress-fill" />
      </div>

      {/* Page Title */}
      <div className="section-title">어떤 장비를 <br />보관하고 싶으세요?</div>

      {/* Equipment Selection */}
      <div className="equipment-options">
        <div
          className={`equipment-card ${selected === 'snowboard' ? 'selected' : ''}`}
          onClick={() => handleSelect('snowboard')}
        >
          <div className="equipment-img">
            <img src="https://placehold.co/60x60" alt="스노보드" />
          </div>
          <div className="equipment-text">
            <div className="equipment-title">스노보드</div>
            <div className="equipment-sub">보드종류 나열</div>
          </div>
        </div>

        <div
          className={`equipment-card ${selected === 'ski' ? 'selected' : ''}`}
          onClick={() => handleSelect('ski')}
        >
          <div className="equipment-img">
            <img src="https://placehold.co/60x60" alt="스키" />
          </div>
          <div className="equipment-text">
            <div className="equipment-title">스키</div>
            <div className="equipment-sub">스키종류 나열</div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className={`cta-button ${selected ? 'active' : ''}`}>다음</div>

      {/* Navigation Bar */}
      <div className="navigation-bar">
        <div className="nav-wrap">
          <div className="nav-item">
            <div className="nav-icon home-icon" />
            <div className="nav-label">홈</div>
          </div>
          <div className="nav-item">
            <div className="nav-icon gear-icon" />
            <div className="nav-label">내 장비</div>
          </div>
          <div className="nav-item active">
            <div className="nav-icon mypage-icon" />
            <div className="nav-label active-label">마이페이지</div>
          </div>
        </div>
      </div>
    </div>
  );
}
