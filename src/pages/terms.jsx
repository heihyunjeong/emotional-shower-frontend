// src/pages/user/TermsAgreement.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../assets/css/components/uiCommon.css";
import "../assets/css/terms.css";

import TopAreaSubPage from "./components/TopAreaSubPage";
import ProgressBar from "./components/ProgressBar";
import PageTitle from "./components/PageTitle";
import PrimaryButton from "./components/PrimaryButton";

import backBut from "../assets/img/backBut.png";
import xBut from "../assets/img/xBut.png";

/**
 * 약관 목록
 * - 서비스 이용약관 & 마케팅: BORINI 링크 사용
 * - 개인정보 수집 및 이용: 별도(기존) 링크 유지
 */
const termsData = [
  {
    id: 'service',
    label: '[필수] 서비스 이용 약관 동의',
    required: true,
    url: "https://fourth-mastodon-5ca.notion.site/BORINI-252e187fe03e80a0959ad371c5d88462",
  },
  {
    id: 'data',
    label: '[필수] 개인정보 수집 및 이용 동의',
    required: true,
    url: "https://fourth-mastodon-5ca.notion.site/252e187fe03e8076b547c6ecc0645a3d?pvs=74",
  },
  {
    id: "marketing",
    label: "[선택] 마케팅 정보 수신 동의",
    required: false,
    url: "https://fourth-mastodon-5ca.notion.site/BORINI-252e187fe03e80a0959ad371c5d88462",
  },
];

export default function TermsAgreement() {
  const navigate = useNavigate();

const [checked, setChecked] = useState({});
const [showModal, setShowModal] = useState(false);
const [activeTerm, setActiveTerm] = useState(null);

  // 필수 항목 모두 체크 여부
  const allRequiredChecked = termsData
    .filter(term => term.required)
    .every(term => !!checked[term.id]);

  // 전체(선택 포함) 체크 여부
  const allChecked = termsData.every(t => !!checked[t.id]);

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/home");
  const goNext = () => {
    if (!allRequiredChecked) return;
    navigate("/name");
  };

  // 전체 동의 토글
  const toggleAll = () => {
    const value = !allChecked;
    const next: Record<string, boolean> = {};
    termsData.forEach(t => { next[t.id] = value; });
    setChecked(next);
  };

  // 개별 항목 토글 + 모달 열기
  const toggleOneAndOpen = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
    setActiveTerm(id);
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setActiveTerm(null); };

  const activeUrl =
    activeTerm ? (termsData.find(t => t.id === activeTerm)?.url) : undefined;

  const copyLink = async () => {
    try {
      if (activeUrl) {
        await navigator.clipboard.writeText(activeUrl);
        alert("링크가 복사되었습니다.");
      }
    } catch {
      alert("복사에 실패했어요. 수동으로 복사해 주세요.");
    }
  };

  return (
    <div className="terms-container">
      {/* 상단 공통 헤더 */}
      <TopAreaSubPage
        onBack={goBack}
        onClose={goHome}
        backIcon={backBut}
        closeIcon={xBut}
        hideClose={true}
      />
      {/* 진행 바 (원하시는 값으로) */}
      <ProgressBar width="20%" />
      {/* 타이틀 */}
      <PageTitle>약관을 확인하고<br/>동의해주세요</PageTitle>

      {/* PageTitle 아래 본문 */}
      <div className="frame">
        <div className="view">
          <div className="wrap" role="group" aria-label="약관 목록">
            {/* 전체 동의 */}
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
              <span
                className={`check-24-instance ${allChecked ? 'checked' : ''}`}
                aria-hidden
              />
            </div>

            {/* 개별 약관 */}
            {termsData.map(term => {
              const isChecked = !!checked[term.id];
              const isRequired = term.required;
              return (
                <div
                  key={term.id}
                  className="element"
                  role="checkbox"
                  aria-checked={isChecked}
                  onClick={() => toggleOneAndOpen(term.id)}
                >
                  {/* ⬇️ 기존(older) 내부 블록 구조 유지 */}
                  <div className="div">
                    <p className="text">
                      <span className="span">{isRequired ? "[필수]" : "[선택]"}</span>
                      <span className="text-wrapper-2">
                        {" "}{term.label.replace(/\[(필수|선택)\]\s?/, "")}
                      </span>
                    </p>
                    <div className="icon-arrow-right" aria-hidden>
                      <span className="vector">›</span>
                    </div>
                  </div>

                  {/* 우측 체크 표시 */}
                  <span
                    className={`check-24-instance ${isChecked ? 'checked' : ''}`}
                    aria-hidden
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 하단 고정 CTA */}
      <div className="fixed-cta">
        <PrimaryButton
          onClick={goNext}
          disabled={!allRequiredChecked}
          active={allRequiredChecked}
        >
          다음
        </PrimaryButton>
      </div>

      {/* 모달: 외부 링크 안내 */}
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
              <button
                type="button"
                className="terms-modal__close"
                onClick={closeModal}
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <div className="terms-modal__body">
              <div className="embed-fallback">
                <p className="embed-fallback__text">
                  보안 설정으로 인해 앱 내에서 표시할 수 없습니다.
                  <br />아래 버튼을 눌러 외부 브라우저에서 열어주세요.
                </p>
                <div className="embed-fallback__actions">
                  {activeUrl && (
                    <a
                      className="external-open"
                      href={activeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      새 창으로 열기
                    </a>
                  )}
                  <button className="close-inline" onClick={copyLink}>링크 복사</button>
                </div>
              </div>
            </div>

            <div className="terms-modal__footer">
              {activeUrl && (
                <a
                  href={activeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-open"
                >
                  새 창으로 열기
                </a>
              )}
              <button type="button" className="close-inline" onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
