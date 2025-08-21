// src/pages/user/userStorInf.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 공용 CSS (TopAreaSubPage / ProgressBar / PageTitle 공통 스타일)
import "../../assets/css/components/uiCommon.css";
// 페이지 전용 CSS (기존)
import '../../assets/css/user/userStorInf.css';

import TopAreaSubPage from "../components/TopAreaSubPage";
import ProgressBar from "../components/ProgressBar";
import PageTitle from "../components/PageTitle";
import PrimaryButton from "../components/PrimaryButton";

import backBut from "../../assets/img/backBut.png";
import xBut from "../../assets/img/xBut.png";

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
    navigate('/storing/terms');
  };

  // 뒤로가기/닫기 동작 (필요 시 경로 고정 가능: 예) navigate("/storing/planselection"))
  const goBack = () => navigate(-1);
  const goHome = () => navigate("/home");

  return (
    <div className="confirmation-container">
      {/* 상단(뒤로/닫기) */}
      <TopAreaSubPage
        onBack={goBack}
        onClose={goHome}
        backIcon={backBut}
        closeIcon={xBut}
      />

      {/* 진행바: 원하는 폭으로 지정 (예: 240px) */}
      <ProgressBar width="240px" />

      {/* 타이틀 */}
      <PageTitle>
        신청 내용을 한 번 더<br />확인해볼게요
      </PageTitle>

      {/* 확인 폼 */}
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

      {/* 안내 문구 */}
      <div className="disclaimer">
        장비 수거는 신청 완료 후 영업일 기준 1~2일 내 운영팀이 개별 연락을 드려 일정 조율 후 진행됩니다.<br/>
        이 서비스는 1년 단위로 자동 연장되며, 연장 3일 전까지는 언제든지 연장 취소가 가능합니다.<br/>
        보관 시작일은 결제일이 아닌, 장비가 실제 보관 장소에 도착한 날을 기준으로 산정됩니다.<br/>
        수거 3일 전에는 취소 및 전액 환불이 가능하며, 수거 이후에는 취소 불가합니다.
      </div>

      {/* 확인 버튼 */}
      <div className="fixed-cta">
        <PrimaryButton onClick={handleConfirm} active>
          확인
        </PrimaryButton>
      </div>
    </div>
  );
}
