// HistoryCancelListPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userMyProgCancel.css';

export default function HistoryCancelListPage() {
  const [showRefund, setShowRefund] = useState(false);

  const handleCancelClick = () => {
    setShowRefund(true);
  };

  return (
    <div className="history-cancel-page">
      {/* Header */}
      <div className="header">
        <div className="back-button">
          <div className="icon" />
        </div>
        <div className="page-title">결제 해지하기</div>
      </div>

      <div className="content">
        {/* 1. 취소 내역 카드 — always visible */}
        <div className="cancel-card">
          <div className="section-title">취소 내역</div>
          <div className="item-row">
            <div className="item-label">보관 항목</div>
            <div className="item-value">스노보드</div>
          </div>
          <div className="item-row">
            <div className="item-label">보관 옵션</div>
            <div className="item-value">자유 플랜</div>
          </div>
          <div className="item-row">
            <div className="item-label">보관 지역</div>
            <div className="item-value">평창 - 휘닉스파크</div>
          </div>
          <div className="item-row">
            <div className="item-label">보관 종료일</div>
            <div className="item-value">2026년 11월 24일</div>
          </div>
          <div className="item-row">
            <div className="item-label">연장 결제일</div>
            <div className="item-value">2026년 5월 15일</div>
          </div>
        </div>

        {/* Separator */}
        <div className="separator-bar" />

        {!showRefund ? (
          <>
            {/* 2. 결제해지 유의사항 */}
            <div className="notice-section">
              <div className="notice-title">결제해지 유의사항</div>
              <div className="notice-list">
                <div className="notice-list-item">
                  <div className="notice-bullet">·</div>
                  <div className="notice-text">
                    결제 해지 후에는 시즌 중 장비 꺼내기를 통해 직접 장비를 수령해주셔야 합니다.
                  </div>
                </div>
                <div className="notice-list-item">
                  <div className="notice-bullet">·</div>
                  <div className="notice-text">
                    단, 비시즌에는 장비 꺼내기 기능이 제한될 수 있으므로 고객센터를 통해 문의해주세요.
                  </div>
                </div>
                <div className="notice-list-item">
                  <div className="notice-bullet">·</div>
                  <div className="notice-text">
                    문의 후 수령 일정이 확정되어야만 보관 종료 처리가 완료됩니다.
                  </div>
                </div>
                <div className="notice-list-item">
                  <div className="notice-bullet">·</div>
                  <div className="notice-text">
                    장비를 수령하지 않은 상태에서 30일이 지나면 장비 폐기 또는 업사이클링 처리됩니다.
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="cta-container">
              <button className="cta-button" onClick={handleCancelClick}>
                결제 해지하기
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 3. 취소 및 환불 유의사항 */}
            <div className="refund-section">
              <div className="refund-title">취소 및 환불 유의사항</div>
              <div className="refund-list">
                <div className="refund-list-item">
                  <div className="refund-bullet">·</div>
                  <div className="refund-text">
                    수거일 기준 3일 전까지 취소 시 : 전액 환불(100%)
                  </div>
                </div>
                <div className="refund-list-item">
                  <div className="refund-bullet">·</div>
                  <div className="refund-text">
                    수거일 당일 취소 시 : 50% 환불 적용
                  </div>
                </div>
                <div className="refund-list-item">
                  <div className="refund-bullet">·</div>
                  <div className="refund-text">
                    수거 후에는 보관 서비스가 시작된 것으로 간주되며 취소 및 환불이 어렵습니다.
                  </div>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="separator-bar" />

            {/* 4. 환불 예상 금액 */}
            <div className="refund-amount-row">
              <div className="refund-amount-label">환불 예상 금액</div>
              <div className="refund-amount-value">139,000원</div>
            </div>

            {/* New CTA */}
            <div className="refund-cta-container">
              <button className="refund-cta-button">
                취소하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
