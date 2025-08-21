// Onboarding.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/css/user/usermain.css";
import "../assets/css/onboarding.css";

import on_1 from "../assets/img/on_1.png";
import on_2 from "../assets/img/on_2.png";
import on_3 from "../assets/img/on_3.png";

const slides = [
  {
    id: 1,
    title: "집에 방치된 장비,\n전문가한테 맡기세요",
    description: "소중한 장비를 안전하게,\n체계적으로 관리해드립니다.",
    slideImage: on_1,
  },
  {
    id: 2,
    title: "장비 상태,\n직접 확인하세요",
    description: "점검 리포트로 안전 지수부터\n수명가이드까지 다 알려드려요.",
    slideImage: on_2,
  },
  {
    id: 3,
    title: "시즌 준비 끝!\n몸만 오세요",
    description: "무거운 장비 없이 떠나는 여정,\n사람도 장비도 편하게 쉬고 만나요.",
    slideImage: on_3,
  },
];

function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((v) => v + 1);
    } else {
      navigate("/easylogin");
    }
  };

  const { title, description, slideImage } = slides[currentSlide];

  return (
    <div className="u-mobile-root o-screen" role="region" aria-label="Onboarding">
      <div className="u-mobile-page o-container">
        {/* 이미지 영역: 현재 슬라이드의 이미지를 250x250px로 표시 */}
        <div className="o-image" aria-hidden="true">
          <img 
            src={slideImage} 
            alt={`Onboarding step ${currentSlide + 1}`} 
            className="o-slide-image"
          />
        </div>

        {/* 텍스트 블록 */}
        <div className="o-text">
          <h1 className="o-title">{title}</h1>
          <p className="o-subtitle">{description}</p>
        </div>

        {/* 페이지네이션 */}
        <div className="o-indicator" role="tablist" aria-label="Onboarding progress">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`o-dot ${i === currentSlide ? "o-active" : ""}`}
              role="tab"
              aria-selected={i === currentSlide}
            />
          ))}
        </div>

        {/* CTA 버튼 */}
        <div className="o-button-wrap">
          <button onClick={handleNext} className="o-start-btn">
            <span className="o-start-btn-text">시작하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;