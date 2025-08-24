# 카카오 로그인 설정 가이드

## 1. 카카오 개발자 콘솔 설정

### 1.1 애플리케이션 등록
1. [카카오 개발자 콘솔](https://developers.kakao.com/)에 접속
2. 애플리케이션 생성 및 설정

### 1.2 플랫폼 설정
- **Web 플랫폼 등록**
  - 개발환경: `http://localhost:3000`
  - 운영환경: `https://yourdomain.com`

### 1.3 카카오 로그인 설정
- **카카오 로그인 활성화**: ON
- **OpenID Connect 활성화**: ON (선택사항)
- **리다이렉트 URI 등록**:
  - 개발환경: `http://localhost:3000/auth/kakao/callback`
  - 운영환경: `https://yourdomain.com/auth/kakao/callback`

### 1.4 동의항목 설정
필수 동의항목:
- 닉네임
- 프로필 사진
- 카카오계정(이메일)

선택 동의항목:
- 성별
- 연령대
- 생일

### 1.5 앱 키 확인
현재 설정된 키:
- **네이티브 앱 키**: `e1b1d218350f530a3133e2fa3da6deda`
- **REST API 키**: `93f5ea2128742ccdf9c69f50edc9b919`
- **JavaScript 키**: `316ceefd03657565c985b58c64649b1c`
- **Admin 키**: `19402be2e05b2d15c5c0fce3cbd71a20`
- **Client Secret**: `DaLihaKOUAm7jTRRGCftGs73aXF6kvut`

## 2. 프로젝트 설정

### 2.1 환경 변수 설정
`.env.local` 파일 생성:
```env
# 카카오 로그인 설정
NEXT_PUBLIC_KAKAO_APP_KEY=316ceefd03657565c985b58c64649b1c
KAKAO_REST_API_KEY=93f5ea2128742ccdf9c69f50edc9b919
KAKAO_CLIENT_SECRET=DaLihaKOUAm7jTRRGCftGs73aXF6kvut
KAKAO_ADMIN_KEY=19402be2e05b2d15c5c0fce3cbd71a20

# 리다이렉트 URI
NEXT_PUBLIC_KAKAO_REDIRECT_URI=http://localhost:3000/auth/kakao/callback
```

### 2.2 의존성 설치
```bash
npm install
```

## 3. 구현된 기능

### 3.1 카카오 로그인 플로우
1. **로그인 버튼 클릭** (`EasyLogin` 컴포넌트)
2. **카카오 인증 서버로 리다이렉트**
3. **사용자 동의 및 인증**
4. **콜백 URL로 인가 코드 전달**
5. **액세스 토큰 발급** (`KakaoCallback` 컴포넌트)
6. **사용자 정보 조회**
7. **로컬 세션 저장**
8. **홈 페이지로 이동**

### 3.2 모바일 최적화
- **카카오톡 앱 연동**: 모바일에서 카카오톡 앱으로 자동 전환
- **간편로그인**: 웹에서도 간편로그인 지원
- **반응형 UI**: 모바일 친화적 인터페이스

### 3.3 보안 기능
- **CSRF 방지**: State 파라미터를 통한 요청 검증
- **토큰 관리**: 액세스 토큰 및 리프레시 토큰 자동 관리
- **세션 만료**: 토큰 만료 시 자동 로그아웃

## 4. 파일 구조 및 상세 경로

### 4.1 전체 디렉토리 구조
```
📁 BORINI_1-react-1/                           # 프로젝트 루트
├── 📄 KAKAO_LOGIN_SETUP.md                    # 카카오 로그인 설정 가이드 (이 파일)
├── 📁 src/
│   ├── 📄 App.js                              # 라우터 설정 (수정됨)
│   ├── 📁 config/
│   │   └── 📄 kakao.js                        # 카카오 설정 상수
│   ├── 📁 utils/
│   │   └── 📄 kakaoAuth.js                    # 카카오 인증 유틸리티
│   ├── 📁 contexts/
│   │   └── 📄 AuthContext.jsx                 # 인증 컨텍스트
│   ├── 📁 components/
│   │   ├── 📄 UserProfile.jsx                 # 사용자 프로필 컴포넌트
│   │   └── 📄 ProtectedRoute.jsx              # 보호된 라우트
│   └── 📁 pages/
│       ├── 📄 easyLogIn.jsx                   # 로그인 페이지 (수정됨)
│       └── 📁 auth/
│           └── 📄 KakaoCallback.jsx           # 카카오 콜백 처리
└── 📁 기타 기존 파일들...
```

### 4.2 생성/수정된 파일 목록

#### 🆕 새로 생성된 파일들

**설정 파일**
- `src/config/kakao.js` - 카카오 개발자 키 및 API 엔드포인트 설정

**유틸리티 파일**
- `src/utils/kakaoAuth.js` - 카카오 인증 관련 모든 기능 (로그인, 토큰 관리, 세션 관리)

**인증 페이지**
- `src/pages/auth/KakaoCallback.jsx` - 카카오 로그인 후 콜백 처리 페이지

**상태 관리**
- `src/contexts/AuthContext.jsx` - React Context를 이용한 전역 인증 상태 관리

**UI 컴포넌트**
- `src/components/UserProfile.jsx` - 로그인한 사용자 정보 표시 컴포넌트
- `src/components/ProtectedRoute.jsx` - 인증이 필요한 라우트 보호 컴포넌트

**문서**
- `KAKAO_LOGIN_SETUP.md` - 카카오 로그인 설정 및 사용 가이드

#### ✏️ 수정된 기존 파일들

**로그인 페이지**
- `src/pages/easyLogIn.jsx` - 기존 로그인 페이지에 카카오 로그인 기능 추가

**라우터 설정**
- `src/App.js` - 카카오 콜백 라우트(`/auth/kakao/callback`) 추가

### 4.3 파일별 상세 역할

#### 📋 핵심 설정 파일

**`src/config/kakao.js`**
```javascript
// 카카오 개발자 키들 관리
// API 엔드포인트 URL 정의  
// 환경별 리다이렉트 URI 설정
```

**`src/utils/kakaoAuth.js`**
```javascript
// 카카오 로그인 URL 생성
// 토큰 발급/갱신/폐기
// 사용자 정보 조회
// 세션 관리 (저장/조회/삭제)
// 모바일 카카오톡 앱 연동
```

#### 🎨 UI 컴포넌트

**`src/pages/easyLogIn.jsx`** (수정됨)
```javascript
// 기존 로그인 페이지
// 카카오 로그인 버튼 추가
// 로그인 상태 확인 로직 추가
// 모바일 카카오톡 앱 연동 처리
```

**`src/pages/auth/KakaoCallback.jsx`**
```javascript
// 카카오 로그인 후 콜백 처리
// 인가 코드 → 액세스 토큰 변환
// 사용자 정보 조회 및 저장
// 에러 처리 및 사용자 피드백
// CSRF 방지 상태값 검증
```

**`src/components/UserProfile.jsx`**
```javascript
// 로그인한 사용자 정보 표시
// 프로필 사진, 닉네임, 이메일 표시
// 로그아웃 버튼 제공
```

**`src/components/ProtectedRoute.jsx`**
```javascript
// 인증이 필요한 페이지 보호
// 로그인하지 않은 사용자를 로그인 페이지로 리다이렉트
// 로딩 상태 처리
```

#### 🔄 상태 관리

**`src/contexts/AuthContext.jsx`**
```javascript
// React Context를 이용한 전역 인증 상태 관리
// 사용자 정보 및 토큰 상태 관리
// 로그인/로그아웃 함수 제공
// 인증 상태 확인 및 업데이트
```

#### 🛣️ 라우팅

**`src/App.js`** (수정됨)
```javascript
// 기존 라우터에 카카오 콜백 라우트 추가
// /auth/kakao/callback 경로 추가
// KakaoCallback 컴포넌트 import 추가
```

### 4.4 파일 간 연결 관계

```
📄 easyLogIn.jsx
    ↓ (카카오 로그인 버튼 클릭)
📄 kakaoAuth.js (로그인 URL 생성)
    ↓ (카카오 서버로 리다이렉트)
📄 KakaoCallback.jsx (콜백 처리)
    ↓ (토큰 발급 & 사용자 정보 저장)
📄 AuthContext.jsx (전역 상태 업데이트)
    ↓ (홈으로 이동)
📄 UserProfile.jsx (사용자 정보 표시)
```

### 4.5 환경 설정 파일

**`.env.local`** (수동 생성 필요)
```env
# 카카오 로그인 설정
NEXT_PUBLIC_KAKAO_APP_KEY=316ceefd03657565c985b58c64649b1c
KAKAO_REST_API_KEY=93f5ea2128742ccdf9c69f50edc9b919
KAKAO_CLIENT_SECRET=DaLihaKOUAm7jTRRGCftGs73aXF6kvut
KAKAO_ADMIN_KEY=19402be2e05b2d15c5c0fce3cbd71a20

# 리다이렉트 URI
NEXT_PUBLIC_KAKAO_REDIRECT_URI=http://localhost:3000/auth/kakao/callback
```

## 5. 사용 방법

### 5.1 기본 로그인
```jsx
import { kakaoAuth } from '../utils/kakaoAuth';

const handleKakaoLogin = async () => {
  const state = kakaoAuth.generateState();
  sessionStorage.setItem('kakao_state', state);
  
  const authUrl = kakaoAuth.getEasyLoginUrl(state);
  window.location.href = authUrl;
};
```

### 5.2 사용자 정보 조회
```jsx
import { getUserSession } from '../utils/kakaoAuth';

const session = getUserSession();
if (session) {
  console.log('사용자 정보:', session.user);
  console.log('토큰 정보:', session.tokens);
}
```

### 5.3 로그아웃
```jsx
import { kakaoAuth, clearUserSession } from '../utils/kakaoAuth';

const handleLogout = async () => {
  try {
    await kakaoAuth.logout(accessToken);
  } finally {
    clearUserSession();
    navigate('/easylogin');
  }
};
```

### 5.4 인증 컨텍스트 사용
```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>로그인이 필요합니다.</div>;
  }
  
  return (
    <div>
      <h1>안녕하세요, {user.nickname}님!</h1>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}
```

## 6. 테스트

### 6.1 개발 환경 테스트
1. 개발 서버 실행: `npm start`
2. `http://localhost:3000/easylogin` 접속
3. 카카오 로그인 버튼 클릭
4. 카카오 계정으로 로그인
5. 홈 페이지로 리다이렉트 확인

### 6.2 모바일 테스트
1. 모바일 기기에서 개발 서버 접속
2. 카카오톡 앱 설치 여부에 따른 동작 확인
3. 간편로그인 플로우 테스트

## 7. 배포 시 주의사항

### 7.1 환경 변수 설정
- 운영 환경의 환경 변수 설정
- 리다이렉트 URI를 실제 도메인으로 변경

### 7.2 카카오 개발자 콘솔 설정
- 운영 도메인을 플랫폼에 추가
- 운영 환경 리다이렉트 URI 등록

### 7.3 보안 고려사항
- Client Secret 및 Admin Key 보안 관리
- HTTPS 사용 필수
- 토큰 저장소 보안 강화 고려

## 8. 문제 해결

### 8.1 일반적인 오류
- **리다이렉트 URI 불일치**: 카카오 개발자 콘솔에서 URI 확인
- **앱 키 오류**: 환경 변수 및 설정 파일 확인
- **동의항목 오류**: 필수 동의항목 설정 확인

### 8.2 디버깅
- 브라우저 개발자 도구 콘솔 확인
- 네트워크 탭에서 API 요청/응답 확인
- 로컬 스토리지의 세션 데이터 확인

## 9. 추가 기능 구현 가능

### 9.1 고급 기능
- 토큰 자동 갱신
- 다중 소셜 로그인 통합
- 사용자 프로필 편집
- 계정 연결/해제

### 9.2 서버리스 확장
- Vercel/Netlify 배포 최적화
- Edge Functions 활용
- CDN 캐싱 전략

이제 카카오톡 간편 로그인이 완전히 구현되었습니다! 🎉
