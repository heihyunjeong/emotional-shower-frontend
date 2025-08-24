// src/pages/user/MyPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/user/userMy.css';
import UserNav from './userNav';

// 카카오 로그인 관련 import
import { kakaoAuth, clearUserSession, getUserSession } from '../../utils/kakaoAuth'; 

import packaged from "../../assets/img/packaged.png";
import profile from "../../assets/img/person.png";

export default function MyPage() {
  const navigate = useNavigate();
  
  // 현재 로그인한 사용자 정보 가져오기
  const session = getUserSession();
  const user = session?.user;

  // ✅ 네비게이션 클릭 시 이동 처리
  const handleNav = (key) => {
    if (key === 'mypage') return; // 현재 페이지면 이동 안 함
    if (key === 'home') navigate('/');
    if (key === 'myequipment') navigate('/equipment');
  };

  // ✅ 서비스 메뉴 클릭 처리
  const handleMenuClick = (menu) => {
    if (menu === 'account') navigate('/mypage/info');
    if (menu === 'pickup') navigate('/mypage/progress/inprogress'); // 수거일정 관리
    if (menu === 'payment') navigate('/mypage/payment/stored');
    if (menu === 'faq') navigate('/mypage/faq');
    if (menu === 'serviceinfo') navigate('/home'); // 임시로 홈으로 이동
  };

  // ✅ 로그아웃 처리
  const handleLogout = async () => {
    const confirmLogout = window.confirm('정말 로그아웃하시겠습니까?');
    
    if (!confirmLogout) return;

    try {
      // 현재 세션 정보 가져오기
      const session = getUserSession();
      
      if (session && session.tokens) {
        // 카카오 서버에 로그아웃 요청
        await kakaoAuth.logout(session.tokens.accessToken);
      }
    } catch (error) {
      console.error('카카오 로그아웃 오류:', error);
      // 서버 로그아웃 실패해도 로컬 세션은 정리
    } finally {
      // 로컬 세션 정리
      clearUserSession();
      
      // 로그아웃 완료 알림
      alert('로그아웃되었습니다.');
      
      // 로그인 페이지로 이동
      navigate('/easylogin');
    }
  };

  return (
    <div className="mypage-container">
      {/* Top Area */}
      <div className="top-area">
        <h1 className="top-area__title">마이페이지</h1>
      </div>

      {/* Main Frame */}
      <div className="frame-main">
        {/* Profile Header */}
        <section className="head">
          <div className="profile">
            <div className="profile-pic">
              <img 
                src={user?.thumbnailImage || user?.profileImage || profile} 
                alt="프로필" 
                onError={(e) => {
                  e.target.src = profile; // 이미지 로드 실패 시 기본 이미지로 대체
                }}
              />
            </div>
            <span className="profile-name">
              {user?.nickname ? `${user.nickname} 님` : '사용자 님'}
            </span>
          </div>
          <div className="badge">
            <span className="badge-text">기본플랜</span>
          </div>
        </section>

        {/* In-Progress Storage */}
        <section className="in-progress" >
          <div className="in-progress__info">
            <div className="in-progress__label">진행중인 보관</div>
            <div className="in-progress__count">신청완료 1건</div>
          </div>
          <img
            className="in-progress__icon"
            src={packaged}
            alt="진행중인 보관 아이콘"
          />
        </section>

        {/* View History Button */}
        <button className="view-history-btn" onClick={() => handleMenuClick('pickup')} >
          보관 내역 확인하기
        </button>

        {/* Service Menu List */}
        <div className="contents">
          <div className="contents-item" onClick={() => handleMenuClick('account')}>
            <span className="contents-item__title">계정관리</span>
            <div className="contents-item__icon"><div className="Vector" /></div>
          </div>

          {/* ✅ 수거일정 관리 추가 */}
          <div className="contents-item" onClick={() => handleMenuClick('pickup')}>
            <span className="contents-item__title">수거일정 관리</span>
            <div className="contents-item__icon"><div className="Vector" /></div>
          </div>

          <div className="contents-item" onClick={() => handleMenuClick('payment')}>
            <span className="contents-item__title">결제관리</span>
            <div className="contents-item__icon"><div className="Vector" /></div>
          </div>
          <div className="contents-item" onClick={() => handleMenuClick('faq')}>
            <span className="contents-item__title">고객센터</span>
            <div className="contents-item__icon"><div className="Vector" /></div>
          </div>
          <div className="contents-item" onClick={() => handleMenuClick('serviceinfo')}>
            <span className="contents-item__title">서비스 정보</span>
            <div className="contents-item__icon"><div className="Vector" /></div>
          </div>

          {/* ✅ 로그아웃 메뉴 추가 */}
          <div className="contents-item logout-item" onClick={handleLogout}>
            <span className="contents-item__title logout-title">로그아웃</span>
            <div className="contents-item__icon"><div className="Vector" /></div>
          </div>
        </div>
      </div>

      {/* ✅ 하단 네비게이션 */}
      <UserNav active="mypage" onNavigate={handleNav} />
    </div>
  );
}
