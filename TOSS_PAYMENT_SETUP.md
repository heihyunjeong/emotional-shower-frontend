# 토스페이먼트 결제 시스템 설정 가이드

## 🚀 구현된 기능

### 1. 결제 플로우
- **결제 방식 선택** (`/storing/paymentmethod`) - 토스페이 선택
- **토스 결제 위젯** (`/user/toss-payment`) - 실제 결제 진행
- **결제 성공** (`/payment/success`) - 결제 완료 페이지
- **결제 실패** (`/payment/fail`) - 결제 실패 페이지

### 2. 서버리스 API
- **결제 승인 API** (`/api/toss/confirm`) - Vercel 서버리스 함수

## 🔧 설정 방법

### 1. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 토스페이먼트 API 키
REACT_APP_TOSS_CLIENT_KEY=test_ck_GePWvyJnrKJn1WYnNPKqVgLzN97E
TOSS_SECRET_KEY=test_sk_DnyRpQWGrNLXvqMEw6Ge3Kwv1M9E
TOSS_SECURITY_KEY=97544ba7d808684ce66f3cfefc5afc98e42dab7855fd25dcc37581a7d159e249

# 결제 URL 설정
REACT_APP_PAYMENT_SUCCESS_URL=http://localhost:3000/payment/success
REACT_APP_PAYMENT_FAIL_URL=http://localhost:3000/payment/fail
```

### 2. Vercel 배포 시 환경변수 설정

Vercel 대시보드에서 다음 환경변수들을 설정하세요:

```
TOSS_SECRET_KEY=test_sk_DnyRpQWGrNLXvqMEw6Ge3Kwv1M9E
REACT_APP_TOSS_CLIENT_KEY=test_ck_GePWvyJnrKJn1WYnNPKqVgLzN97E
```

## 📱 사용 방법

### 1. 개발 환경에서 테스트

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm start
```

### 2. 결제 테스트 플로우

1. **결제 방식 선택 페이지**로 이동
   - URL: `http://localhost:3000/storing/paymentmethod`
   - 토스페이 선택

2. **결제하기 버튼** 클릭
   - 토스 결제 위젯 페이지로 이동

3. **토스 결제 위젯**에서 결제 진행
   - 테스트 카드 정보 입력
   - 결제 승인

4. **결제 완료 페이지** 확인
   - 성공 시: `/payment/success`
   - 실패 시: `/payment/fail`

## 🧪 테스트 카드 정보

토스페이먼트 테스트 환경에서 사용할 수 있는 카드 정보:

```
카드번호: 4242424242424242
유효기간: 12/25
CVC: 123
비밀번호: 1234
```

## 📁 파일 구조

```
src/
├── pages/user/
│   ├── userPay.jsx              # 결제 방식 선택
│   ├── TossPaymentWidget.jsx    # 토스 결제 위젯
│   ├── PaymentSuccess.jsx       # 결제 성공 페이지
│   └── PaymentFail.jsx         # 결제 실패 페이지
├── App.js                      # 라우터 설정
api/
└── toss/
    └── confirm.js              # 결제 승인 서버리스 함수
```

## 🔍 주요 특징

### 1. 토스 심사 통과 수준의 구현
- ✅ 실제 토스페이먼트 SDK 사용
- ✅ 서버리스 결제 승인 API
- ✅ 에러 처리 및 사용자 친화적 UI
- ✅ 결제 정보 표시 및 확인

### 2. 보안 고려사항
- ✅ 클라이언트 키만 프론트엔드에 노출
- ✅ 시크릿 키는 서버사이드에서만 사용
- ✅ CORS 설정 및 요청 검증

### 3. 사용자 경험
- ✅ 로딩 상태 표시
- ✅ 에러 메시지 및 재시도 기능
- ✅ 반응형 디자인
- ✅ 접근성 고려

## 🚨 주의사항

1. **테스트 키 사용**: 현재 테스트 키로 설정되어 있습니다. 실제 서비스에서는 실제 키로 변경하세요.

2. **HTTPS 필수**: 실제 결제에서는 HTTPS가 필수입니다.

3. **웹훅 설정**: 실제 서비스에서는 토스페이먼트 웹훅을 설정하여 결제 상태를 동기화하세요.

## 📞 문의

토스페이먼트 관련 문의: [토스페이먼트 개발자센터](https://docs.tosspayments.com/)
