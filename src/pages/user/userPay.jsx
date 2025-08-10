import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userPay.css';

export default function UserPayment() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleSelect = (method) => {
    setSelected(method);
  };

  const handlePay = () => {
    if (selected) {
      // 예: 결제 처리 후 완료 페이지로 이동
      navigate('/payment/complete');
    }
  };

  return (
    <div className="payment-container">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-bg" />
        <div className="progress-fill" />
      </div>

      {/* Frame */}
      <div className="payment-frame">
        {/* Title */}
        <div className="section-title">
          결제 방식을 선택해주세요
        </div>

        {/* Methods */}
        <div className="payment-methods">
          {['npay', 'kakaopay', 'tosspay', 'payco', 'virtual', 'mobile', 'card'].map((method) => (
            <div
              key={method}
              className={`method-card ${selected === method ? 'selected' : ''}`}
              onClick={() => handleSelect(method)}
            >
              <div className={`method-logo ${method}`} />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        className={`cta-button ${selected ? 'active' : ''}`}
        onClick={handlePay}
      >
        결제하기
      </button>
    </div>
);
}
