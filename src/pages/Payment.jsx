// src/pages/Payment.jsx
import { useEffect } from "react";

function PaymentPage() {
  useEffect(() => {
    // =========================================================================
    // ⚠️ 강제 리다이렉트 설정: 무조건 3초 후 /storing/paymentcomplete 로 이동
    // → 기존 success/fail 로직 무시됨 (테스트용)
    // → 실제 결제 완료 후 갈 주소: /success
    // → 실패 시 갈 주소: /fail
    // BUT: 지금은 무조건 /storing/paymentcomplete 로만 감
    // =========================================================================
    const forceRedirect = setTimeout(() => {
      console.log("✅ 3초 경과: 강제 리다이렉트 시작");
      window.location.href = "/storing/paymentcomplete";
    }, 3000); // 3초

    // 아래는 UI 표시용으로 토스 위젯은 로딩하지만, 결과는 무시됨

    const script = document.createElement("script");
    script.src = "https://js.tosspayments.com/v1/payment-widget";
    script.async = true;

    // 토스 스크립트 로딩 성공 → 결제 요청 시도
    script.onload = () => {
      console.log("✅ 토스 스크립트 로딩 완료");

      if (typeof window.TossPayments !== "function") {
        console.error("❌ TossPayments is not available");
        // 원래는 여기서 window.location.href = "/fail";
        return;
      }

      const paymentWidget = window.TossPayments("test_ck_GePWvyJnrKJn1WYnNPKqVgLzN97E");

      if (typeof paymentWidget.renderPaymentMethods === "function") {
        // 결제 UI 렌더링 (사용자에게 보이기 위함)
        paymentWidget.renderPaymentMethods("#payment-method", 10000);

        // 결제 요청 → 성공/실패 시 각각 /success 또는 /fail 로 감
        // BUT: 위의 3초 타이머가 먼저 실행되면 이 로직은 무시됨
        paymentWidget
          .requestPayment({
            amount: 10000,
            orderId: "ORDER_ID_" + new Date().getTime(),
            orderName: "테스트 결제",
            customerName: "홍길동",
            successUrl: window.location.origin + "/success",     // 🟡 실제 성공 시
            failUrl: window.location.origin + "/fail",           // 🟡 실제 실패 시
          })
          .then(() => {
            console.log("✅ 결제 요청 성공 (실제 완료 아님)");
            // 원래는 성공 시 successUrl 로 이동
          })
          .catch((err) => {
            console.error("❌ 결제 요청 실패:", err);
            // 원래는 window.location.href = "/fail";
          });
      } else {
        console.error("❌ renderPaymentMethods 메서드가 존재하지 않습니다.");
        // 원래는 window.location.href = "/fail";
      }
    };

    script.onerror = () => {
      console.error("❌ 토스 스크립트 로딩 실패");
      // 원래는 window.location.href = "/fail";
    };

    document.body.appendChild(script);

    // 클린업: 컴포넌트 언마운트 시 스크립트 제거 (메모리 누수 방지)
    return () => {
      document.body.removeChild(script);
      clearTimeout(forceRedirect); // 타이머 정리
    };
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        fontFamily: "sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <h2>결제 진행 중...</h2>
      <p style={{ color: "#666", marginTop: "10px" }}>
        3초 후 자동으로 완료 페이지로 이동합니다.
      </p>
      <div
        id="payment-method"
        style={{
          marginTop: "30px",
          width: "100%",
          maxWidth: "400px",
          border: "1px solid #eee",
          borderRadius: "12px",
          padding: "16px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        {/* 토스 결제 위젯이 여기에 렌더링됨 (시각적 목적) */}
      </div>
    </div>
  );
}

export default PaymentPage;