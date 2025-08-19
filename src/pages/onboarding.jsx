import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/css/user/usermain.css";
import "../assets/css/onboarding.css";

const slides = [
  {
    id: 1,
    title: "집에 방치 말고,\n전문가한테 맡기세요",
    description: "장비를 안전하게,\n전문가 손으로 제대로 보관해요.",
  },
  {
    id: 2,
    title: "장비 상태,\n직접 확인하세요",
    description: "장비 리포트로 안전 상태부터\n수명가이드까지 다 알려드려요.",
  },
  {
    id: 3,
    title: "시즌 시작!\n몸만 오세요",
    description: "무거운 장비 없이 떠나는 여정,\n사람도 장비도 편하게 쉬고 만나요.",
  },
];

function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide((v) => v + 1);
    else navigate("/easylogin");
  };

  const { title, description } = slides[currentSlide];

  return (
    <div className="u-mobile-root o-screen" role="region" aria-label="Onboarding">
      <div className="u-mobile-page o-container">
        {/* IMG placeholder (240x240 @ top:148) */}
        <div className="o-image" aria-hidden="true">
          <div className="o-image-label">
            IMG영역
            <br />
            240*240
          </div>
        </div>

        {/* Text block with fixed line breaks from slides */}
        <div className="o-text">
          <h1 className="o-title">{title}</h1>
          <p className="o-subtitle">{description}</p>
        </div>

        {/* Pagination */}
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

        {/* CTA */}
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
