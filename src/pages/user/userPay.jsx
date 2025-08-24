import React, { useState, useEffect, useRef } from 'react';
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

// 카카오 로그인 사용자 정보 가져오기
import { getUserSession } from "../../utils/kakaoAuth";

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
  const isProcessing = useRef(false); // 중복 처리 방지

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
      // 로그인한 사용자 정보 가져오기
      const session = getUserSession();
      const user = session?.user;

      // orderId 생성 (백엔드에서 transactionId로 사용됨)
      const orderId = `order_${Date.now()}`;

      // 더 상세한 결제 정보 구성
      const paymentData = {
        paymentMethod,
        amount,
        description: `${description} (주문번호: ${orderId})`,
        // 추가 결제 정보
        orderId: orderId,
        orderName: description,
        customerName: user?.nickname || '고객',
        customerEmail: user?.email || 'customer@example.com',
        customerKey: user?.id ? `customer_${user.id}` : `customer_${Date.now()}`,
        userId: user?.id || null, // 카카오 사용자 ID
        timestamp: new Date().toISOString(),
        // 결제 상세 정보
        paymentType: 'SERVICE', // 서비스 결제
        serviceType: 'BORINI_STORAGE', // 보관 서비스
        currency: 'KRW' // 원화
      };

      console.log('Creating payment with data:', paymentData);
      const data = await paymentAPI.create(paymentData);

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

    // 중복 처리 방지
    if (isProcessing.current) {
      console.log('결제가 이미 처리 중입니다. 중복 실행을 방지합니다.');
      return;
    }

    isProcessing.current = true;
    setLoading(true);
    setError(null);

    try {
      // 토스페이 선택 시 토스 결제 위젯 페이지로 이동
      if (selected === "tosspay") {
        console.log('Creating Toss payment record and navigating to widget...');
        
        // 1. 먼저 데이터베이스에 결제 정보 저장
        const createResult = await createPayment(selected, 100, 'Borini 서비스 결제 (토스페이)');
        
        if (!createResult.success) {
          throw new Error(createResult.message);
        }

        const paymentId = createResult.payment.id;
        const transactionId = createResult.payment.transactionId; // 백엔드에서 생성된 transactionId
        console.log('Toss payment created with ID:', paymentId, 'TransactionId:', transactionId);

        // 로그인한 사용자 정보 가져오기
        const session = getUserSession();
        const user = session?.user;
        
        // 2. 토스 결제 위젯으로 이동 (결제 ID 포함)
        navigate("/user/toss-payment", { 
          state: { 
            paymentInfo: {
              paymentId: paymentId, // 데이터베이스에 저장된 결제 ID
              amount: 100,
              orderId: transactionId, // 백엔드에서 생성된 transactionId 사용
              orderName: 'Borini 서비스 결제',
              customerName: user?.nickname || '고객',
              customerEmail: user?.email || 'customer@example.com',
              customerKey: user?.id ? `customer_${user.id}` : `customer_${Date.now()}`
            }
          } 
        });
        setLoading(false); // 로딩 상태 해제
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

      // 3. 결제 상태를 완료로 업데이트
      console.log('Updating payment status to completed...');
      try {
        await paymentAPI.updateStatus(paymentId, 'COMPLETED');
        console.log('Payment status updated to COMPLETED');
      } catch (statusError) {
        console.warn('Failed to update payment status:', statusError);
        // 상태 업데이트 실패해도 결제 완료 페이지로 이동
      }

      // 4. 완료 페이지로 이동
      console.log('Payment completed, navigating to success page...');
      navigate("/storing/paymentcomplete", { 
        state: { 
          paymentInfo: {
            ...processResult.payment,
            paymentId: paymentId,
            status: 'COMPLETED'
          },
          paymentMethod: selected 
        } 
      });

    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || '결제 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      isProcessing.current = false; // 처리 완료 후 초기화
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