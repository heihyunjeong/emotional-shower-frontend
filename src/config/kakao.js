// 카카오 로그인 설정
export const KAKAO_CONFIG = {
  // JavaScript 키 (클라이언트에서 사용)
  APP_KEY: '316ceefd03657565c985b58c64649b1c',
  
  // REST API 키 (서버에서 사용)
  REST_API_KEY: '93f5ea2128742ccdf9c69f50edc9b919',
  
  // Client Secret (토큰 발급 시 보안 강화용)
  CLIENT_SECRET: 'DaLihaKOUAm7jTRRGCftGs73aXF6kvut',
  
  // Admin 키 (관리자 기능용)
  ADMIN_KEY: '19402be2e05b2d15c5c0fce3cbd71a20',
  
  // 리다이렉트 URI
  REDIRECT_URI: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com/auth/kakao/callback'
    : 'http://localhost:3000/auth/kakao/callback',
  
  // 카카오 API 엔드포인트
  AUTH_URL: 'https://kauth.kakao.com/oauth/authorize',
  TOKEN_URL: 'https://kauth.kakao.com/oauth/token',
  USER_INFO_URL: 'https://kapi.kakao.com/v2/user/me',
  LOGOUT_URL: 'https://kapi.kakao.com/v1/user/logout',
  UNLINK_URL: 'https://kapi.kakao.com/v1/user/unlink'
};
