// src/pages/Fail.jsx
import { useNavigate } from 'react-router-dom';

function Fail() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('message') || '결제가 실패했습니다.';
  const code = urlParams.get('code');

  return (
    <div>
      <h1>결제 실패</h1>
      <p>{message}</p>
      {code && <p>코드: {code}</p>}
      <button onClick={() => navigate('/payment')}>다시 시도</button>
    </div>
  );
}

export default Fail;