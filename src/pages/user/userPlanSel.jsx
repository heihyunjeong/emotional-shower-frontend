import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userPlanSel.css';

export default function UserPlanSelect() {
  return (
    <div className="plan-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-bg" />
        <div className="progress-fill" style={{ width: '180px' }} />
      </div>

      {/* Title */}
      <div className="plan-title">원하는 보관 방식은<br />무엇인가요?</div>

      <div className="plan-options">
        {/* 기본 플랜 */}
        <div className="plan-card basic">
          <div className="plan-header">
            <div className="plan-name">기본플랜</div>
            <div className="plan-price">99,000원 / 연</div>
            <div className="plan-unit">장비 1세트당</div>
          </div>
          <div className="plan-benefits">
            <div className="benefit">
              <span className="dot primary"></span>
              시즌 중 1회 출고만 가능
            </div>
            <div className="benefit">
              <span className="dot primary"></span>
              시즌 종료 전까지 1회 재입고 가능
            </div>
          </div>
          <div className="plan-button filled">플랜 선택</div>
        </div>

        {/* 자유 플랜 */}
        <div className="plan-card free">
          <div className="plan-header">
            <div className="plan-name">자유플랜</div>
            <div className="plan-price">139,000원 / 연</div>
            <div className="plan-unit">장비 1세트당</div>
          </div>
          <div className="plan-benefits">
            <div className="benefit">
              <span className="dot white"></span>
              시즌 중 무제한 꺼내기 / 넣기 가능
            </div>
            <div className="benefit">
              <span className="dot white"></span>
              시즌 라커 용도로 사용 가능
            </div>
          </div>
          <div className="plan-button white">플랜 선택</div>
        </div>
      </div>
    </div>
  );
}