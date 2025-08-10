import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/user/userMyPaymentPast.css"; // page styles

export default function UserMyPaymentPast() {
  return (
    <div className="past-container" data-layer="마이페이지_과거이력-내역리스트확인">
      {/* req2: removed iOS Status Bar & Home Indicator */}

      {/* top area */}
      <div className="subpage-top">
        <button
          className="back-btn"
          aria-label="뒤로가기"
          onClick={() => window.history.back()}
        />
        <div className="page-title">결제 관리</div>
      </div>

      {/* tabs */}
      <div className="tab-group">
        <div className="tab"><span>보관중</span></div>
        <div className="tab active"><span>과거 이력</span></div>
      </div>

      {/* list */}
      <div className="list-wrap">
        {/* card 1 */}
        <div className="card">
          <div className="card-head">
            <div className="title-line">
              <div className="brand">버튼</div>
              <div className="meta">
                <span>오카사가</span>
                <span className="dot" />
                <span>144cm</span>
              </div>
            </div>
            <div className="tag tag-end">보관종료</div>
          </div>

          <div className="rows">
            <div className="row">
              <div className="label">보관 시작일</div>
              <div className="value">2025년 5월 6일</div>
            </div>
            <div className="row">
              <div className="label">보관 종료일</div>
              <div className="value">2026년 5월 5일</div>
            </div>
            <div className="row">
              <div className="label">결제 금액</div>
              <div className="value">139,000원</div>
            </div>
          </div>
        </div>

        {/* card 2 */}
        <div className="card">
          <div className="card-head">
            <div className="title-line">
              <div className="brand">버튼</div>
              <div className="meta">
                <span>오카사가</span>
                <span className="dot" />
                <span>144cm</span>
              </div>
            </div>
            <div className="tag tag-end">보관종료</div>
          </div>

          <div className="rows">
            <div className="row">
              <div className="label">보관 시작일</div>
              <div className="value">2025년 5월 6일</div>
            </div>
            <div className="row">
              <div className="label">보관 종료일</div>
              <div className="value">2026년 5월 5일</div>
            </div>
            <div className="row">
              <div className="label">결제 금액</div>
              <div className="value">139,000원</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
