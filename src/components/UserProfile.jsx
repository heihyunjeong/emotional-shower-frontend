import React from 'react';
import { getUserSession, clearUserSession, kakaoAuth } from '../utils/kakaoAuth';
import { useNavigate } from 'react-router-dom';

function UserProfile({ showLogout = true }) {
  const navigate = useNavigate();
  const session = getUserSession();

  if (!session) {
    return null;
  }

  const { user, tokens } = session;

  const handleLogout = async () => {
    try {
      // 카카오 서버에 로그아웃 요청
      await kakaoAuth.logout(tokens.accessToken);
    } catch (error) {
      console.error('카카오 로그아웃 오류:', error);
      // 서버 로그아웃 실패해도 로컬 세션은 정리
    } finally {
      // 로컬 세션 정리
      clearUserSession();
      // 로그인 페이지로 이동
      navigate('/easylogin');
    }
  };

  return (
    <div className="user-profile">
      <div className="user-info">
        {user.thumbnailImage && (
          <img 
            src={user.thumbnailImage} 
            alt="프로필 사진"
            className="profile-image"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        )}
        <div className="user-details">
          <span className="user-nickname">{user.nickname}</span>
          {user.email && (
            <span className="user-email" style={{ fontSize: '12px', color: '#666' }}>
              {user.email}
            </span>
          )}
        </div>
      </div>
      
      {showLogout && (
        <button 
          onClick={handleLogout}
          className="logout-button"
          style={{
            padding: '6px 12px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          로그아웃
        </button>
      )}

      <style jsx>{`
        .user-profile {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background-color: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .user-nickname {
          font-weight: 600;
          color: #333;
        }

        .logout-button:hover {
          background-color: #d32f2f;
        }
      `}</style>
    </div>
  );
}

export default UserProfile;
