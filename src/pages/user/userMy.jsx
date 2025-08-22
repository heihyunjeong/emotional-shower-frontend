import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userMy.css';
import UserNav from './userNav'; // ✅ UserNav 컴포넌트 import

import packaged from "../../assets/img/packaged.png";  // ✅ 패키지 이미지
import profile from "../../assets/img/person.png";     // ✅ 프로필 이미지

export default function MyPage() {
  const navigate = useNavigate();

  // ✅ 네비게이션 클릭 시 이동 처리
  const handleNav = (key) => {
    if (key === 'mypage') return; // 현재 페이지면 이동 안 함
    if (key === 'home') navigate('/');
    if (key === 'myequipment') navigate('/equipment');
  };

  return (
    <div className="mypage-container">
      {/* Top Area */}
      <div className="top-area">
        <h1 className="top-area__title">마이페이지</h1>
      </div>

      {/* Main Frame */}
      <div className="frame-main">
        {/* Profile Header */}
        <section className="head">
          <div className="profile">
            <div className="profile-pic">
              {/* ✅ 프로필 이미지 적용 */}
              <img
                src={profile}  // ❗ 중괄호로 변수 사용
                alt="프로필"
              />
            </div>
            <span className="profile-name">김보린 님</span>
          </div>
          <div className="badge">
            <span className="badge-text">기본플랜</span>
          </div>
        </section>

        {/* In-Progress Storage */}
        <section className="in-progress">
          <div className="in-progress__info">
            <div className="in-progress__label">진행중인 보관</div>
            <div className="in-progress__count">신청완료 1건</div>
          </div>
          {/* ✅ 패키지 이미지 적용 */}
          <img
            className="in-progress__icon"
            src={packaged}  // ❗ 중괄호로 변수 사용
            alt="진행중인 보관 아이콘"
          />
        </section>

        {/* View History Button */}
        <button className="view-history-btn">
          보관 내역 확인하기
        </button>

        {/* Service Menu List */}
        <div className="contents">
          <div className="contents-item">
            <span className="contents-item__title">계정관리</span>
            <div className="contents-item__icon">
              <div className="Vector" />
            </div>
          </div>
          <div className="contents-item">
            <span className="contents-item__title">결제관리</span>
            <div className="contents-item__icon">
              <div className="Vector" />
            </div>
          </div>
          <div className="contents-item">
            <span className="contents-item__title">고객센터</span>
            <div className="contents-item__icon">
              <div className="Vector" />
            </div>
          </div>
          <div className="contents-item">
            <span className="contents-item__title">서비스 정보</span>
            <div className="contents-item__icon">
              <div className="Vector" />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ 하단 네비게이션 */}
      <UserNav active="mypage" onNavigate={handleNav} />
    </div>
  );
}