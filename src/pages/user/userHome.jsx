import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userHome.css';

export default function UserHome() {
  return (
    <div className="storage-container">
      {/* Background Ellipses */}
      <div className="bg-layer">
        <div className="ellipse white-ellipse" />
        <div className="ellipse grey-ellipse" />
        <img className="achievement-img" src="https://placehold.co/360x360" alt="achievement" />
      </div>

      {/* Header Logo */}
      <div className="header-logo">
        {/* simplified as placeholder */}
        <div className="logo-placeholder">LOGO</div>
      </div>

      {/* Text and Chip Section */}
      <div className="text-chip">
        <div className="main-text">
          <div><span className="highlight">김보린님</span> 아직 <br />보관 장비가 없어요!</div>
          <div className="sub-text">소중한 장비, 전문가 손에 맡기고<br />편안한 취미라이프를 시작해볼까요?</div>
        </div>
        <div className="status-chip">
          <div className="status-label">신청 전</div>
        </div>
      </div>

      {/* 등록 카드 */}
      <div className="card-container">
        <div className="card">
          <div className="card-icon" />
          <div className="card-text">
            <div className="title">새 장비 등록</div>
            <div className="desc">1개 장비 보관중</div>
          </div>
        </div>
        <div className="card">
          <div className="card-icon" />
          <div className="card-text">
            <div className="title">장비 꺼내기</div>
            <div className="desc">스노보드, 휘닉스파크</div>
          </div>
        </div>
      </div>
    
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
