import { KAKAO_CONFIG } from '../config/kakao';

/**
 * 카카오 로그인 유틸리티 클래스
 */
export class KakaoAuth {
  constructor() {
    this.config = KAKAO_CONFIG;
  }

  /**
   * 카카오 로그인 URL 생성
   * @param {string} state - CSRF 방지를 위한 상태값
   * @returns {string} 카카오 로그인 URL
   */
  getAuthUrl(state = null) {
    const params = new URLSearchParams({
      client_id: this.config.REST_API_KEY,
      redirect_uri: this.config.REDIRECT_URI,
      response_type: 'code',
      ...(state && { state })
    });

    return `${this.config.AUTH_URL}?${params.toString()}`;
  }

  /**
   * 카카오 간편로그인 URL 생성 (카카오톡 앱에서 자동 로그인)
   * @param {string} state - CSRF 방지를 위한 상태값
   * @returns {string} 카카오 간편로그인 URL
   */
  getEasyLoginUrl(state = null) {
    const params = new URLSearchParams({
      client_id: this.config.REST_API_KEY,
      redirect_uri: this.config.REDIRECT_URI,
      response_type: 'code',
      prompt: 'select_account', // 카카오계정 간편로그인
      ...(state && { state })
    });

    return `${this.config.AUTH_URL}?${params.toString()}`;
  }

  /**
   * 인가 코드로 액세스 토큰 요청
   * @param {string} code - 인가 코드
   * @returns {Promise<Object>} 토큰 정보
   */
  async getAccessToken(code) {
    try {
      const response = await fetch(this.config.TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: this.config.REST_API_KEY,
          redirect_uri: this.config.REDIRECT_URI,
          code: code,
          client_secret: this.config.CLIENT_SECRET
        })
      });

      if (!response.ok) {
        throw new Error(`토큰 요청 실패: ${response.status}`);
      }

      const tokenData = await response.json();
      return tokenData;
    } catch (error) {
      console.error('카카오 토큰 요청 오류:', error);
      throw error;
    }
  }

  /**
   * 액세스 토큰으로 사용자 정보 조회
   * @param {string} accessToken - 액세스 토큰
   * @returns {Promise<Object>} 사용자 정보
   */
  async getUserInfo(accessToken) {
    try {
      const response = await fetch(this.config.USER_INFO_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });

      if (!response.ok) {
        throw new Error(`사용자 정보 요청 실패: ${response.status}`);
      }

      const userInfo = await response.json();
      return userInfo;
    } catch (error) {
      console.error('카카오 사용자 정보 조회 오류:', error);
      throw error;
    }
  }

  /**
   * 카카오 로그아웃
   * @param {string} accessToken - 액세스 토큰
   * @returns {Promise<Object>} 로그아웃 결과
   */
  async logout(accessToken) {
    try {
      const response = await fetch(this.config.LOGOUT_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });

      if (!response.ok) {
        throw new Error(`로그아웃 요청 실패: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('카카오 로그아웃 오류:', error);
      throw error;
    }
  }

  /**
   * 카카오 연결 해제 (회원 탈퇴)
   * @param {string} accessToken - 액세스 토큰
   * @returns {Promise<Object>} 연결 해제 결과
   */
  async unlink(accessToken) {
    try {
      const response = await fetch(this.config.UNLINK_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });

      if (!response.ok) {
        throw new Error(`연결 해제 요청 실패: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('카카오 연결 해제 오류:', error);
      throw error;
    }
  }

  /**
   * 토큰 갱신
   * @param {string} refreshToken - 리프레시 토큰
   * @returns {Promise<Object>} 새로운 토큰 정보
   */
  async refreshAccessToken(refreshToken) {
    try {
      const response = await fetch(this.config.TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: this.config.REST_API_KEY,
          refresh_token: refreshToken,
          client_secret: this.config.CLIENT_SECRET
        })
      });

      if (!response.ok) {
        throw new Error(`토큰 갱신 실패: ${response.status}`);
      }

      const tokenData = await response.json();
      return tokenData;
    } catch (error) {
      console.error('카카오 토큰 갱신 오류:', error);
      throw error;
    }
  }

  /**
   * 상태값 생성 (CSRF 방지)
   * @returns {string} 랜덤 상태값
   */
  generateState() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  /**
   * 모바일 환경에서 카카오톡 앱으로 로그인 시도
   * @returns {boolean} 카카오톡 앱 실행 성공 여부
   */
  tryKakaoTalkLogin() {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    if (isMobile) {
      const state = this.generateState();
      sessionStorage.setItem('kakao_state', state);
      
      // 카카오톡 앱 스킴 URL
      const kakaoTalkUrl = `kakaotalk://oauth?client_id=${this.config.REST_API_KEY}&redirect_uri=${encodeURIComponent(this.config.REDIRECT_URI)}&response_type=code&state=${state}`;
      
      try {
        window.location.href = kakaoTalkUrl;
        
        // 카카오톡 앱이 설치되지 않은 경우 대비하여 일정 시간 후 웹 로그인으로 전환
        setTimeout(() => {
          window.location.href = this.getEasyLoginUrl(state);
        }, 2000);
        
        return true;
      } catch (error) {
        console.error('카카오톡 앱 실행 실패:', error);
        return false;
      }
    }
    
    return false;
  }
}

// 싱글톤 인스턴스 생성
export const kakaoAuth = new KakaoAuth();

/**
 * 사용자 정보를 로컬 스토리지에 저장
 * @param {Object} userInfo - 사용자 정보
 * @param {Object} tokenInfo - 토큰 정보
 */
export const saveUserSession = (userInfo, tokenInfo) => {
  const sessionData = {
    user: {
      id: userInfo.id,
      nickname: userInfo.kakao_account?.profile?.nickname || '사용자',
      email: userInfo.kakao_account?.email || '',
      profileImage: userInfo.kakao_account?.profile?.profile_image_url || '',
      thumbnailImage: userInfo.kakao_account?.profile?.thumbnail_image_url || ''
    },
    tokens: {
      accessToken: tokenInfo.access_token,
      refreshToken: tokenInfo.refresh_token,
      expiresIn: tokenInfo.expires_in,
      tokenType: tokenInfo.token_type,
      loginTime: Date.now()
    }
  };

  localStorage.setItem('kakao_session', JSON.stringify(sessionData));
};

/**
 * 로컬 스토리지에서 사용자 세션 정보 조회
 * @returns {Object|null} 사용자 세션 정보
 */
export const getUserSession = () => {
  try {
    const sessionData = localStorage.getItem('kakao_session');
    if (!sessionData) return null;

    const parsed = JSON.parse(sessionData);
    
    // 토큰 만료 확인
    const now = Date.now();
    const loginTime = parsed.tokens.loginTime;
    const expiresIn = parsed.tokens.expiresIn * 1000; // 초를 밀리초로 변환
    
    if (now - loginTime > expiresIn) {
      // 토큰이 만료된 경우
      clearUserSession();
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('세션 정보 조회 오류:', error);
    return null;
  }
};

/**
 * 사용자 세션 정보 삭제
 */
export const clearUserSession = () => {
  localStorage.removeItem('kakao_session');
  sessionStorage.removeItem('kakao_state');
};

/**
 * 로그인 상태 확인
 * @returns {boolean} 로그인 여부
 */
export const isLoggedIn = () => {
  const session = getUserSession();
  return session !== null;
};
