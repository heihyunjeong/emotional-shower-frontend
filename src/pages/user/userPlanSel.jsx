// src/pages/user/UserPlanSelect.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// 공용 CSS
import "../../assets/css/components/uiCommon.css";
// 페이지 전용 CSS
import "../../assets/css/user/userPlanSel.css";

import TopAreaSubPage from "../components/TopAreaSubPage";
import ProgressBar from "../components/ProgressBar";
import PageTitle from "../components/PageTitle";

import backBut from "../../assets/img/backBut.png";
import xBut from "../../assets/img/xBut.png";

export default function UserPlanSelect() {
  const navigate = useNavigate();
  const goBack = () => navigate("/storing/locationselection");
  const goHome = () => navigate("/home");
  const goNext = (plan) => {
    // 선택한 플랜 정보도 state로 넘겨줄 수 있음
    navigate("/storing/storinginfo", { state: { plan } });
  };

  return (
    <div className="plan-container">
      {/* 상단 (뒤로/닫기) */}
      <TopAreaSubPage
        onBack={goBack}
        onClose={goHome}
        backIcon={backBut}
        closeIcon={xBut}
      />

      {/* 진행바 (Anima width=180px) */}
      <ProgressBar width="180px" />

      {/* 타이틀 */}
      <PageTitle>
        원하는 보관 방식은<br />무엇인가요?
      </PageTitle>

      {/* 플랜 선택 영역 */}
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
              <span className="dot primary" />
              시즌 중 1회 출고만 가능
            </div>
            <div className="benefit">
              <span className="dot primary" />
              시즌 종료 전까지 1회 재입고 가능
            </div>
          </div>

          <div
            className="plan-button filled"
            onClick={() => goNext("basic")}
          >
            플랜 선택
          </div>
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
              <span className="dot white" />
              시즌 중 무제한 꺼내기 / 넣기 가능
            </div>
            <div className="benefit">
              <span className="dot white" />
              시즌 라커 용도로 사용 가능
            </div>
          </div>

          <div
            className="plan-button white"
            onClick={() => goNext("free")}
          >
            플랜 선택
          </div>
        </div>
      </div>
    </div>
  );
}
