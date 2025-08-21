import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 공용 스타일/컴포넌트
import "../../assets/css/components/uiCommon.css";
import "../../assets/css/user/userPay.css";

import TopAreaSubPage from "../components/TopAreaSubPage";
import ProgressBar from "../components/ProgressBar";
import PageTitle from "../components/PageTitle";
import PrimaryButton from "../components/PrimaryButton";

import backBut from "../../assets/img/backBut.png";
import xBut from "../../assets/img/xBut.png";

/* 결제 로고 이미지 (카드는 텍스트만) */
import npayLogo from "../../assets/img/pay/npay.png";
import kakaoPayLogo from "../../assets/img/pay/kakaopay.png";
import tossPayLogo from "../../assets/img/pay/tosspay.png";
import paycoLogo from "../../assets/img/pay/payco.png";

/** Layout: 11 / 11 / 2 (마지막은 full-width) */
const METHODS = [
  { id: "npay",     type: "img",  label: "네이버페이",         src: npayLogo },
  { id: "kakaopay", type: "img",  label: "카카오페이",         src: kakaoPayLogo },
  { id: "tosspay",  type: "img",  label: "토스페이",           src: tossPayLogo },
  { id: "payco",    type: "img",  label: "페이코",             src: paycoLogo },
  { id: "card",     type: "text", label: "신용카드 / 체크카드" } // full width
];

export default function UserPayment() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => setSelected(id);

  const handlePay = () => {
    if (!selected) return;
    // TODO: 실제 결제 로직 연결
    navigate("/storing/paymentcomplete");
  };

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/home");

  return (
    <div className="payment-container">
      {/* 상단 공용 */}
      <TopAreaSubPage onBack={goBack} onClose={goHome} backIcon={backBut} closeIcon={xBut} />
      <ProgressBar width="100%" />
      <PageTitle>결제 방식을<br/>선택해주세요</PageTitle>

      {/* 본문: 2열 그리드 (11 / 11 / 2) */}
      <div className="frame pay-frame">
        <div className="methods-grid" role="list">
          {METHODS.map(m => {
            const isSelected = selected === m.id;
            const span = m.id === "card" ? "span-2" : ""; // 마지막 항목 full width
            return (
              <button
                key={m.id}
                type="button"
                role="listitem"
                className={`grid-item ${span} ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelect(m.id)}
                aria-pressed={isSelected}
              >
                {m.type === "img" && m.src ? (
                  <img className="pay-logo" src={m.src} alt={m.label} />
                ) : (
                  <div className="pay-text">{m.label}</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 하단 고정 CTA */}
      <div className="fixed-cta">
        <PrimaryButton onClick={handlePay} disabled={!selected} active={!!selected}>
          결제하기
        </PrimaryButton>
      </div>
    </div>
  );
}
