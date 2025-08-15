import React, { useMemo, useState } from "react";
import "../../assets/css/user/userEquipCheckOutInp.css";

export default function UserEquipCheckOutInp({
  onBack,
  onNext,
  itemName = "살로몽 댄스하울 144cm",
  today = new Date()
}) {
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [selected, setSelected] = useState(null); // Date object
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-11

  // Build calendar for viewMonth/viewYear
  const cal = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const startWeekday = first.getDay(); // 0 Sun - 6 Sat
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells = [];

    // leading blanks (previous month)
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));
    // trailing blanks to fill rows
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewMonth, viewYear]);

  const isPast = (d) => {
    if (!d) return false;
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return x < t;
  };

  const isSameDay = (a, b) =>
    a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const formatK = (d) => `${d.getMonth() + 1}월 ${d.getDate()}일`;

  const openPicker = () => {
    setViewYear((selected || today).getFullYear());
    setViewMonth((selected || today).getMonth());
    setPickerOpen(true);
  };

  const confirmPicker = () => setPickerOpen(false);

  const canNext = !!selected;

  return (
    <div className="user-equip-inp">
      {/* req2: in-app header only */}
      <header className="topbar">
        <button type="button" className="back-btn" aria-label="뒤로가기" onClick={onBack}>
          <svg width="12" height="21" viewBox="0 0 12 21" aria-hidden="true">
            <path d="M10.5 1.5L1.5 10.5L10.5 19.5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="page-title">장비 꺼내기</h1>
      </header>

      {/* req3: vertical flow, centered horizontally */}
      <main className="content">
        <section className="equip-card">
          <p className="equip-caption">
            <strong>기본 플랜</strong>
            <span>으로 꺼낼 장비</span>
          </p>
          <p className="equip-name">{itemName}</p>
        </section>

        <section className="field-group">
          <label className="field-label">장비를 꺼낼 날짜</label>

          <button
            type="button"
            className={`input-field ${selected ? "is-filled" : ""}`}
            onClick={openPicker}
          >
            <span className={`placeholder ${selected ? "has-value" : ""}`}>
              {selected ? formatK(selected) : "날짜를 선택해주세요"}
            </span>
            <span className="calendar-ic" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <rect x="4" y="6" width="16" height="12" rx="2" ry="2" fill="none" stroke="#404040" strokeWidth="2"/>
                <line x1="8" y1="3" x2="8" y2="7" stroke="#404040" strokeWidth="2"/>
                <line x1="16" y1="3" x2="16" y2="7" stroke="#404040" strokeWidth="2"/>
              </svg>
            </span>
          </button>
        </section>

        <section className="field-group">
          <label className="field-label">대리인 수령</label>

          <div className="input-field">
            <input type="text" placeholder="대리인 성함" />
          </div>

          <div className="input-field">
            <input type="tel" inputMode="tel" placeholder="대리인 연락처" />
          </div>

          <p className="helper">대리인 수령인 경우만 입력해주세요</p>
        </section>
      </main>

      <div className="cta-wrap">
        <button
          type="button"
          className={`primary-btn ${canNext ? "enabled" : ""}`}
          disabled={!canNext}
          onClick={() => canNext && onNext?.(selected)}
        >
          다음
        </button>
      </div>

      {/* Bottom-sheet date picker */}
      {isPickerOpen && (
        <div className="picker-overlay" role="dialog" aria-modal="true">
          <div className="picker-sheet">
            <div className="month-row">
              <button
                className="nav-ic"
                onClick={() => {
                  const m = new Date(viewYear, viewMonth - 1, 1);
                  setViewYear(m.getFullYear());
                  setViewMonth(m.getMonth());
                }}
                aria-label="이전 달"
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
              <div className="month-title">
                {viewYear}년 {viewMonth + 1}월
              </div>
              <button
                className="nav-ic"
                onClick={() => {
                  const m = new Date(viewYear, viewMonth + 1, 1);
                  setViewYear(m.getFullYear());
                  setViewMonth(m.getMonth());
                }}
                aria-label="다음 달"
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>

            <div className="weekdays">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>

            <div className="grid">
              {cal.map((d, i) => {
                if (!d) return <span key={i} className="cell blank" />;
                const disabled = isPast(d);
                const active = isSameDay(d, selected);
                return (
                  <button
                    key={i}
                    className={`cell date ${active ? "on" : ""} ${disabled ? "disabled" : ""}`}
                    onClick={() => !disabled && setSelected(d)}
                    disabled={disabled}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="picker-cta">
              <button
                className={`confirm-btn ${selected ? "enabled" : ""}`}
                disabled={!selected}
                onClick={confirmPicker}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
