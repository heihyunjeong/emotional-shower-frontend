// API 설정 파일
// 환경에 따른 API URL 설정

const API_CONFIG = {
  // 개발 환경
  development: {
    BASE_URL: 'http://localhost:8080',
    API_URL: 'http://localhost:8080/api',
    TIMEOUT: 10000, // 10초
  },
  
  // 프로덕션 환경
  production: {
    BASE_URL: 'https://your-production-domain.com',
    API_URL: 'https://your-production-domain.com/api',
    TIMEOUT: 15000, // 15초
  },
  
  // 테스트 환경
  test: {
    BASE_URL: 'http://localhost:8080',
    API_URL: 'http://localhost:8080/api',
    TIMEOUT: 5000, // 5초
  }
};

// 현재 환경 감지
const getCurrentEnvironment = () => {
  if (process.env.NODE_ENV === 'production') return 'production';
  if (process.env.NODE_ENV === 'test') return 'test';
  return 'development';
};

// 현재 환경의 설정 가져오기
const currentConfig = API_CONFIG[getCurrentEnvironment()];

// API 엔드포인트 정의
export const API_ENDPOINTS = {
  // 인증 관련
  AUTH: {
    LOGIN: `${currentConfig.API_URL}/auth/login`,
    REGISTER: `${currentConfig.API_URL}/auth/register`,
    LOGOUT: `${currentConfig.API_URL}/auth/logout`,
    REFRESH: `${currentConfig.API_URL}/auth/refresh`,
  },
  
  // 사용자 관련
  USER: {
    PROFILE: `${currentConfig.API_URL}/user/profile`,
    UPDATE: `${currentConfig.API_URL}/user/update`,
    DELETE: `${currentConfig.API_URL}/user/delete`,
  },
  
  // 결제 관련
  PAYMENT: {
    CREATE: `${currentConfig.API_URL}/payments/create`,
    PROCESS: (id) => `${currentConfig.API_URL}/payments/${id}/process`,
    HISTORY: `${currentConfig.API_URL}/payments/history`,
    CANCEL: (id) => `${currentConfig.API_URL}/payments/${id}/cancel`,
  },
  
  // 장비 관련
  EQUIPMENT: {
    LIST: `${currentConfig.API_URL}/equipment/list`,
    DETAIL: (id) => `${currentConfig.API_URL}/equipment/${id}`,
    RENT: `${currentConfig.API_URL}/equipment/rent`,
    RETURN: `${currentConfig.API_URL}/equipment/return`,
  },
  
  // 매장 관련
  STORE: {
    LIST: `${currentConfig.API_URL}/stores/list`,
    DETAIL: (id) => `${currentConfig.API_URL}/stores/${id}`,
    LOCATIONS: `${currentConfig.API_URL}/stores/locations`,
  }
};

// 기본 설정 내보내기
export const API_BASE_URL = currentConfig.BASE_URL;
export const API_URL = currentConfig.API_URL;
export const API_TIMEOUT = currentConfig.TIMEOUT;

// HTTP 헤더 설정
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// 인증 헤더 생성 함수
export const getAuthHeaders = (token) => ({
  ...DEFAULT_HEADERS,
  'Authorization': `Bearer ${token}`,
});

// API 호출 헬퍼 함수
export const apiCall = async (url, options = {}) => {
  const config = {
    method: 'GET',
    headers: DEFAULT_HEADERS,
    timeout: API_TIMEOUT,
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// 인증이 필요한 API 호출 헬퍼 함수
export const authenticatedApiCall = async (url, options = {}, token) => {
  if (!token) {
    throw new Error('Authentication token is required');
  }

  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(token),
      ...options.headers,
    },
  };

  return apiCall(url, config);
};

export default {
  API_BASE_URL,
  API_URL,
  API_TIMEOUT,
  API_ENDPOINTS,
  DEFAULT_HEADERS,
  getAuthHeaders,
  apiCall,
  authenticatedApiCall,
};
