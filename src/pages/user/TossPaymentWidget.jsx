import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// 공용 스타일/컴포넌트
import "../../assets/css/components/uiCommon.css";
import "../../assets/css/user/userPay.css";

import TopAreaSubPage from "../components/TopAreaSubPage";
import ProgressBar from "../components/ProgressBar";
import PageTitle from "../components/PageTitle";
import PrimaryButton from "../components/PrimaryButton";

import backBut from "../../assets/img/backBut.png";
import xBut from "../../assets/img/xBut.png";

// 토스페이먼트 클라이언트 키
const CLIENT_KEY = process.env.REACT_APP_TOSS_CLIENT_KEY || 'test_ck_GePWvyJnrKJn1WYnNPKqVgLzN97E';

export default function TossPaymentWidget() {
  const navigate = useNavigate();
  const location = useLocation();

  const [paymentWidget, setPaymentWidget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 결제 정보 (기본값 설정) - useMemo로 최적화
  const paymentInfo = useMemo(() => {
    return location.state?.paymentInfo || {
      amount: 100,
      orderId: `order_${Date.now()}`,
      orderName: 'Borini 서비스 결제',
      customerName: '고객',
      customerEmail: 'customer@example.com'
    };
  }, [location.state?.paymentInfo]);

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/home");

  useEffect(() => {
    const initializePaymentWidget = async () => {
      try {
        setLoading(true);
        
        // 토스페이먼트 SDK 동적 로드
        if (!window.TossPayments) {
          const script = document.createElement('script');
          script.src = 'https://js.tosspayments.com/v1/payment';
          script.async = true;
          document.head.appendChild(script);
          
          await new Promise((resolve, reject) => {
            script.onload = () => {
              console.log('✅ 토스페이먼트 SDK 로드 완료');
              resolve();
            };
            script.onerror = (error) => {
              console.error('❌ 토스페이먼트 SDK 로드 실패:', error);
              reject(error);
            };
          });
          
          // 스크립트 로드 후 잠시 대기
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // 토스페이먼트 객체 초기화
        if (window.TossPayments) {
          const tossPayments = window.TossPayments(CLIENT_KEY);
          console.log('✅ 토스페이먼트 객체 초기화 완료');
          console.log('🔍 TossPayments 객체:', tossPayments);
          console.log('🔍 사용 가능한 메서드:', Object.getOwnPropertyNames(tossPayments));
          setPaymentWidget(tossPayments);
        } else {
          throw new Error('토스페이먼트 SDK를 불러올 수 없습니다.');
        }
        
        setLoading(false);
        
      } catch (error) {
        console.error('결제위젯 초기화 실패:', error);
        setError('결제 시스템을 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };

    initializePaymentWidget();
  }, [paymentInfo]);

  const handlePayment = async () => {
    if (!paymentWidget) {
      setError('결제 시스템이 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      setLoading(true);
      
      const paymentData = {
        amount: paymentInfo.amount,
        orderId: paymentInfo.orderId,
        orderName: paymentInfo.orderName,
        customerName: paymentInfo.customerName,
        customerEmail: paymentInfo.customerEmail,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`
      };
      
      console.log('🚀 결제 요청 시작:', paymentData);
      console.log('🔍 paymentWidget 객체:', paymentWidget);
      console.log('🔍 사용 가능한 메서드들:', Object.getOwnPropertyNames(paymentWidget));
      
      // 토스페이먼트 결제 요청 - 실제 결제 페이지로 리다이렉트
      // 공식 문서에 따른 올바른 사용법
      const result = await paymentWidget.requestPayment('카드', {
        amount: paymentData.amount,
        orderId: paymentData.orderId,
        orderName: paymentData.orderName,
        customerName: paymentData.customerName,
        customerEmail: paymentData.customerEmail,
        successUrl: paymentData.successUrl,
        failUrl: paymentData.failUrl,
      });
      
      console.log('✅ 결제 요청 성공:', result);
      
      // 이 코드는 실행되지 않음 (리다이렉트되기 때문)
      console.log('🎉 결제 요청 완료');
      
    } catch (error) {
      console.error('결제 요청 실패:', error);
      setError(error.message || '결제 요청 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  if (loading && !paymentWidget) {
    return (
      <div className="payment-container">
        <TopAreaSubPage onBack={goBack} onClose={goHome} backIcon={backBut} closeIcon={xBut} />
        <ProgressBar width="100%" />
        <PageTitle>결제 정보를<br/>불러오는 중...</PageTitle>
        <div className="frame pay-frame">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px',
            fontSize: '16px',
            color: '#666'
          }}>
            결제 시스템을 준비하고 있습니다...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-container">
        <TopAreaSubPage onBack={goBack} onClose={goHome} backIcon={backBut} closeIcon={xBut} />
        <ProgressBar width="100%" />
        <PageTitle>결제 오류</PageTitle>
        <div className="frame pay-frame">
          <div className="error-message" style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '20px',
            margin: '16px',
            borderRadius: '8px',
            border: '1px solid #ffcdd2',
            textAlign: 'center'
          }}>
            {error}
          </div>
          <PrimaryButton onClick={goBack} style={{ margin: '20px 16px' }}>
            다시 시도
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      {/* 상단 공용 */}
      <TopAreaSubPage onBack={goBack} onClose={goHome} backIcon={backBut} closeIcon={xBut} />
      <ProgressBar width="100%" />
      <PageTitle>결제 정보를<br/>확인해주세요</PageTitle>

      {/* 결제 정보 표시 */}
      <div className="frame pay-frame">
        <div className="payment-info" style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          margin: '16px',
          borderRadius: '12px',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>결제 상품</span>
            <span style={{ fontSize: '16px', color: '#666' }}>{paymentInfo.orderName}</span>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingTop: '12px',
            borderTop: '1px solid #e9ecef'
          }}>
            <span style={{ fontSize: '18px', fontWeight: '700' }}>결제 금액</span>
            <span style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              color: '#007bff' 
            }}>
              {paymentInfo.amount.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* 결제 방법 선택 */}
        <div style={{ margin: '16px' }}>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e9ecef',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#333'
            }}>
              💳 카드 결제
            </div>
            <div style={{
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.5'
            }}>
              신용카드 또는 체크카드로 안전하게 결제하세요.<br/>
              토스페이먼트의 보안 시스템으로 보호됩니다.
            </div>
          </div>
        </div>

        {/* 이용약관 동의 */}
        <div style={{ margin: '16px' }}>
          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #bbdefb'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              color: '#1565c0',
              cursor: 'pointer'
            }}>
              <input 
                type="checkbox" 
                defaultChecked 
                style={{ marginRight: '8px' }}
              />
              결제 서비스 이용약관에 동의합니다.
            </label>
          </div>
        </div>
      </div>

      {/* 하단 고정 CTA */}
      <div className="fixed-cta">
        <PrimaryButton 
          onClick={handlePayment} 
          disabled={loading}
          active={!loading}
        >
          {loading ? '처리 중...' : `${paymentInfo.amount.toLocaleString()}원 결제하기`}
        </PrimaryButton>
      </div>
    </div>
  );
}
