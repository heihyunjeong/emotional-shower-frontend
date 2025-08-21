  // src/pages/Name.jsx
  import React, { useEffect, useRef, useState } from "react";
  import { useNavigate } from "react-router-dom";

  /* Global → Page CSS (keep your existing files) */
  import "../assets/css/all.css";
  import "../assets/css/user/usermain.css";
  import "../assets/css/name.css";

  /* Shared UI components */
  import TopAreaSubPage from "./components/TopAreaSubPage";
  import ProgressBar from "./components/ProgressBar";
  import PageTitle from "./components/PageTitle";
  import PrimaryButton from "./components/PrimaryButton";

  /* Icons */
  import backBut from "../assets/img/backBut.png";
  import xBut from "../assets/img/xBut.png";

  export default function Name() {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const pageRef = useRef(null);

    const isValid = name.trim().length > 0;

    const handleNext = () => {
      if (!isValid) return;
      navigate("/email");
    };

    // Mobile keyboard-safe bottom inset using visualViewport
    useEffect(() => {
      const vv = window.visualViewport;
      if (!vv || !pageRef.current) return;

      const updateKbOffset = () => {
        const hidden = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop));
        pageRef.current.style.setProperty("--kb-offset", `${Math.round(hidden)}px`);
      };

      vv.addEventListener("resize", updateKbOffset);
      vv.addEventListener("scroll", updateKbOffset);
      updateKbOffset();

      return () => {
        vv.removeEventListener("resize", updateKbOffset);
        vv.removeEventListener("scroll", updateKbOffset);
        pageRef.current?.style.removeProperty("--kb-offset");
      };
    }, []);

    const goBack = () => navigate(-1);
    const goHome = () => navigate("/home");

    return (
      <div className="app-container" ref={pageRef}>
        <div className="u-mobile-root">
          <div className="u-mobile-page" style={{ position: "relative" }}>
            {/* Top bar (Back / Close) */}
            <TopAreaSubPage
              onBack={goBack}
              onClose={goHome}
              backIcon={backBut}
              closeIcon={xBut}
            />

            {/* Progress (e.g., 3 steps -> 33%) */}
            <ProgressBar width="40%" />

            {/* Title */}
            <PageTitle>
              본인 확인을 위해
              <br />
              실명을 입력해주세요
            </PageTitle>

            {/* Content under PageTitle */}
            <div
              className="n-form"
              style={{
                position: "absolute",
                top: 220,
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                padding: "0 20px",
                boxSizing: "border-box",
              }}
              role="form"
              aria-label="Name Form"
            >
              <label className="n-label" htmlFor="name-input">이름</label>
              <div className="n-inputbox">
                <input
                  id="name-input"
                  type="text"
                  className="n-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="김보린"
                  autoComplete="name"
                  inputMode="text"
                />
              </div>
            </div>

            {/* Fixed bottom CTA (safe area + keyboard offset) */}
            <div
              className="fixed-cta"
              style={{
                paddingBottom:
                  "calc(16px + env(safe-area-inset-bottom) + var(--kb-offset, 0px))",
              }}
            >
              <PrimaryButton
                onClick={handleNext}
                disabled={!isValid}
                active={isValid}
              >
                다음
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
