import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 공용 스타일/컴포넌트
import "../../assets/css/components/uiCommon.css";
import "../../assets/css/user/userPay.css";

import TopAreaSubPage from "../components/TopAreaSubPage";
import ProgressBar from "../components/ProgressBar";
import PageTitle from "../components/PageTitle";
import PrimaryButton from "../components/PrimaryButton";

// API 헬퍼 가져오기
import { paymentAPI, setTestToken, checkTokenStatus } from "../../utils/apiHelper";

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

// API_BASE_URL은 이제 config/api.js에서 관리됩니다

export default function UserPayment() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 테스트 토큰 설정
  useEffect(() => {
    // 토큰이 없으면 테스트 토큰 설정
    if (!checkTokenStatus()) {
      console.log('토큰이 없어서 테스트 토큰을 설정합니다.');
      setTestToken();
    }
  }, []);

  const handleSelect = (id) => {
    setSelected(id);
    setError(null); // 에러 메시지 초기화
  };

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/home");

  // 결제 생성 API 호출
  const createPayment = async (paymentMethod, amount = 100, description = "Borini 서비스 결제") => {
    try {
      const data = await paymentAPI.create({
        paymentMethod,
        amount,
        description
      });

      return data;
    } catch (error) {
      console.error('Payment creation error:', error);
      throw error;
    }
  };

  // 결제 처리 API 호출
  const processPayment = async (paymentId) => {
    try {
      const data = await paymentAPI.process(paymentId);
      return data;
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  };

  const handlePay = async () => {
    if (!selected) return;

    setLoading(true);
    setError(null);

    try {
      // 토스페이 선택 시 토스 결제 위젯 페이지로 이동
      if (selected === "tosspay") {
        console.log('Navigating to Toss payment widget...');
        navigate("/user/toss-payment", { 
          state: { 
            paymentInfo: {
              amount: 100,
              orderId: `order_${Date.now()}`,
              orderName: 'Borini 서비스 결제',
              customerName: '고객',
              customerEmail: 'customer@example.com',
              customerKey: `customer_${Date.now()}`
            }
          } 
        });
        return;
      }

      // 다른 결제 수단들은 기존 로직 유지
      // 1. 결제 생성
      console.log('Creating payment for method:', selected);
      const createResult = await createPayment(selected);
      
      if (!createResult.success) {
        throw new Error(createResult.message);
      }

      const paymentId = createResult.payment.id;
      console.log('Payment created with ID:', paymentId);

      // 2. 결제 처리
      console.log('Processing payment...');
      const processResult = await processPayment(paymentId);

      if (!processResult.success) {
        throw new Error(processResult.message);
      }

      // 3. 완료 페이지로 이동
      console.log('Payment completed, navigating to success page...');
      navigate("/storing/paymentcomplete", { 
        state: { 
          paymentInfo: processResult.payment,
          paymentMethod: selected 
        } 
      });

    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || '결제 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      {/* 상단 공용 */}
      <TopAreaSubPage onBack={goBack} onClose={goHome} backIcon={backBut} closeIcon={xBut} />
      <ProgressBar width="100%" />
      <PageTitle>결제 방식을<br/>선택해주세요</PageTitle>

      {/* 에러 메시지 표시 */}
      {error && (
        <div className="error-message" style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '12px',
          margin: '16px',
          borderRadius: '8px',
          border: '1px solid #ffcdd2'
        }}>
          {error}
        </div>
      )}

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
                aria-selected={isSelected}
                disabled={loading}
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
        <PrimaryButton 
          onClick={handlePay} 
          disabled={!selected || loading} 
          active={!!selected && !loading}
        >
          {loading ? '처리 중...' : '결제하기'}
        </PrimaryButton>
      </div>
    </div>
  );
}