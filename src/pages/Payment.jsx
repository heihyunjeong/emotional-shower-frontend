// src/pages/Payment.jsx
import { useEffect } from 'react';

function PaymentPage() {
  useEffect(() => {
    // 토스 결제 위젯 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1/payment-widget';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // 본인의 클라이언트 키로 교체하세요 (예: 'test_ck_...')
      const paymentWidget = window.TossPayments('test_ck_GePWvyJnrKJn1WYnNPKqVgLzN97E');

      // 결제 수단 렌더링 (가격은 예시)
      paymentWidget.renderPaymentMethods('#payment-method', 10000);

      // 결제 요청
      paymentWidget.requestPayment({
        orderId: 'ORDER-123', // 고유한 주문 ID
        orderName: '결제 테스트 상품',
        customerName: '홍길동',
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    };

    // 컴포넌트 언마운트 시 스크립트 제거 (중복 로드 방지)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="payment-method"></div>;
}

export default PaymentPage;