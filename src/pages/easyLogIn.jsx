import React, { useState } from 'react';
import '../assets/css/easylogin.css';

export default function EasyLogin() {
  return (
    <div className="easy-login-container">
      <div className="easy-login-content">
        {/* Title */}
        <div className="easy-login-title">장비 걱정은 이제 그만!</div>
        <div className="easy-login-sub">지금 바로, 스마트한 보관 생활 보린이에서 시작해보세요!</div>

        {/* 카카오 로그인 */}
        <div className="easy-login-button kakao">
          <div className="easy-login-icon" />
          <div className="easy-login-text kakao-text">카카오로 시작하기</div>
        </div>

        {/* 네이버 로그인 */}
        <div className="easy-login-button naver">
          <div className="easy-login-icon" />
          <div className="easy-login-text naver-text">네이버로 시작하기</div>
        </div>

        {/* 구글 로그인 */}
        <div className="easy-login-button google">
          <div className="easy-login-icon google-icon" />
          <div className="easy-login-text google-text">구글로 시작하기</div>
        </div>

        {/* 애플 로그인 */}
        <div className="easy-login-button apple">
          <div className="easy-login-icon apple-icon" />
          <div className="easy-login-text apple-text">Apple ID로 시작하기</div>
        </div>
      </div>
    </div>
  );
}
