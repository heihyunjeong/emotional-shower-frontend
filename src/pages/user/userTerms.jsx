import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 공용 스타일/컴포넌트
import "../../assets/css/components/uiCommon.css";
import "../../assets/css/user/userTerms.css";

import TopAreaSubPage from "../components/TopAreaSubPage";
import ProgressBar from "../components/ProgressBar";
import PageTitle from "../components/PageTitle";
import PrimaryButton from "../components/PrimaryButton";

import backBut from "../../assets/img/backBut.png";
import xBut from "../../assets/img/xBut.png";

const termsData = [
  { id: 'service', label: '[필수] 서비스 이용 약관 동의', required: true },
  { id: 'damage',  label: '[필수] 손해배상 및 면책 동의', required: true },
  { id: 'autoext', label: '[필수] 보관 자동 연장 안내 및 동의', required: true },
];

const TERMS_URL = "https://fourth-mastodon-5ca.notion.site/BORINI-252e187fe03e80a0959ad371c5d88462";

export default function TermsAgreement() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});         // { service: true, ... }
  const [showModal, setShowModal] = useState(false);
  const [activeTerm, setActiveTerm] = useState(null); // 현재 모달 제목용

  const allChecked = termsData.every(t => !!checked[t.id]);
  const allRequiredChecked = allChecked; // 전부 필수이므로 동일

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/home");
  const goNext = () => {
    if (!allRequiredChecked) return;
    navigate("/storing/paymentmethod");
  };

  // ▶ 전체 동의: 모든 항목 토글 (모달 열지 않음)
  const toggleAll = () => {
    const val = !allChecked;
    const next = {};
    termsData.forEach(t => { next[t.id] = val; });
    setChecked(next);
  };

  // ▶ 개별 항목: 체크 토글 + 모달 오픈
  const toggleOneAndOpen = (id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
    setActiveTerm(id);
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setActiveTerm(null); };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(TERMS_URL);
      alert("링크가 복사되었습니다.");
    } catch {
      alert("복사에 실패했어요. 수동으로 복사해 주세요.");
    }
  };

  return (
    <div className="terms-container">
      {/* 상단 공용 영역 */}
      <TopAreaSubPage onBack={goBack} onClose={goHome} backIcon={backBut} closeIcon={xBut} />
      <ProgressBar width="300px" />
      <PageTitle>약관을 확인하고<br/>동의해주세요</PageTitle>

      {/* 리스트 영역 (Anima 구조 반영) */}
      <div className="frame">
        <div className="view">
          <div className="wrap" role="group" aria-label="약관 목록">
            {/* ── 약관 전체 동의 (모달 없음) ───────────────── */}
            <div
              className="element element--all"
              role="checkbox"
              aria-checked={allChecked}
              onClick={toggleAll}
            >
              <div className="div">
                <p className="text">
                  <span className="text-wrapper-2">약관 전체 동의</span>
                </p>
              </div>
              <span className={`check-24-instance ${allChecked ? 'checked' : ''}`} aria-hidden />
            </div>

            {/* ── 개별 약관 3개 (탭 시 체크 + 모달) ───────────── */}
            {termsData.map((t) => {
              const isChecked = !!checked[t.id];
              return (
                <div
                  key={t.id}
                  className="element"
                  role="checkbox"
                  aria-checked={isChecked}
                  onClick={() => toggleOneAndOpen(t.id)}
                >
                  {/* 왼쪽 라벨 */}
                  <div className="div">
                    <p className="text">
                      <span className="span">[필수]</span>
                      <span className="text-wrapper-2">
                        {" "}{t.label.replace(/^\[필수\]\s*/, '')}
                      </span>
                    </p>
                    {/* 가운데 화살표(표시용) */}
                    <div className="icon-arrow-right" aria-hidden>
                      <span className="vector">›</span>
                    </div>
                  </div>

                  {/* 우측 체크박스 */}
                  <span className={`check-24-instance ${isChecked ? 'checked' : ''}`} aria-hidden />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 하단 고정 CTA */}
      <div className="fixed-cta">
        <PrimaryButton onClick={goNext} disabled={!allRequiredChecked} active={allRequiredChecked}>
          다음
        </PrimaryButton>
      </div>

      {/* 모달: Notion 링크 외부 열기 안내 */}
      {showModal && (
        <div className="terms-modal" role="dialog" aria-modal="true" aria-label="약관 전문 보기">
          <div className="terms-modal__backdrop" onClick={closeModal} />
          <div className="terms-modal__panel">
            <div className="terms-modal__header">
              <div className="terms-modal__title">
                {activeTerm
                  ? (termsData.find(t => t.id === activeTerm)?.label || "약관 전문")
                  : "약관 전문"}
              </div>
              <button type="button" className="terms-modal__close" onClick={closeModal} aria-label="닫기">✕</button>
            </div>

            <div className="terms-modal__body">
              <div className="embed-fallback">
                <p className="embed-fallback__text">
                  이 문서는 보안 설정으로 인해 앱 내에서 표시할 수 없습니다.
                  <br />아래 버튼을 눌러 외부 브라우저에서 열어주세요.
                </p>
                <div className="embed-fallback__actions">
                  <a className="external-open" href={TERMS_URL} target="_blank" rel="noopener noreferrer">
                    새 창으로 열기
                  </a>
                  <button className="close-inline" onClick={copyLink}>링크 복사</button>
                </div>
              </div>
            </div>

            <div className="terms-modal__footer">
              <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" className="external-open">새 창으로 열기</a>
              <button type="button" className="close-inline" onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
