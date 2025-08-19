import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/css/all.css";
import "../assets/css/user/usermain.css";
import "../assets/css/splash.css";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/onboarding"), 3000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="u-mobile-root s-screen" role="region" aria-label="Splash screen">
      <div className="u-mobile-page s-container">
        {/* STEP3-Img는 레퍼런스만: 실제 이미지 import 없음 */}
        <div className="s-logo-group" aria-hidden="true">
          <div className="s-logo-part s-part1" />
          <div className="s-logo-part s-part2" />
          <div className="s-logo-part s-part3" />
          <div className="s-logo-part s-part4" />
          <div className="s-logo-part s-part5" />
          <div className="s-logo-part s-part6" />
          <div className="s-logo-cut s-cut1" />
          <div className="s-logo-circle s-circle1" />
          <div className="s-logo-dot s-dot1" />
          <div className="s-logo-circle s-circle2" />
          <div className="s-logo-dot s-dot2" />
        </div>

        <div className="s-text-banner">보관에 관리를 더하다</div>
      </div>
    </div>
  );
}

export default Splash;
