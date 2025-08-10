import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userPayComp.css';

export default function UserPaymentComplete() {
  const navigate = useNavigate();

  return (
    <div className="payment-complete-container">
      {/* Success Frame */}
      <div className="complete-frame">
        <div className="complete-img">
          <div className="img-placeholder">
            IMG영역<br/>200*200
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

      {/* Back Home Button */}
      <button
        className="cta-button"
        onClick={() => navigate('/')}
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
