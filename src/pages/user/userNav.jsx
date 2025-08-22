// src/pages/user/userNav.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/user/userNav.css";

import home from "../../assets/img/home.png";
import equip from "../../assets/img/equip.png";
import my from "../../assets/img/my.png";

const ROUTES = {
  home: "/home",
  myequipment: "/equipment",
  mypage: "/mypage",
};

function detectActive(pathname) {
  if (pathname.startsWith("/equipment")) return "myequipment";
  if (pathname.startsWith("/mypage")) return "mypage";
  if (pathname.startsWith("/home") || pathname === "/") return "home";
  return "home";
}

export default function UserNav({ active: activeProp }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const active = activeProp || detectActive(pathname);
  const go = (key) => () => navigate(ROUTES[key]);

  return (
    <nav className="user-nav" role="navigation" aria-label="Bottom Navigation">
      <button
        className={`nav-item ${active === "home" ? "active" : ""}`}
        onClick={go("home")}
        type="button"
        aria-current={active === "home" ? "page" : undefined}
      >
        <img src={home} alt="홈" className="nav-icon" />
        <span className="label">홈</span>
      </button>

      <button
        className={`nav-item ${active === "myequipment" ? "active" : ""}`}
        onClick={go("myequipment")}
        type="button"
        aria-current={active === "myequipment" ? "page" : undefined}
      >
        <img src={equip} alt="내 장비" className="nav-icon" />
        <span className="label">내 장비</span>
      </button>

      <button
        className={`nav-item ${active === "mypage" ? "active" : ""}`}
        onClick={go("mypage")}
        type="button"
        aria-current={active === "mypage" ? "page" : undefined}
      >
        <img src={my} alt="마이페이지" className="nav-icon" />
        <span className="label">마이페이지</span>
      </button>
    </nav>
  );
}
