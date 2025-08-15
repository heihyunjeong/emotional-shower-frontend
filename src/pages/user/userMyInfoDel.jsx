import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/user/userMyInfoDel.css";

export default function UserMyInfoDel() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [isModalOpen]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setIsModalOpen(false);
    }
    if (isModalOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  const sections = [
    {
      title: "취소 및 환불 유의사항",
      notes: ["계정 내 보관 중인 장비가 있을 경우, 계정 삭제가 불가합니다."],
    },
    {
      title: "삭제 시 유의사항",
      notes: [
        "계정에 로그인할 수 없으며, 보관 이력 및 결제내역 등 모두 삭제됩니다.",
        "향후 고객센터를 통한 복구는 불가합니다.",
      ],
    },
  ];

  const handleDeleteClick = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleConfirmDelete = () => {
    // TODO: 실제 삭제 API 연동
    setIsModalOpen(false);
    navigate("/mypage"); // 원하는 경로로 변경
  };

  return (
    <div className="del-details" data-layer="마이페이지_계정삭제 상세페이지">
      {/* Top bar */}
      <div className="subpage-top">
        <button
          className="back-btn"
          aria-label="뒤로가기"
          onClick={() => window.history.back()}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15 19L8 12L15 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <main className="content" role="main">
        <h1 className="page-heading">계정을 정말 삭제하시겠어요? 😢</h1>

        {sections.map((sec, idx) => (
          <section key={idx} className="section">
            <h2 className="section-title">{sec.title}</h2>
            <ul className="notes">
              {sec.notes.map((t, i) => (
                <li key={i} className="note-item">
                  <span className="dot" aria-hidden>
                    •
                  </span>
                  <span className="note-text">{t}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      {/* Bottom CTA */}
      <div className="bottom-cta">
        <button type="button" className="cta-danger" onClick={handleDeleteClick}>
          삭제
        </button>
      </div>

      {/* Confirm Modal */}
      {isModalOpen && (
        <>
          <div
            className="modal-backdrop"
            onClick={handleCancel}
            aria-hidden="true"
          />
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-body">
              <h2 id="modal-title" className="modal-title">
                정말 계정을 삭제 하실까요?
              </h2>
              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={handleCancel}>
                  취소
                </button>
                <button type="button" className="btn-danger" onClick={handleConfirmDelete}>
                  네
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
