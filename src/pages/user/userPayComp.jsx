import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// API 헬퍼 가져오기
import { paymentAPI } from "../../utils/apiHelper";
import '../../assets/css/user/userPayComp.css';
import PrimaryButton from "../components/PrimaryButton";

import payComp from "../../assets/img/payCom.png";

export default function UserPaymentComplete() {
  const navigate = useNavigate();

  const handleClick = () => {
    // 내부 라우팅
    navigate("/home");

    // 외부 링크 새 창에서 열기
    window.open("http://pf.kakao.com/_Vfxbwn/friend", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="payment-complete-container">
      {/* Success Frame */}
      <div className="complete-frame">
        <div className="complete-img">
          <div className="img-placeholder">
             <img src={payComp} alt="완료" />
          </div>
        </div>
        <div className="complete-text">
          <div className="title">보관 신청 완료!</div>
          <div className="subtitle">
            빠르게 확인 후, 개별 연락 드릴게요!<br/>
            메시지 꼭 확인 부탁드려요.
          </div>
        </div>
      </div>

      {/* PrimaryButton */}
      <div className="fixed-cta">
        <PrimaryButton onClick={handleClick}>
          카톡으로 일정잡기
        </PrimaryButton>
      </div>
    </div>
  );
}
