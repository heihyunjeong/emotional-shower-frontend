// userStorInf.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userStorInf.css';

export default function UserStorInf() {
  const navigate = useNavigate();
  const [data] = useState({
    name: '김보린',
    tel: '010-1234-5678',
    equipment: '스노보드',
    location: '평창 휘닉스파크',
    plan: '자유플랜',
    amount: '139,000원',
  });

  const handleConfirm = () => {
    // 예: 결제 완료 페이지로 이동
    navigate('/completion');
  };

  return (
    <div className="confirmation-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-bg" />
        <div className="progress-fill" />
      </div>

      {/* Title */}
      <div className="section-title">
        신청 내용을 한 번 더<br/>확인해볼게요
      </div>

      {/* Confirmation Form */}
      <div className="confirmation-form">
        <div className="form-item">
          <span className="label">이름</span>
          <span className="value">{data.name}</span>
        </div>
        <div className="form-item">
          <span className="label">연락처</span>
          <span className="value">{data.tel}</span>
        </div>

        <div className="divider" />

        <div className="form-item">
          <span className="label">보관 항목</span>
          <span className="value">{data.equipment}</span>
        </div>
        <div className="form-item">
          <span className="label">보관 장소</span>
          <span className="value">{data.location}</span>
        </div>
        <div className="form-item">
          <span className="label">보관 방식</span>
          <span className="value">{data.plan}</span>
        </div>

        <div className="payment-summary">
          <span className="label">최종 결제 금액</span>
          <span className="amount">{data.amount}</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer">
        장비 수거는 신청 완료 후 영업일 기준 1~2일 내 운영팀이 개별 연락을 드려 일정 조율 후 진행됩니다.<br/>
        이 서비스는 1년 단위로 자동 연장되며, 연장 3일 전까지는 언제든지 연장 취소가 가능합니다.<br/>
        보관 시작일은 결제일이 아닌, 장비가 실제 보관 장소에 도착한 날을 기준으로 산정됩니다.<br/>
        수거 3일 전에는 취소 및 전액 환불이 가능하며, 수거 이후에는 취소 불가합니다.
      </div>

      {/* Confirm Button */}
      <button className="cta-button" onClick={handleConfirm}>
        확인
      </button>
    </div>
  );
}
