// src/pages/user/UserEquipmentSelect.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 공용 CSS (TopAreaSubPage / ProgressBar / PageTitle 공통 스타일)
import "../../assets/css/components/uiCommon.css";
// 페이지 전용 CSS (장비 카드 + CTA만)
import "../../assets/css/user/userEquipSel.css";

import TopAreaSubPage from "../components/TopAreaSubPage";
import ProgressBar from "../components/ProgressBar";
import PageTitle from "../components/PageTitle";
import PrimaryButton from "../components/PrimaryButton";

import backBut from "../../assets/img/backBut.png";
import xBut from "../../assets/img/xBut.png";

import snowBoard from "../../assets/img/snowboard.png";
import ski from "../../assets/img/ski.png";

export default function UserEquipmentSelect() {
  const [selected, setSelected] = useState(null); // 'snowboard' | 'ski' | null
  const navigate = useNavigate();

  const goBack = () => navigate("/home");
  const goHome = () => navigate("/home");
  const goNext = () => {
    if (!selected) return;
    // 다음 단계로 현재 선택값을 함께 전달
    navigate("/storing/locationselection", { state: { equipment: selected } });
  };

  return (
    <div className="storage-container">
      {/* 상단(뒤로/닫기) - 둘 다 홈으로 */}
      <TopAreaSubPage onBack={goHome} onClose={goHome} backIcon={backBut} closeIcon={xBut} />

      {/* 진행바 - 1단계 폭 예시 60px */}
      <ProgressBar width="60px" />

      {/* 타이틀 */}
      <PageTitle>
        어떤 장비를 <br />
        보관하고 싶으세요?
      </PageTitle>

      {/* 장비 선택 */}
      <div className="equipment-options" role="group" aria-label="장비 선택">
        <button
          type="button"
          className={`equipment-card ${selected === "snowboard" ? "selected" : ""}`}
          onClick={() => setSelected("snowboard")}
          aria-pressed={selected === "snowboard"}
        >
          <div className="equipment-img">
            <img src={snowBoard} alt="스노보드" />
          </div>
          <div className="equipment-text">
            <div className="equipment-title">스노보드</div>
            <div className="equipment-sub">프리스타일 · 해머 등</div>
          </div>
        </button>

        <button
          type="button"
          className={`equipment-card ${selected === "ski" ? "selected" : ""}`}
          onClick={() => setSelected("ski")}
          aria-pressed={selected === "ski"}
        >
          <div className="equipment-img">
            <img src={ski} alt="스키" />
          </div>
          <div className="equipment-text">
            <div className="equipment-title">스키</div>
            <div className="equipment-sub">프리스타일 등</div>
          </div>
        </button>
      </div>

      {/* CTA */}
      <div className="fixed-cta">
        <PrimaryButton
          onClick={goNext}
          disabled={!selected}
          active={!!selected}
        >
          다음
        </PrimaryButton>
      </div>
    </div>
  );
}
