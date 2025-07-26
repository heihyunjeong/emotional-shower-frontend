import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/onboarding.css';

const slides = [
  {
    id: 1,
    title: '집에 방치 말고, 전문가한테 맡기세요',
    description: '장비를 안전하게, 전문가 손으로 제대로 보관해요.',
  },
  {
    id: 2,
    title: '장비 상태, 직접 확인하세요',
    description: '장비 리포트로 안전 상태부터 수명가이드까지 다 알려드려요.',
  },
  {
    id: 3,
    title: '시즌 시작! 몸만 오세요',
    description: '무거운 장비 없이 떠나는 여정, 사람도 장비도 편하게 쉬고 만나요.',
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/easylogin');
    }
  };

  const { title, description } = slides[currentSlide];

  return (
    <div className="onboarding-container">
      {/* Image Placeholder */}
      <div className="image-placeholder">
        <div className="image-label">
          IMG영역
          <br />
          240*240
        </div>
      </div>

      {/* Text */}
      <div className="text-group">
        <h1 className="main-title">
          {title.split(' ').map((word, i) => (
            <span key={i}>
              {word}
              {i % 3 === 2 ? <br /> : ' '}
            </span>
          ))}
        </h1>
        <p className="sub-title">
          {description.split(' ').map((word, i) => (
            <span key={i}>
              {word}
              {i % 4 === 3 ? <br /> : ' '}
            </span>
          ))}
        </p>
      </div>

      {/* Pagination */}
      <div className="indicator">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`dot ${i === currentSlide ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Button */}
      <div className="button-wrapper">
        <button onClick={handleNext} className="start-button">
          <span className="start-button-text">시작하기</span>
        </button>
      </div>
    </div>
  );
}
