import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/user/userEquipCheckOutLoc.css";

export default function UserEquipCheckOutLoc({
  onBack,
  onDone, // optional: called when the modal "좋아요!" is pressed
  googleApiKey, // optional: if provided, component will load Google Maps JS API
  center = { lat: 37.5776, lng: 128.3894 }, // default near 평창
  markerTitle = "휘닉스파크 Z스키",
  address = "강원 평창군 봉평면 태기로 151 조강해피밸리 1층",
}) {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // --- Google Maps lazy loader (only if apiKey is given) ---
  useEffect(() => {
    if (!googleApiKey || !mapRef.current) return;

    const ensureGoogle = () =>
      new Promise((resolve, reject) => {
        if (window.google && window.google.maps) return resolve(window.google);
        const id = "google-maps-sdk";
        if (document.getElementById(id)) {
          // script already requested; wait for it to load
          const check = () => (window.google && window.google.maps) ? resolve(window.google) : setTimeout(check, 50);
          return check();
        }
        const s = document.createElement("script");
        s.id = id;
        s.async = true;
        s.defer = true;
        s.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
        s.onload = () => resolve(window.google);
        s.onerror = reject;
        document.head.appendChild(s);
      });

    ensureGoogle()
      .then((g) => {
        const map = new g.maps.Map(mapRef.current, {
          center,
          zoom: 16,
          disableDefaultUI: true,
        });
        new g.maps.Marker({ position: center, title: markerTitle, map });
        setMapReady(true);
      })
      .catch(() => setMapReady(false));
  }, [googleApiKey, center.lat, center.lng, markerTitle]);

  return (
    <div className="user-equip-loc">
      {/* req2: in-app header only */}
      <header className="topbar">
        <button type="button" className="back-btn" aria-label="뒤로가기" onClick={onBack}>
          <svg width="12" height="21" viewBox="0 0 12 21" aria-hidden="true">
            <path d="M10.5 1.5L1.5 10.5L10.5 19.5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="page-title">장비 꺼내기</h1>
      </header>

      {/* req3: vertical flow, centered */}
      <main className="content">
        {/* Map area (ready for Google Maps) */}
        <section className="map-wrap">
          {/* If no API key yet, this stays as a static box you can replace later */}
          <div ref={mapRef} className="map-canvas" aria-label="지도" />
          {/* Address overlay */}
          <div className="address-overlay">
            <div className="addr-title">{markerTitle}</div>
            <div className="addr-sub">{address}</div>
          </div>
        </section>

        {/* Notice list */}
        <section className="notice">
          <h2 className="notice-title">신청 전 꼭 확인해주세요!</h2>
          <ul className="notice-list">
            <li>장비 출고는 보관 장소의 영업 시간 내에만 가능합니다.</li>
            <li>일정 조율이 필요한 경우, 운영팀이 개별 연락을 드릴 수 있습니다.</li>
            <li>보관 장소 출입 및 장비 수령은 본인 또는 사전 등록된 대리인만 가능합니다.</li>
          </ul>
        </section>
      </main>

      {/* Bottom CTA */}
      <div className="cta-wrap">
        <button type="button" className="primary-btn enabled" onClick={() => setShowModal(true)}>
          확인했어요!
        </button>
      </div>

      {/* Bottom-sheet modal (2nd page style) */}
      {showModal && (
        <div className="sheet-overlay" role="dialog" aria-modal="true">
          <div className="sheet">
            <div className="sheet-img" aria-hidden="true">
              <span>IMG영역<br/>128×128</span>
            </div>
            <div className="sheet-copy">
              <div className="sheet-title">장비 꺼내기 신청 완료!</div>
              <div className="sheet-desc">
                자세한 수거 정보를 다시 전달드리니<br/>메시지 확인 부탁드려요!
              </div>
            </div>
            <div className="sheet-cta">
              <button
                type="button"
                className="confirm-btn"
                onClick={() => {
                  setShowModal(false);
                  onDone && onDone();
                }}
              >
                좋아요!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
