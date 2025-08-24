import React, { useRef } from 'react';
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

export default function PaymentFail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasReported = useRef(false); // 중복 처리 방지
  
  const errorCode = searchParams.get('code');
  const errorMessage = searchParams.get('message');
  const orderId = searchParams.get('orderId');

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/home");
  const retryPayment = () => navigate("/user/payment");

  // 컴포넌트 마운트 시 백엔드에 결제 실패 정보 전송
  React.useEffect(() => {
    const reportPaymentFailure = async () => {
      // 이미 보고된 경우 중복 실행 방지
      if (hasReported.current) {
        console.log('결제 실패가 이미 보고되었습니다. 중복 실행을 방지합니다.');
        return;
      }

      if (orderId && errorCode) {
        hasReported.current = true;
        try {
          const failData = {
            orderId,
            code: errorCode,
            message: errorMessage || '결제 실패'
          };

          console.log('결제 실패 정보를 백엔드에 전송:', failData);
          await paymentAPI.fail(failData);
          console.log('✅ 백엔드 결제 실패 처리 완료');
        } catch (error) {
          console.error('❌ 백엔드 결제 실패 처리 오류:', error);
          // 에러 발생 시 보고 상태 초기화 (재시도 가능하도록)
          hasReported.current = false;
        }
      }
    };

    reportPaymentFailure();
  }, [orderId, errorCode, errorMessage]);

  // 에러 코드에 따른 메시지 매핑
  const getErrorMessage = (code, message) => {
    const errorMessages = {
      'PAY_PROCESS_CANCELED': '사용자가 결제를 취소했습니다.',
      'PAY_PROCESS_ABORTED': '결제 진행 중 오류가 발생했습니다.',
      'REJECT_CARD_COMPANY': '카드사에서 결제를 거절했습니다.',
      'INSUFFICIENT_FUNDS': '잔액이 부족합니다.',
      'INVALID_CARD_EXPIRATION': '카드 유효기간이 만료되었습니다.',
      'INVALID_STOPPED_CARD': '정지된 카드입니다.',
      'EXCEED_MAX_DAILY_PAYMENT_COUNT': '일일 결제 한도를 초과했습니다.',
      'NOT_SUPPORTED_INSTALLMENT_PLAN_CARD_OR_MERCHANT': '할부가 지원되지 않는 카드이거나 가맹점입니다.',
      'INVALID_CARD_INSTALLMENT_PLAN': '유효하지 않은 할부 개월수입니다.',
      'NOT_SUPPORTED_MONTHLY_INSTALLMENT_PLAN': '지원되지 않는 할부 개월수입니다.',
      'EXCEED_MAX_PAYMENT_AMOUNT': '결제 가능 금액을 초과했습니다.',
      'INVALID_AUTHORIZE_AUTH': '유효하지 않은 인증입니다.',
      'INVALID_CARD_LOST_OR_STOLEN': '분실 혹은 도난 카드입니다.',
      'RESTRICTED_TRANSFER_ACCOUNT': '계좌는 이체 제한 상태입니다.',
      'INVALID_ACCOUNT_INFO_RE_REGISTER': '유효하지 않은 계좌입니다. 계좌를 다시 등록해 주세요.',
      'NOT_AVAILABLE_BANK': '은행 서비스 시간이 아닙니다.',
      'INVALID_PASSWORD': '결제 비밀번호가 일치하지 않습니다.',
      'INCORRECT_BASIC_AUTH_FORMAT': '잘못된 요청입니다.',
      'FDS_ERROR': '위험 거래로 분류되어 결제가 제한되었습니다.'
    };

    return errorMessages[code] || message || '결제 처리 중 오류가 발생했습니다.';
  };

  return (
    <div className="payment-container">
      {/* 상단 공용 */}
      <TopAreaSubPage onBack={goBack} onClose={goHome} backIcon={backBut} closeIcon={xBut} />
      <ProgressBar width="100%" />
      <PageTitle>결제에<br/>실패했습니다</PageTitle>

      {/* 결제 실패 정보 */}
      <div className="frame pay-frame">
        {/* 실패 아이콘 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '20px 0'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#dc3545',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '40px'
          }}>
            ✕
          </div>
        </div>

        {/* 에러 메시지 */}
        <div className="error-message" style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '20px',
          margin: '16px',
          borderRadius: '12px',
          border: '1px solid #ffcdd2',
          textAlign: 'center'
        }}>
          <p style={{ 
            margin: '0 0 12px 0', 
            fontSize: '16px', 
            fontWeight: '600'
          }}>
            {getErrorMessage(errorCode, errorMessage)}
          </p>
          {orderId && (
            <p style={{ 
              margin: '0', 
              fontSize: '14px', 
              color: '#666'
            }}>
              주문번호: {orderId}
            </p>
          )}
        </div>

        {/* 실패 사유별 안내 */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          margin: '16px',
          borderRadius: '12px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ 
            margin: '0 0 12px 0', 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#333'
          }}>
            결제 실패 시 확인사항
          </h4>
          <ul style={{ 
            margin: '0', 
            paddingLeft: '20px',
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.6'
          }}>
            <li>카드 유효기간 및 정보를 확인해 주세요</li>
            <li>결제 한도를 확인해 주세요</li>
            <li>인터넷 연결 상태를 확인해 주세요</li>
            <li>다른 결제 수단을 이용해 보세요</li>
          </ul>
        </div>

        {/* 고객센터 안내 */}
        <div style={{
          textAlign: 'center',
          padding: '16px',
          margin: '16px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '1px solid #bbdefb'
        }}>
          <p style={{ 
            margin: '0 0 8px 0', 
            fontSize: '14px', 
            color: '#1565c0'
          }}>
            문제가 지속되면 고객센터로 문의해 주세요
          </p>
          <p style={{ 
            margin: '0', 
            fontSize: '16px', 
            fontWeight: '600',
            color: '#1565c0'
          }}>
            📞 1588-0000
          </p>
        </div>
      </div>

      {/* 하단 고정 CTA */}
      <div className="fixed-cta" style={{ display: 'flex', gap: '8px', padding: '16px' }}>
        <PrimaryButton 
          onClick={retryPayment} 
          active={true}
          style={{ flex: 1 }}
        >
          다시 결제하기
        </PrimaryButton>
        <button
          onClick={goHome}
          style={{
            flex: 1,
            padding: '16px',
            border: '1px solid #007bff',
            backgroundColor: 'white',
            color: '#007bff',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
}
