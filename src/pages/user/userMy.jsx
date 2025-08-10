import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userMy.css';

export default function MyPage() {
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
              <img
                src="https://placehold.co/60x60"
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
          <img
            className="in-progress__icon"
            src="https://placehold.co/48x48"
            alt="Vault Icon"
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

      {/* Bottom Navigation */}
      <nav className="navigation-bar">
        <div className="nav-menu">
          <div className="nav-menu__icon">
            <div className="Vector" />
          </div>
          <span className="nav-menu__text">홈</span>
        </div>
        <div className="nav-menu">
          <div className="nav-menu__icon">
            <div className="Vector" />
          </div>
          <span className="nav-menu__text">내 장비</span>
        </div>
        <div className="nav-menu active">
          <div className="nav-menu__icon">
            <div className="Vector" />
          </div>
          <span className="nav-menu__text">마이페이지</span>
        </div>
      </nav>
    </div>
  );
}
