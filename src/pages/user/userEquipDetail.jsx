import React, { useRef, useState } from "react";
import "../../assets/css/user/userEquipDetail.css";

export default function UserEquipDetail() {
  // Replace with real images
  const images = [
    "https://placehold.co/707x320?text=IMG+1",
    "https://placehold.co/707x320?text=IMG+2",
    "https://placehold.co/707x320?text=IMG+3",
  ];

  const [idx, setIdx] = useState(0);
  const startX = useRef(null);

  const canPrev = idx > 0;
  const canNext = idx < images.length - 1;

  const prev = () => canPrev && setIdx((i) => i - 1);
  const next = () => canNext && setIdx((i) => i + 1);

  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 30) prev();
    if (dx < -30) next();
    startX.current = null;
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <div className="ued">
      {/* Top bar */}
      <header className="ued-top">
        <div className="time" aria-hidden>9:41</div>
        <h1 className="ued-title">장비 점검 레포트</h1>
        <button
          className="icon-btn close"
          aria-label="닫기"
          onClick={() => window.history.back()}
        />
      </header>

      <main className="ued-main">
        {/* Score card (green) */}
        <section className="card score-card">
          <img
            className="score-illust"
            src="https://placehold.co/140x140"
            alt=""
            aria-hidden
          />
          <div className="score-copy">
            <span className="label">안전지수</span>
            <strong className="point">84점</strong>
          </div>

          <div className="score-bar">
            <span className="side left">위험</span>
            <div className="bar">
              <i className="fill" style={{ width: "58%" }} />
            </div>
            <span className="side right">안전</span>
          </div>
        </section>

        {/* Damage area + slider */}
        <section className="card damage-card">
          <div className="row between">
            <h2>손상부위</h2>
            <time className="muted">25.07.27</time>
          </div>

          <div
            className="damage-canvas"
            tabIndex={0}
            role="region"
            aria-label="손상부위 이미지"
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={images[idx]}
              alt={`손상부위 이미지 ${idx + 1}/${images.length}`}
              loading="lazy"
            />

            {/* overlay chips */}
            <div className="chip-row top">
              <span className="chip damage-break"><i className="dot" />파손</span>
              <span className="chip damage-wear"><i className="dot" />마모</span>
              <span className="chip damage-corrosion"><i className="dot" />부식</span>
              <span className="chip damage-deform"><i className="dot" />변형</span>
            </div>

            <div className="chip-alone center">
              <span className="chip damage-break"><i className="dot" />파손</span>
            </div>

            <div className="chip-row bottom">
              <span className="chip damage-wear"><i className="dot" />마모</span>
              <span className="chip damage-corrosion"><i className="dot" />부식</span>
              <span className="chip damage-deform"><i className="dot" />변형</span>
            </div>

            <div className="front-label">FRONT</div>
          </div>

          {/* pager dots */}
          <div className="ued-dots" aria-hidden>
            {images.map((_, i) => (
              <span key={i} className={`dot ${i === idx ? "on" : ""}`} />
            ))}
          </div>
        </section>

        {/* Tip */}
        <section className="card tip-card">
          <div className="tip-head">
            <span className="tip-ico" aria-hidden />
            <strong>짧은 팁</strong>
          </div>

          <div className="tip-box">
            <p>
              장비 상태는 양호하지만, 엣지 쪽에 가벼운 마모가 보여요.
              눈 질감에 따라 미세한 영향을 줄 수 있으니, 시즌 시작 전
              가볍게 정비 받아보시면 좋아요!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
