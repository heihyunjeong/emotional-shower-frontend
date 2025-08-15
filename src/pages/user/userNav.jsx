import React from "react";
import "../../assets/css/user/userNav.css";

export default function UserNav({ active = "home", onNavigate }) {
  const go = (key) => () => (onNavigate ? onNavigate(key) : null);

  return (
    <nav className="user-nav" role="navigation" aria-label="Bottom Navigation">
      <button
        className={`nav-item ${active === "home" ? "active" : ""}`}
        onClick={go("home")}
        type="button"
      >
        <span className="icon home" />
        <span className="label">홈</span>
      </button>

      <button
        className={`nav-item ${active === "myequipment" ? "active" : ""}`}
        onClick={go("myequipment")}
        type="button"
      >
        <span className="icon equip" />
        <span className="label">내 장비</span>
      </button>

      <button
        className={`nav-item ${active === "mypage" ? "active" : ""}`}
        onClick={go("mypage")}
        type="button"
      >
        <span className="icon my" />
        <span className="label">마이페이지</span>
      </button>
    </nav>
  );
}
