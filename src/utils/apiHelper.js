// API 호출을 위한 헬퍼 유틸리티
import { API_ENDPOINTS, apiCall, authenticatedApiCall, getAuthHeaders } from '../config/api';

/**
 * 로컬 스토리지에서 토큰 가져오기
 */
export const getToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * 로컬 스토리지에 토큰 저장
 */
export const setToken = (token) => {
  localStorage.setItem('authToken', token);
};

/**
 * 로컬 스토리지에서 토큰 제거
 */
export const removeToken = () => {
  localStorage.removeItem('authToken');
};

/**
 * 테스트용 토큰 설정 (모든 환경에서 사용 가능)
 */
export const setTestToken = () => {
  const testToken = 'test-jwt-token-for-development';
  setToken(testToken);
  console.log('테스트 토큰이 설정되었습니다:', testToken);
  return testToken;
};

/**
 * 토큰 상태 확인
 */
export const checkTokenStatus = () => {
  const token = getToken();
  if (token) {
    console.log('현재 토큰:', token);
    return true;
  } else {
    console.log('토큰이 설정되지 않았습니다.');
    return false;
  }
};

/**
 * 사용자 인증 API
 */
export const authAPI = {
  // 로그인
  login: async (email, password) => {
    try {
      const data = await apiCall(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      if (data.token) {
        setToken(data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  // 회원가입
  register: async (userData) => {
    try {
      const data = await apiCall(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      
      return data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  // 로그아웃
  logout: async () => {
    try {
      const token = getToken();
      if (token) {
        await authenticatedApiCall(API_ENDPOINTS.AUTH.LOGOUT, {
          method: 'POST'
        }, token);
      }
      
      removeToken();
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      removeToken(); // 에러가 발생해도 토큰은 제거
      throw error;
    }
  },

  // 토큰 갱신
  refreshToken: async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No token available');
      }

      const data = await authenticatedApiCall(API_ENDPOINTS.AUTH.REFRESH, {
        method: 'POST'
      }, token);
      
      if (data.token) {
        setToken(data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Token refresh failed:', error);
      removeToken();
      throw error;
    }
  }
};

/**
 * 사용자 정보 API
 */
export const userAPI = {
  // 프로필 조회
  getProfile: async () => {
    try {
      const token = getToken();
      const data = await authenticatedApiCall(API_ENDPOINTS.USER.PROFILE, {
        method: 'GET'
      }, token);
      
      return data;
    } catch (error) {
      console.error('Get profile failed:', error);
      throw error;
    }
  },

  // 프로필 업데이트
  updateProfile: async (profileData) => {
    try {
      const token = getToken();
      const data = await authenticatedApiCall(API_ENDPOINTS.USER.UPDATE, {
        method: 'PUT',
        body: JSON.stringify(profileData)
      }, token);
      
      return data;
    } catch (error) {
      console.error('Update profile failed:', error);
      throw error;
    }
  },

  // 계정 삭제
  deleteAccount: async () => {
    try {
      const token = getToken();
      const data = await authenticatedApiCall(API_ENDPOINTS.USER.DELETE, {
        method: 'DELETE'
      }, token);
      
      removeToken();
      return data;
    } catch (error) {
      console.error('Delete account failed:', error);
      throw error;
    }
  }
};

/**
 * 결제 API
 */
export const paymentAPI = {
  // 결제 생성
  create: async (paymentData) => {
    try {
      let token = getToken();
      if (!token) {
        // 토큰이 없으면 자동으로 테스트 토큰 설정
        console.log('토큰이 없어서 테스트 토큰을 자동 설정합니다.');
        token = setTestToken();
        
        // 여전히 토큰이 없으면 에러ㅡ
        if (!token) {
          throw new Error('인증 토큰을 설정할 수 없습니다.');
        }
      }
      
      console.log('현재 토큰 상태:', token ? '토큰 있음' : '토큰 없음');
      
      const data = await authenticatedApiCall(API_ENDPOINTS.PAYMENT.CREATE, {
        method: 'POST',
        body: JSON.stringify(paymentData)
      }, token);
      
      return data;
    } catch (error) {
      console.error('Create payment failed:', error);
      throw error;
    }
  },

  // 결제 처리
  process: async (paymentId) => {
    try {
      const token = getToken();
      if (!token) {
        // 토큰이 없으면 자동으로 테스트 토큰 설정
        console.log('토큰이 없어서 테스트 토큰을 자동 설정합니다.');
        setTestToken();
      }
      
      const currentToken = getToken();
      const data = await authenticatedApiCall(API_ENDPOINTS.PAYMENT.PROCESS(paymentId), {
        method: 'POST'
      }, currentToken);
      
      return data;
    } catch (error) {
      console.error('Process payment failed:', error);
      throw error;
    }
  },

  // 결제 내역 조회
  getHistory: async () => {
    try {
      const token = getToken();
      const data = await authenticatedApiCall(API_ENDPOINTS.PAYMENT.HISTORY, {
        method: 'GET'
      }, token);
      
      return data;
    } catch (error) {
      console.error('Get payment history failed:', error);
      throw error;
    }
  },

  // 결제 상태 업데이트
  updateStatus: async (paymentId, status) => {
    try {
      const token = getToken();
      if (!token) {
        console.log('토큰이 없어서 테스트 토큰을 자동 설정합니다.');
        setTestToken();
      }
      
      const currentToken = getToken();
      const data = await authenticatedApiCall(`${API_ENDPOINTS.PAYMENT.PROCESS(paymentId).replace('/process', '/status')}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      }, currentToken);
      
      return data;
    } catch (error) {
      console.error('Update payment status failed:', error);
      throw error;
    }
  },

  // 결제 취소
  cancel: async (paymentId) => {
    try {
      const token = getToken();
      const data = await authenticatedApiCall(API_ENDPOINTS.PAYMENT.CANCEL(paymentId), {
        method: 'DELETE'
      }, token);
      
      return data;
    } catch (error) {
      console.error('Cancel payment failed:', error);
      throw error;
    }
  },

  // 결제 성공 처리 (토스페이용)
  success: async (paymentData) => {
    try {
      const token = getToken();
      if (!token) {
        console.log('토큰이 없어서 테스트 토큰을 자동 설정합니다.');
        setTestToken();
      }
      
      const currentToken = getToken();
      const data = await authenticatedApiCall(API_ENDPOINTS.PAYMENT.SUCCESS, {
        method: 'POST',
        body: JSON.stringify(paymentData)
      }, currentToken);
      
      return data;
    } catch (error) {
      console.error('Payment success processing failed:', error);
      throw error;
    }
  },

  // 결제 실패 처리 (토스페이용)
  fail: async (failData) => {
    try {
      const token = getToken();
      if (!token) {
        console.log('토큰이 없어서 테스트 토큰을 자동 설정합니다.');
        setTestToken();
      }
      
      const currentToken = getToken();
      const data = await authenticatedApiCall(API_ENDPOINTS.PAYMENT.FAIL, {
        method: 'POST',
        body: JSON.stringify(failData)
      }, currentToken);
      
      return data;
    } catch (error) {
      console.error('Payment fail processing failed:', error);
      throw error;
    }
  },

  // 결제 정보 조회
  getById: async (paymentId) => {
    try {
      const token = getToken();
      if (!token) {
        console.log('토큰이 없어서 테스트 토큰을 자동 설정합니다.');
        setTestToken();
      }
      
      const currentToken = getToken();
      const data = await authenticatedApiCall(API_ENDPOINTS.PAYMENT.GET_BY_ID(paymentId), {
        method: 'GET'
      }, currentToken);
      
      return data;
    } catch (error) {
      console.error('Get payment by ID failed:', error);
      throw error;
    }
  },

  // 결제 상세 내역 조회
  getDetails: async (paymentId) => {
    try {
      const token = getToken();
      if (!token) {
        console.log('토큰이 없어서 테스트 토큰을 자동 설정합니다.');
        setTestToken();
      }
      
      const currentToken = getToken();
      const data = await authenticatedApiCall(API_ENDPOINTS.PAYMENT.DETAILS(paymentId), {
        method: 'GET'
      }, currentToken);
      
      return data;
    } catch (error) {
      console.error('Get payment details failed:', error);
      throw error;
    }
  },

  // 결제 로그 조회
  getLogs: async (paymentId) => {
    try {
      const token = getToken();
      if (!token) {
        console.log('토큰이 없어서 테스트 토큰을 자동 설정합니다.');
        setTestToken();
      }
      
      const currentToken = getToken();
      const data = await authenticatedApiCall(API_ENDPOINTS.PAYMENT.LOGS(paymentId), {
        method: 'GET'
      }, currentToken);
      
      return data;
    } catch (error) {
      console.error('Get payment logs failed:', error);
      throw error;
    }
  }
};

/**
 * 장비 API
 */
export const equipmentAPI = {
  // 장비 목록 조회
  getList: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams ? `${API_ENDPOINTS.EQUIPMENT.LIST}?${queryParams}` : API_ENDPOINTS.EQUIPMENT.LIST;
      
      const data = await apiCall(url, {
        method: 'GET'
      });
      
      return data;
    } catch (error) {
      console.error('Get equipment list failed:', error);
      throw error;
    }
  },

  // 장비 상세 정보 조회
  getDetail: async (equipmentId) => {
    try {
      const data = await apiCall(API_ENDPOINTS.EQUIPMENT.DETAIL(equipmentId), {
        method: 'GET'
      });
      
      return data;
    } catch (error) {
      console.error('Get equipment detail failed:', error);
      throw error;
    }
  },

  // 장비 대여
  rent: async (rentData) => {
    try {
      const token = getToken();
      const data = await authenticatedApiCall(API_ENDPOINTS.EQUIPMENT.RENT, {
        method: 'POST',
        body: JSON.stringify(rentData)
      }, token);
      
      return data;
    } catch (error) {
      console.error('Rent equipment failed:', error);
      throw error;
    }
  },

  // 장비 반납
  return: async (returnData) => {
    try {
      const token = getToken();
      const data = await authenticatedApiCall(API_ENDPOINTS.EQUIPMENT.RETURN, {
        method: 'POST',
        body: JSON.stringify(returnData)
      }, token);
      
      return data;
    } catch (error) {
      console.error('Return equipment failed:', error);
      throw error;
    }
  }
};

/**
 * 매장 API
 */
export const storeAPI = {
  // 매장 목록 조회
  getList: async () => {
    try {
      const data = await apiCall(API_ENDPOINTS.STORE.LIST, {
        method: 'GET'
      });
      
      return data;
    } catch (error) {
      console.error('Get store list failed:', error);
      throw error;
    }
  },

  // 매장 상세 정보 조회
  getDetail: async (storeId) => {
    try {
      const data = await apiCall(API_ENDPOINTS.STORE.DETAIL(storeId), {
        method: 'GET'
      });
      
      return data;
    } catch (error) {
      console.error('Get store detail failed:', error);
      throw error;
    }
  },

  // 매장 위치 정보 조회
  getLocations: async () => {
    try {
      const data = await apiCall(API_ENDPOINTS.STORE.LOCATIONS, {
        method: 'GET'
      });
      
      return data;
    } catch (error) {
      console.error('Get store locations failed:', error);
      throw error;
    }
  }
};

export default {
  authAPI,
  userAPI,
  paymentAPI,
  equipmentAPI,
  storeAPI,
  getToken,
  setToken,
  removeToken,
  setTestToken,
  checkTokenStatus
};
