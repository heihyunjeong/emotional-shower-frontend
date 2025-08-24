import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserSession, clearUserSession, isLoggedIn } from '../utils/kakaoAuth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 세션 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const session = getUserSession();
      if (session) {
        setUser(session.user);
        setTokens(session.tokens);
      } else {
        setUser(null);
        setTokens(null);
      }
    } catch (error) {
      console.error('인증 상태 확인 오류:', error);
      setUser(null);
      setTokens(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userInfo, tokenInfo) => {
    setUser(userInfo);
    setTokens(tokenInfo);
  };

  const logout = () => {
    clearUserSession();
    setUser(null);
    setTokens(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    // 로컬 스토리지의 사용자 정보도 업데이트
    const session = getUserSession();
    if (session) {
      session.user = updatedUser;
      localStorage.setItem('kakao_session', JSON.stringify(session));
    }
  };

  const value = {
    user,
    tokens,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
