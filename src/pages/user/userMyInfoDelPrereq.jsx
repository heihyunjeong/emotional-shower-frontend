import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/user/userMyInfoDelPrereq.css";

export default function UserMyInfoDelPrereq() {
  const navigate = useNavigate();

  const notes = [
    "계정 삭제 전 반드시 장비 수령을 하셔야합니다.",
    "보관 종료일까지 장비를 수령하지 않을 경우, 해당 장비는 폐기 또는 업사이클링 처리될 수 있습니다.",
    "연장을 원하지 않는 경우, 연장 결제 취소를 꼭 진행해주세요.",
    "연장 3일 전까지 결제 취소를 하지 않으면, 실제 보관 여부와 관계없이 자동 결제가 진행됩니다.",
    "장비 수령에 대한 궁금한 점은 언제든 고객센터로 문의 주세요.",
  ];

  return (
    <div className="del-prereq" data-layer="마이페이지_보관 중 장비 존재">
      {/* Top bar */}
      <div className="subpage-top">
        <button
          className="back-btn"
          aria-label="뒤로가기"
          onClick={() => window.history.back()}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 19L8 12L15 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <main className="content" role="main">
        <h1 className="page-heading">보관 중인 장비가 있어요</h1>

        <section className="note-box" aria-label="안내 사항">
          <ul className="notes">
            {notes.map((t, i) => (
              <li key={i} className="note-item">
                <span className="dot" aria-hidden>•</span>
                <span className="note-text">{t}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Bottom CTA */}
      <div className="bottom-cta">
        <button
          type="button"
          className="cta-primary"
          onClick={() => navigate("/mypage")}
        >
          마이페이지 돌아가기
        </button>
      </div>
    </div>
  );
}
