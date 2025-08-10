import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/user/userMyPaymentStored.css";  // this file

export default function userMyPaymentStored() {
  return (
    <div className="keep-container" data-layer="마이페이지_보관중-내역리스트확인">
      {/* req2: Status Bar & Home Indicator removed */}

      {/* top area (kept) */}
      <div className="subpage-top">
        <button className="back-btn" aria-label="뒤로가기" onClick={() => window.history.back()} />
        <div className="page-title">결제 관리</div>
      </div>

      {/* tabs */}
      <div className="tab-group">
        <div className="tab active"><span>보관중</span></div>
        <div className="tab"><span>과거 이력</span></div>
      </div>

      {/* list */}
      <div className="list-wrap">
        {/* card 1 */}
        <div className="card">
          <div className="card-head">
            <div className="title-line">
              <div className="brand">살로몬</div>
              <div className="meta">
                <span>댄스하울</span>
                <span className="dot" />
                <span>144cm</span>
              </div>
            </div>
            <div className="tag">보관중</div>
          </div>

          <div className="rows">
            <div className="row">
              <div className="label">보관 시작일</div>
              <div className="value">2025년 11월 25일</div>
            </div>
            <div className="row">
              <div className="label">보관 종료일</div>
              <div className="value">2025년 11월 25일</div>
            </div>
            <div className="row">
              <div className="label">결제 금액</div>
              <div className="value">139,000원</div>
            </div>
            <div className="row">
              <div className="label">보관 종료일</div>
              <div className="value alert">2025년 11월 25일</div>
            </div>
          </div>

          <div className="cta">
            <div className="cta-text">결제 해지</div>
          </div>
        </div>

        {/* card 2 */}
        <div className="card">
          <div className="card-head">
            <div className="title-line">
              <div className="brand">살로몬</div>
              <div className="meta">
                <span>댄스하울</span>
                <span className="dot" />
                <span>144cm</span>
              </div>
            </div>
            <div className="tag">보관중</div>
          </div>

          <div className="rows">
            <div className="row">
              <div className="label">보관 시작일</div>
              <div className="value">2025년 11월 25일</div>
            </div>
            <div className="row">
              <div className="label">보관 종료일</div>
              <div className="value">2025년 11월 25일</div>
            </div>
            <div className="row">
              <div className="label">결제 금액</div>
              <div className="value">139,000원</div>
            </div>
            <div className="row">
              <div className="label">보관 종료일</div>
              <div className="value alert">2025년 11월 25일</div>
            </div>
          </div>

          <div className="cta">
            <div className="cta-text">결제 해지</div>
          </div>
        </div>
      </div>
    </div>
  );
}
