# API 설정 및 사용법

이 프로젝트에서는 API URL과 관련 설정을 중앙에서 관리하기 위해 설정 파일을 사용합니다.

## 파일 구조

```
src/
├── config/
│   ├── api.js          # API 설정 및 기본 함수
│   └── README.md       # 이 파일
└── utils/
    └── apiHelper.js    # API 호출 헬퍼 함수들
```

## 1. API 설정 파일 (config/api.js)

### 기본 설정
```javascript
import { API_BASE_URL, API_URL, API_ENDPOINTS } from '../config/api';

console.log(API_BASE_URL); // http://localhost:8080
console.log(API_URL);      // http://localhost:8080/api
```

### 환경별 설정
- **개발환경**: `http://localhost:8080`
- **프로덕션**: `https://your-production-domain.com`
- **테스트**: `http://localhost:8080`

### API 엔드포인트 사용
```javascript
import { API_ENDPOINTS } from '../config/api';

// 인증 관련
API_ENDPOINTS.AUTH.LOGIN     // /api/auth/login
API_ENDPOINTS.AUTH.REGISTER  // /api/auth/register

// 결제 관련
API_ENDPOINTS.PAYMENT.CREATE           // /api/payments/create
API_ENDPOINTS.PAYMENT.PROCESS(123)     // /api/payments/123/process

// 사용자 관련
API_ENDPOINTS.USER.PROFILE   // /api/user/profile
API_ENDPOINTS.USER.UPDATE    // /api/user/update
```

## 2. API 헬퍼 사용법 (utils/apiHelper.js)

### 인증 API
```javascript
import { authAPI } from '../utils/apiHelper';

// 로그인
const loginResult = await authAPI.login('user@example.com', 'password');

// 회원가입
const registerResult = await authAPI.register({
  email: 'user@example.com',
  password: 'password',
  name: '홍길동'
});

// 로그아웃
await authAPI.logout();
```

### 결제 API
```javascript
import { paymentAPI } from '../utils/apiHelper';

// 결제 생성
const payment = await paymentAPI.create({
  paymentMethod: 'tosspay',
  amount: 10000,
  description: 'Borini 서비스 결제'
});

// 결제 처리
const result = await paymentAPI.process(payment.id);

// 결제 내역 조회
const history = await paymentAPI.getHistory();
```

### 사용자 API
```javascript
import { userAPI } from '../utils/apiHelper';

// 프로필 조회
const profile = await userAPI.getProfile();

// 프로필 업데이트
await userAPI.updateProfile({
  name: '새로운 이름',
  phone: '010-1234-5678'
});
```

### 장비 API
```javascript
import { equipmentAPI } from '../utils/apiHelper';

// 장비 목록 조회
const equipmentList = await equipmentAPI.getList();

// 장비 상세 정보
const equipment = await equipmentAPI.getDetail(123);

// 장비 대여
await equipmentAPI.rent({
  equipmentId: 123,
  startDate: '2024-01-01',
  endDate: '2024-01-03'
});
```

## 3. 컴포넌트에서 사용 예시

### 기본 사용법
```javascript
import React, { useState, useEffect } from 'react';
import { paymentAPI, userAPI } from '../utils/apiHelper';

function MyComponent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await userAPI.getProfile();
        setUser(userData);
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handlePayment = async () => {
    try {
      const result = await paymentAPI.create({
        paymentMethod: 'kakaopay',
        amount: 15000,
        description: '스키 장비 대여'
      });
      
      console.log('결제 생성 완료:', result);
    } catch (error) {
      console.error('결제 생성 실패:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div>
          <h1>안녕하세요, {user?.name}님!</h1>
          <button onClick={handlePayment}>결제하기</button>
        </div>
      )}
    </div>
  );
}
```

## 4. 환경 변수 설정 (선택사항)

`.env` 파일을 사용하여 API URL을 설정할 수도 있습니다:

```env
# .env.development
REACT_APP_API_BASE_URL=http://localhost:8080

# .env.production  
REACT_APP_API_BASE_URL=https://your-production-domain.com
```

그리고 `config/api.js`에서 환경 변수를 사용:

```javascript
const API_CONFIG = {
  development: {
    BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
    // ...
  }
};
```

## 5. 에러 처리

모든 API 호출은 try-catch 블록으로 감싸서 에러를 처리하세요:

```javascript
try {
  const result = await paymentAPI.create(paymentData);
  // 성공 처리
} catch (error) {
  // 에러 처리
  if (error.message.includes('401')) {
    // 인증 에러 - 로그인 페이지로 리다이렉트
    window.location.href = '/login';
  } else {
    // 기타 에러 처리
    alert('오류가 발생했습니다: ' + error.message);
  }
}
```

## 6. 토큰 관리

인증 토큰은 자동으로 관리됩니다:

```javascript
import { getToken, setToken, removeToken } from '../utils/apiHelper';

// 토큰 확인
const token = getToken();
if (!token) {
  // 로그인 필요
}

// 수동 토큰 설정 (일반적으로 필요하지 않음)
setToken('your-jwt-token');

// 로그아웃 시 토큰 제거 (authAPI.logout()에서 자동 처리됨)
removeToken();
```

이제 프로젝트 전체에서 일관된 방식으로 API를 호출할 수 있습니다!
