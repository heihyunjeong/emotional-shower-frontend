import React, { useState } from "react";
import "../../assets/css/user/userEquipStored.css";
import UserNav from "./userNav";

export default function UserEquipStored() {
  const [open, setOpen] = useState(false);

  return (
    <div className="user-equip-stored">
      {/* req2: StatusBar/HomeIndicator 제거 */}
      <header className="ues-header">
        <div className="ues-logo" aria-label="LOGO" />
      </header>

      {/* req3: 수직 스택 + 중앙 정렬 */}
      <main className="ues-main">
        {/* Hero / Score */}
        <section className="ues-hero card">
          <div className="ues-hero-bg">
            <span className="blob blob-white" />
            <span className="blob blob-gray" />
          </div>

          <div className="ues-hero-text">
            <h1 className="ues-title">
              살로몽 댄스하울 <br /> 안전 지수
            </h1>
            <div className="ues-score">84점</div>
          </div>

          <div className="ues-hero-image" aria-hidden="true">
            <img
              src="https://placehold.co/240x351"
              alt=""
              loading="lazy"
            />
          </div>

          {/* 두 버튼 나란히 */}
          <div className="ues-cta">
            <button className="btn ghost disabled" disabled>
              <span className="btn-icon box" />
              <span className="btn-text">
                <strong>수리 요청</strong>
                <small>서비스 예정이에요</small>
              </span>
            </button>

            <button className="btn ghost">
              <span className="btn-icon box" />
              <span className="btn-text">
                <strong>장비 꺼내기</strong>
                <small>스노보드, 휘닉스파크</small>
              </span>
            </button>
          </div>
        </section>

        {/* 점검 레포트 */}
        <section className="ues-report card">
          <div className="row between">
            <h2>점검 레포트</h2>
            <time className="muted">25.07.27</time>
          </div>

          <div className="report-canvas">
            {/* placeholder images */}
            <img src="https://placehold.co/579x262" alt="" className="img a" />
            <img src="https://placehold.co/579x262" alt="" className="img b" />
            <img src="https://placehold.co/579x262" alt="" className="img c" />
            <img src="https://placehold.co/579x262" alt="" className="img d" />

      
          </div>

          <button className="btn line full">자세히 보러가기</button>
        </section>

        {/* 보관 정보 (아코디언) */}
        <section className="ues-storage card">
          <button
            className="fold-header"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            <span>보관 정보</span>
            <span className={`chev ${open ? "up" : "down"}`} />
          </button>

          {!open && <div className="fold-closed" aria-hidden />}

          {open && (
            <div className="fold-open">
              <div className="kv">
                <span className="k muted">보관 옵션</span>
                <span className="v">자유 플랜</span>
              </div>
              <div className="kv">
                <span className="k muted">보관 지역</span>
                <span className="v">평창 휘닉스파크</span>
              </div>
              <div className="kv">
                <span className="k muted">보관 기간</span>
                <span className="v multiline">
                  2025년 11월 25일 <br />~ 2026년 11월 24일
                </span>
              </div>

              <div className="divider" />

              <div className="kv">
                <span className="k muted">다음 연장 결제 예정일</span>
                <span className="v">2026년 7월 20일</span>
              </div>
              <div className="kv">
                <span className="k muted">연장 취소 가능 마감일</span>
                <span className="v">2026년 11월 19일</span>
              </div>

              <p className="notice">
                보관 연장을 원하지 않으시는 경우, 마이페이지의 결제관리 메뉴에서
                연장 결제 취소를 꼭 진행해주세요.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* 하단 네비: 별도 컴포넌트 */}
      <UserNav active="myequipment" />
    </div>
  );
}
