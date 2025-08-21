// src/pages/Success.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL에서 쿼리 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const paymentKey = urlParams.get('paymentKey');
    const orderId = urlParams.get('orderId');
    const amount = urlParams.get('amount');

    if (!paymentKey || !orderId || !amount) {
      alert('결제 정보가 누락되었습니다.');
      navigate('/payment'); // 결제 페이지로 되돌아가기
      return;
    }

    // 백엔드로 결제 승인 요청
    fetch('/api/toss/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: parseInt(amount), // 문자열을 숫자로 변환
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('결제 승인 실패:', error);
        alert('결제 승인 중 오류가 발생했습니다.');
        navigate('/payment');
      });
  }, [navigate]);

  if (loading) {
    return <div>결제를 승인하는 중입니다...</div>;
  }

  return (
    <div>
      <h1>결제 성공!</h1>
      <p>결제가 완료되었습니다.</p>
      <pre>{JSON.stringify(result, null, 2)}</pre>
      <button onClick={() => navigate('/home')}>홈으로 가기</button>
    </div>
  );
}

export default Success;