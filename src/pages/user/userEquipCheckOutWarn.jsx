import React from "react";
import "../../assets/css/user/userEquipCheckOutWarn.css";

export default function userEquipCheckOutWarn({ onBack, onStart }) {
  return (
    <div className="my-equip-basic">
      {/* req2: keep only our in-app header (no OS status bar / home indicator) */}
      <header className="topbar">
        <button
          type="button"
          className="back-btn"
          aria-label="뒤로가기"
          onClick={onBack}
        >
          <svg width="12" height="21" viewBox="0 0 12 21" aria-hidden="true">
            <path d="M10.5 1.5L1.5 10.5L10.5 19.5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="page-title">장비 꺼내기</h1>
      </header>

      {/* req3: vertical flow, centered horizontally */}
      <main className="content">
        <h2 className="screen-title">
          기본 플랜을 선택하셨다면
          <br />
          꼭 확인해주세요!
        </h2>

        <div className="img-box">
          <span>
            IMG영역
            <br />
            128×128
          </span>
        </div>

        <ul className="notes">
          <li>
            <span className="ex-icon">!</span>
            <span>시즌 중 장비 꺼내기 1회만 제공됩니다.</span>
          </li>
          <li>
            <span className="ex-icon">!</span>
            <span>
              계속 보관을 원하시면, 시즌이 끝나기 전에 장비를 다시 보관소에 맡겨주세요.
            </span>
          </li>
          <li>
            <span className="ex-icon">!</span>
            <span>
              연장을 원하지 않으신다면, 장비는 그대로 가져가시고 마이페이지에서 자동
              결제 해지를 꼭 해주세요!
            </span>
          </li>
        </ul>
      </main>

      <div className="cta-wrap">
        <button type="button" className="primary-btn" onClick={onStart}>
          신청 시작
        </button>
      </div>
    </div>
  );
}
