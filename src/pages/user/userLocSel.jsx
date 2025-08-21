import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 공용 CSS
import "../../assets/css/components/uiCommon.css";
// 페이지 전용 CSS
import "../../assets/css/user/userLocSel.css";

import TopAreaSubPage from "../components/TopAreaSubPage";
import ProgressBar from "../components/ProgressBar";
import PageTitle from "../components/PageTitle";

import backBut from "../../assets/img/backBut.png";
import xBut from "../../assets/img/xBut.png";
import phoenix from "../../assets/img/phoenix.png";

export default function UserLocationSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null); // 'phoenix'

  const goBack = () => navigate("/storing/equipmentselection");
  const goHome = () => navigate("/home");
  const goNext = () => {
    if (!selected) return;
    navigate("/storing/planselection", { state: { location: selected } });
  };

  return (
    <div className="location-container">
      <TopAreaSubPage onBack={goBack} onClose={goHome} backIcon={backBut} closeIcon={xBut} />

      <ProgressBar width="120px" />

      <PageTitle>
        보관을 원하는 지역을
        <br />
        선택해주세요
      </PageTitle>

      {/* Region options */}
      <div className="location-options" role="group" aria-label="지역 선택">
        <button
          type="button"
          className={`region-card ${selected === "phoenix" ? "selected" : ""}`}
          onClick={() => setSelected("phoenix")}
          aria-pressed={selected === "phoenix"}
        >
          <div className="region-img">
            <img src={phoenix} alt="휘닉스파크 로고" />
          </div>
          <div className="region-label">평창 휘닉스파크</div>
        </button>
      </div>

      {/* CTA */}
      <button
        type="button"
        className={`location-cta ${selected ? "active" : ""}`}
        onClick={goNext}
        disabled={!selected}
        aria-disabled={!selected}
      >
        다음
      </button>
    </div>
  );
}
