import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userMy.css';

export default function EmptyPage() {
  return (
    <div className="empty-page">
      {/* Header */}
      <div className="empty-page__header">
        <div className="empty-page__back">
          <div className="Vector" />
        </div>
        <div className="empty-page__title">진행 중인 보관</div>
      </div>

      {/* Tabs */}
      <div className="empty-page__tabs">
        <div className="empty-page__tab">신청 완료</div>
        <div className="empty-page__tab empty-page__tab--active">보관중</div>
        <div className="empty-page__tab">보관 종료</div>
      </div>

      {/* Content */}
      <div className="empty-page__content">
        <div className="empty-page__img-wrapper">
          <div className="empty-page__img-placeholder">
            IMG영역<br/>200*200
          </div>
        </div>
        <div className="empty-page__message">
          앗! 현재 해당 상태의<br/>장비가 없습니다
        </div>
      </div>
    </div>
  );
}