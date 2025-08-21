// src/pages/userHome.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// 공통 스타일
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
// 페이지 전용 스타일
import "../../assets/css/user/userHome.css";

// (선택) 에셋 예시 — 실제 경로에 맞게 교체하세요.
import logo from "../../assets/img/logo.png";
import achiv1 from "../../assets/img/4_1_1.png";


import UserNav from "./userNav"; // 또는 "./userNav" 파일명에 맞춰서

const STATES = [
  { id: 1,  title: ["김보린님", " 아직 \n보관 중인 장비가 없어요!"], 
    description: "소중한 장비, 전문가 손에 맡기고\n편안한 취미라이프를 시작해볼까요?", hasImage: true,  chip: true },

  { id: 2,  title: ["신청 내역 확인", " 후\n 연락드릴게요!"],      
    description: "수거 일정 조율을 위해 연락 드릴 예정이니,\n메시지를 꼭 확인해주세요 :)",               hasImage: true,  chip: true },

  { id: 3,  title: ["수거 일정", "이 확정되어 \n 픽업 예정이에요"],     
    description: "수거일 : 2025년 10월 12일\n일정 조율이 필요하시면 언제든지 톡 주세요!",   hasImage: false, chip: true },

  { id: 4,  title: ["장비 수거 ", "완료!\n 무사히 받았어요"],        
    description: "지금 꼼꼼하게 점검 중이에요.\n끝나면 바로 ‘내 장비’탭에서 확인하실 수 있어요.", hasImage: false, chip: true },

  { id: 5,  title: ["점검 완료!\n", "레포트를 확인해보세요"],        
    description: "점검 결과가 등록됐어요.\n내 장비 탭에서 확인해보세요.",                    hasImage: false, chip: true },

  { id: 6,  title: ["임시 보관소에서 쉬는중!\n곧 ", "보관소로 이동", "해요"], 
    description: "보관소로 이동하기 전까지는 임시 보관소에서 \n안전하게 쉬고 있으니 걱정 마세요!",        hasImage: true,  chip: true },

  { id: 7,  title: ["조심조심!\n", "보관소로 달리는 중!"],            
    description: "보관 장소로 안전하게 이동 중입니다.\n도착하면 바로 알려드릴게요 :)",             hasImage: false, chip: true },

  { id: 8,  title: ["장비를 전용 랙에\n", "안전하게 보관중", "이에요!"], 
    description: "시즌이 가까워지면 장비 꺼내기 버튼으로\n바로 꺼내 쓸 수 있어요!",                   hasImage: false, chip: true },

  { id: 9, title: ["장비 꺼내기 신청 완료!\n", "즐거운 라이딩 되세요"],  
    description: "장비 출고 신청이 정상 처리되었어요.\n시즌 동안 안전하게, 마음껏 즐겨보세요!",       hasImage: true,  chip: true },

  { id: 10, title: ["장비 귀가 완료!\n", "다시 보관소에 들어갔어요"],   
    description: "자유 플랜인 경우 \n시즌 중에 다시 꺼내 쓰실 수 있어요!",                 hasImage: false, chip: true },

];

const CHIP_LABEL = {
  1: "신청 전", 2: "확인 중", 3: "픽업 예정", 4: "수거 완료", 5: "점검 완료",
  6: "임시 보관", 7: "이동 중", 8: "보관 중", 9: "보관 중", 10: "출고 신청", 11: "보관 복귀",
};

function renderWithBreaks(text) {
  const parts = text.split("\n");
  return parts.map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < parts.length - 1 && <br />}
    </React.Fragment>
  ));
}

function renderTitle(parts) {
  return parts.map((part, idx) => (
    <span key={idx} className={idx === 1 ? "uh-em" : "uh-span"}>
      {renderWithBreaks(part)}
    </span>
  ));
}

export default function UserHome() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);

  const data = STATES[idx];
  const chipText = useMemo(() => (data.chip ? (CHIP_LABEL[data.id] || "진행 중") : ""), [data]);

  // ✅ UserNav에서 넘어오는 키에 맞춰 라우팅
  const handleNav = (key) => {
    if (key === "home") return; // 현재 페이지
    if (key === "myequipment") navigate("/equipment");
    if (key === "mypage") navigate("/mypage");
  };

  return (
    <div className="app-container">
      <div className="u-mobile-root">
        <div className="u-mobile-page uh-page">
          {/* 헤더 로고 */}
          <header className="uh-header">
            <img src={logo} alt="BORINI" className="uh-logo" />
          </header>

          {/* 히어로 배경 + 이미지 */}
          <section className="uh-hero" aria-hidden="true">
            <div className="uh-ellipse uh-ellipse--white" />
            <div className="uh-ellipse uh-ellipse--grey" />
            {data.hasImage && <img className="uh-hero-img" src={achiv1} alt="" />}
          </section>

          {/* 메인 텍스트 + 칩 */}
          <section className="uh-text-chip">
            <h1 className="uh-title">{renderTitle(data.title)}</h1>
            <p className="uh-desc">{renderWithBreaks(data.description)}</p>

            {data.chip && (
              <div className="uh-chip">
                <span className="uh-chip-dot" />
                <span className="uh-chip-text">{chipText}</span>
              </div>
            )}
          </section>

          {/* 카드 액션들 */}
          <section className="uh-cards">
            <button
              type="button"
              className="uh-card"
              onClick={() => navigate("/storing/equipmentselection")}
            >
              <div className="uh-card-icon" />
              <div className="uh-card-txt">
                <div className="uh-card-title">새 장비 등록</div>
                <div className="uh-card-desc">1개 장비 보관중</div>
              </div>
            </button>

            <button
              type="button"
              className="uh-card"
              onClick={() => navigate("/equipment/checkout/warning")}
            >
              <div className="uh-card-icon" />
              <div className="uh-card-txt">
                <div className="uh-card-title">장비 꺼내기</div>
                <div className="uh-card-desc">스노보드, 휘닉스파크</div>
              </div>
            </button>
          </section>

          {/* ✅ 하단 내비게이션 교체 */}
          <UserNav active="home" onNavigate={handleNav} />

          {/* 개발용 상태 전환 컨트롤 (원하면 삭제) */}
          {/*<div className="uh-dev">
            <button onClick={() => setIdx((v) => Math.max(0, v - 1))}>이전</button>
            <span className="uh-dev-count">{idx + 1} / {STATES.length}</span>
            <button onClick={() => setIdx((v) => Math.min(STATES.length - 1, v + 1))}>다음</button>
          </div>*/}
        </div>
      </div>
    </div>
  );
}
