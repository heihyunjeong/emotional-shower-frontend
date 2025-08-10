import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userMyProgCancelCon.css';

export default function CancelCompletePage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="history-cancel-page">
      {/* Header (req2: no status/home bars) */}
      <div className="header">
        <div className="back-button" onClick={() => navigate(-1)}>
          <div className="icon" />
        </div>
        <div className="page-title">결제 해지하기</div>
      </div>

      <div className="content">
        {/* 1. 환불 안내 노트 */}
        <div className="complete-note-row">
          <div className="complete-note-icon">
            <div className="icon" />
          </div>
          <div className="complete-note-text">
            환불은 결제 방식에 따라 최대 3일 소요될 수 있어요.
          </div>
        </div>

        {/* 2. 취소 완료 메시지 (req3: centered) */}
        <div className="complete-section">
          <div className="complete-img-wrapper">
            <div className="complete-img-placeholder">
              IMG영역<br/>128*128
            </div>
          </div>
          <div className="complete-message-section">
            <div className="complete-title">
              취소 요청이<br/>완료되었습니다
            </div>
            <div className="complete-subtext">
              궁금하신 점이 있다면<br/>언제든 편하게 고객센터로 문의해주세요.
            </div>
          </div>
        </div>

        {/* 3. 홈으로 돌아가기 버튼 */}
        <div className="complete-cta-container">
          <button className="complete-cta-button" onClick={goHome}>
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
);
}
