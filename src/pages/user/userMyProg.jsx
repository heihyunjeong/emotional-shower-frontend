import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userMyProg.css';

export default function InProgressStorage() {
  // (You can pass your real data in as props or fetch it, this is just static example)
  const items = [
    {
      id: 1,
      product: '살로몬',
      status: '신청완료',
      detail1: '댄스하울',
      detail2: '144cm',
      period: '2025.11.25~2026.11.24',
    },
    {
      id: 2,
      product: '살로몬',
      status: '신청완료',
      detail1: '댄스하울',
      detail2: '144cm',
      period: '2025.11.25~2026.11.24',
    },
  ];

  return (
    <div className="inprogress-container">
      {/* Top area */}
      <div className="top-area">
        <button className="back-button" aria-label="뒤로가기" />
        <h2 className="page-title">진행 중인 보관</h2>
      </div>

      {/* Tab group */}
      <div className="tab-group">
        <div className="tab active">
          신청 완료
          <div className="tab-bar" />
        </div>
        <div className="tab">보관 중</div>
        <div className="tab">보관 종료</div>
      </div>

      {/* Item list */}
      <div className="item-list">
        {items.map(item => (
          <React.Fragment key={item.id}>
            <div className="inprogress-item">
              <div className="item-content">
                <div className="item-image-box">
                  <img
                    src="https://placehold.co/128x128?text=IMG"
                    alt={item.product}
                  />
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <span className="item-title">{item.product}</span>
                    <span className="item-tag">{item.status}</span>
                  </div>
                  <div className="item-meta">
                    <span className="meta-text">{item.detail1}</span>
                    <span className="separator" />
                    <span className="meta-text">{item.detail2}</span>
                  </div>
                  <div className="item-info">
                    <span className="info-label">보관기간</span>
                    <span className="info-value">{item.period}</span>
                  </div>
                </div>
              </div>
              <button className="cancel-button">신청취소</button>
            </div>
            <div className="divider" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}