import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/css/all.css";
import "../assets/css/user/usermain.css";
import "../assets/css/splash.css";

import logo from "../assets/img/tittle_logo.png";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/onboarding"), 3000);
    return () => clearTimeout(t);
  }, [navigate]);

return (
    <div className="u-mobile-root s-screen" role="region" aria-label="Splash screen">
      <div className="u-mobile-page s-container">
        {/* Replaced logo group with image */}
        <img src={logo} alt="BORINI" className="s-logo" />

        <div className="s-text-banner">보관에 관리를 더하다</div>
      </div>
    </div>
  );
}
export default Splash;
