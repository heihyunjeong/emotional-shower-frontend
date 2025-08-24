import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// 공용 스타일/컴포넌트
import "../../assets/css/components/uiCommon.css";
import "../../assets/css/user/userPay.css";

import TopAreaSubPage from "../components/TopAreaSubPage";
import ProgressBar from "../components/ProgressBar";
import PageTitle from "../components/PageTitle";
import PrimaryButton from "../components/PrimaryButton";

// API 헬퍼 가져오기
import { paymentAPI } from "../../utils/apiHelper";

import backBut from "../../assets/img/backBut.png";
import xBut from "../../assets/img/xBut.png";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasProcessed = useRef(false); // 중복 처리 방지

  const goHome = () => navigate("/home");

  useEffect(() => {
    const confirmPayment = async () => {
      // 이미 처리된 경우 중복 실행 방지
      if (hasProcessed.current) {
        console.log('결제가 이미 처리되었습니다. 중복 실행을 방지합니다.');
        return;
      }
      try {
        const paymentKey = searchParams.get('paymentKey');
        const orderId = searchParams.get('orderId');
        const amount = searchParams.get('amount');

        if (!paymentKey || !orderId || !amount) {
          throw new Error('결제 정보가 올바르지 않습니다.');
        }

        // 처리 시작 표시
        hasProcessed.current = true;
        console.log('결제 승인 처리 중...', { paymentKey, orderId, amount });
        
        // 백엔드에 결제 성공 정보 전송
        const paymentSuccessData = {
          paymentKey,
          orderId,
          totalAmount: parseInt(amount),
          method: '카드',
          status: 'DONE',
          approvedAt: new Date().toISOString()
        };

        // 백엔드 API 호출
        const backendResponse = await paymentAPI.success(paymentSuccessData);
        
        if (!backendResponse.success) {
          throw new Error(backendResponse.message || '결제 처리 중 오류가 발생했습니다.');
        }

        console.log('✅ 백엔드 결제 처리 완료:', backendResponse);
        
        const mockData = {
          paymentKey,
          orderId,
          orderName: 'Borini 서비스 결제',
          method: '카드',
          totalAmount: parseInt(amount),
          status: 'DONE',
          approvedAt: new Date().toISOString(),
          paymentId: backendResponse.payment?.id, // 백엔드에서 받은 결제 ID
          receipt: {
            url: '#'
          }
        };
        
        console.log('결제 승인 완료:', mockData);
        setPaymentData(mockData);
        setLoading(false);
        return;

        // 프로덕션 환경에서는 실제 API 호출
        const apiUrl = process.env.NODE_ENV === 'development' 
          ? 'http://localhost:3001/api/toss/confirm'
          : '/api/toss/confirm';
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: parseInt(amount)
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || '결제 승인에 실패했습니다.');
        }

        const data = await response.json();
        setPaymentData(data);
        setLoading(false);
      } catch (error) {
        console.error('Payment confirmation error:', error);
        setError(error.message);
        // 에러 발생 시 처리 상태 초기화 (재시도 가능하도록)//
        hasProcessed.current = false;
        setLoading(false);
      }
    };

    confirmPayment();
  }, [searchParams]); // 의존성 배열에서 isProcessed 제거

  if (loading) {
    return (
      <div className="payment-container">
        <TopAreaSubPage onClose={goHome} closeIcon={xBut} />
        <ProgressBar width="100%" />
        <PageTitle>결제를<br/>확인하고 있습니다</PageTitle>
        <div className="frame pay-frame">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px',
            fontSize: '16px',
            color: '#666'
          }}>
            결제 승인을 처리하고 있습니다...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-container">
        <TopAreaSubPage onClose={goHome} closeIcon={xBut} />
        <ProgressBar width="100%" />
        <PageTitle>결제 실패</PageTitle>
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
          <PrimaryButton onClick={goHome} style={{ margin: '20px 16px' }}>
            홈으로 돌아가기
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      {/* 상단 공용 */}
      <TopAreaSubPage onClose={goHome} closeIcon={xBut} />
      <ProgressBar width="100%" />
      <PageTitle>결제가<br/>완료되었습니다</PageTitle>

      {/* 결제 완료 정보 */}
      <div className="frame pay-frame">
        {/* 성공 아이콘 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '20px 0'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#28a745',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '40px'
          }}>
            ✓
          </div>
        </div>

        {/* 결제 정보 */}
        <div className="payment-info" style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          margin: '16px',
          borderRadius: '12px',
          border: '1px solid #e9ecef'
        }}>
          <div className="info-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '14px', color: '#666' }}>주문번호</span>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>
              {paymentData?.orderId}
            </span>
          </div>
          
          <div className="info-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '14px', color: '#666' }}>결제방법</span>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>
              {paymentData?.method?.charAt(0).toUpperCase() + paymentData?.method?.slice(1)}
            </span>
          </div>

          <div className="info-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '14px', color: '#666' }}>상품명</span>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>
              {paymentData?.orderName}
            </span>
          </div>

          <div className="info-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '12px',
            borderTop: '1px solid #e9ecef'
          }}>
            <span style={{ fontSize: '16px', fontWeight: '700' }}>결제금액</span>
            <span style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              color: '#007bff' 
            }}>
              {paymentData?.totalAmount?.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* 결제 완료 메시지 */}
        <div style={{
          textAlign: 'center',
          padding: '20px',
          margin: '16px',
          backgroundColor: '#e8f5e8',
          borderRadius: '8px',
          border: '1px solid #c3e6c3'
        }}>
          <p style={{ 
            margin: '0 0 8px 0', 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#155724'
          }}>
            결제가 성공적으로 완료되었습니다!
          </p>
          <p style={{ 
            margin: '0', 
            fontSize: '14px', 
            color: '#155724'
          }}>
            Borini 서비스를 이용해 주셔서 감사합니다.
          </p>
        </div>
      </div>

      {/* 하단 고정 CTA */}
      <div className="fixed-cta">
        <PrimaryButton onClick={goHome} active={true}>
          홈으로 돌아가기
        </PrimaryButton>
      </div>
    </div>
  );
}
