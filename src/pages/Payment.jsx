// src/pages/Payment.jsx
import { useEffect } from 'react';

function PaymentPage() {
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://js.tosspayments.com/v1/payment-widget';
  script.async = true;

  script.onload = () => {
    // 1. TossPayments 함수가 존재하는지 확인
    console.log('window.TossPayments 존재 여부:', typeof window.TossPayments);

    // 2. 클라이언트 키로 paymentWidget 생성
    const paymentWidget = window.TossPayments('test_ck_GePWvyJnrKJn1WYnNPKqVgLzN97E');
    console.log('paymentWidget 객체:', paymentWidget);

    // 3. renderPaymentMethods 메서드가 존재하는지 확인
    console.log('renderPaymentMethods 메서드 존재 여부:', typeof paymentWidget.renderPaymentMethods);

    // 4. 메서드 존재 여부 확인 후 실행
    if (typeof paymentWidget.renderPaymentMethods === 'function') {
      paymentWidget.renderPaymentMethods('#payment-method', 10000);
      paymentWidget.requestPayment({
        // ... 나머지 코드 ...
      });
    } else {
      console.error('❌ renderPaymentMethods 메서드가 존재하지 않습니다. 스크립트 로딩이 완전히 되지 않았거나, 클라이언트 키가 잘못되었습니다.');
    }
  };

  script.onerror = () => {
    console.error('❌ 토스 스크립트 로딩 실패');
  };

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);

  return <div id="payment-method"></div>;
}

export default PaymentPage;