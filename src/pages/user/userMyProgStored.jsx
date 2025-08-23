// src/pages/user/InProgressStorage.jsx
import React from 'react';
import '../../assets/css/user/userMyProg.css';

import emptyBox from "../../assets/img/empty.png";

export default function UserMyProgStored() {
  // ✅ 현재는 빈 상태 (추후 API 연동 시 items 불러오기)
  const items = [];

  return (
    <div className="inprogress-container">
      {/* Top area */}
      <div className="top-area">
        <button className="back-button" aria-label="뒤로가기" />
        <h2 className="page-title">진행 중인 보관</h2>
      </div>

      {/* Tab group */}
      <div className="tab-group">
        <div className="tab">
          신청 완료
        </div>
        <div className="tab active">보관 중 <div className="tab-bar" /></div>
        <div className="tab">보관 종료</div>
      </div>

      {/* Item list or Empty state */}
      <div className="item-list">
        {items.length === 0 ? (
          <div className="empty-state">
            <img
              src={emptyBox} // ✅ userEquipStored와 동일 이미지
              alt="empty"
              className="empty-image"
            />
            <p className="empty-text">
              앗! 현재 해당 상태의<br />장비가 없습니다
            </p>
          </div>
        ) : (
          items.map((item) => (
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
          ))
        )}
      </div>
    </div>
  );
}
