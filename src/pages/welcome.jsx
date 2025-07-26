import React, { useState } from 'react';
// Placeholder CSS import (you can replace with actual CSS file later)
import '../assets/css/welcome.css';

const slides = [
  {
    key: 'logo',
    logo: 'https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png', // Placeholder logo
    title: '',
    description: '',
    buttonText: ''
  },
  {
    key: 'slide2',
    image: 'https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png', // Placeholder slide image
    title: '집에 방치 말고, 전문가한테 맡기세요',
    description: '본인이는 단순 분만이 아니에요. 장비를 안전하게, 전문가 손으로 제대로 분만해요.',
    buttonText: '다음'
  },
  {
    key: 'slide3',
    image: 'https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png',
    title: '장비 상태? 직접 확인하세요',
    description: '분만 전 점검은 기본! 장비 리포트로 안전 상태부터 수명예측까지 다 알려드려요.',
    buttonText: '다음'
  },
  {
    key: 'slide4',
    image: 'https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png',
    title: '시즌 시작, 몸만 오세요!',
    description: '무거운 장비 들여 놓기는 이제 그만 :) 사전대여, 장비는 편하게 쉬고 다녀요.',
    buttonText: '시작하기'
  }
];

export default function Onboarding({ onFinish, onSkip }) {
  const [current, setCurrent] = useState(0);

  const goNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onFinish && onFinish();
    }
  };

  const handleSkip = () => {
    onSkip && onSkip();
  };

  const { logo, image, title, description, buttonText } = slides[current];

  return (
    <div className="onboarding-container">
      {/* Skip link */}
      <button className="onboarding-skip" onClick={handleSkip}>
        skip&gt;&gt;
      </button>

      {/* Slide content */}
      <div className="onboarding-slide">
        {current === 0 && logo && (
          <img src={logo} alt="Logo" className="onboarding-logo" />
        )}
        {title && <h1 className="onboarding-title">{title}</h1>}
        {description && <p className="onboarding-desc">{description}</p>}
        {current > 0 && image && (
          <img src={image} alt={`Slide ${current + 1}`} className="onboarding-image" />
        )}
      </div>

      {/* Dots indicator */}
      <div className="onboarding-dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`onboarding-dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>

      {/* Next/Start button */}
      <button className="onboarding-button" onClick={goNext}>
        {buttonText}
      </button>
    </div>
  );
}
