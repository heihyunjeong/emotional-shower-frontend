// at the top of src/pages/user/userMyFAQ.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "../../assets/css/user/userMyFAQ.css";

// TODO: replace with your actual public Notion URL
const FAQ_URL = "https://your-notion-page.notion.site/your-public-page";

export default function UserMyFAQ() {
  const [openEmail, setOpenEmail] = useState(false); // 문의하기 bottom sheet
  const [openFAQ, setOpenFAQ] = useState(false);     // FAQ webviewer sheet
  const [embedBlocked, setEmbedBlocked] = useState(false);
  const loadTimer = useRef(null);

  // prevent body scroll when any sheet is open
  useEffect(() => {
    document.body.style.overflow = openEmail || openFAQ ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openEmail, openFAQ]);

  // detect iframe block (rough): if no onLoad within 1200ms, assume blocked
  useEffect(() => {
    if (!openFAQ) {
      setEmbedBlocked(false);
      if (loadTimer.current) clearTimeout(loadTimer.current);
      return;
    }
    loadTimer.current = setTimeout(() => setEmbedBlocked(true), 1200);
    return () => { if (loadTimer.current) clearTimeout(loadTimer.current); };
  }, [openFAQ]);

  return (
    <div className="faq-container" data-layer="마이페이지_설정-고객센터">
      {/* req2: removed iOS Status Bar & Home Indicator */}

      {/* top area */}
      <div className="subpage-top">
        <button
          className="back-btn"
          aria-label="뒤로가기"
          onClick={() => window.history.back()}
        />
        <div className="page-title">고객센터</div>
      </div>

      {/* list */}
      <div className="faq-list">
        <button
          className="item"
          type="button"
          onClick={() => setOpenFAQ(true)}
          aria-haspopup="dialog"
          aria-expanded={openFAQ}
          aria-controls="faq-sheet"
        >
          <span className="item-title">자주 묻는 질문</span>
          <span className="chev" aria-hidden />
        </button>

        <button
          className="item"
          type="button"
          onClick={() => setOpenEmail(true)}
          aria-haspopup="dialog"
          aria-expanded={openEmail}
          aria-controls="contact-sheet"
        >
          <span className="item-title">문의하기</span>
          <span className="chev" aria-hidden />
        </button>
      </div>

      {/* bottom sheet: FAQ webviewer */}
      {openFAQ && (
        <>
          <div
            className="sheet-backdrop"
            onClick={() => setOpenFAQ(false)}
            aria-hidden
          />
          <div
            id="faq-sheet"
            role="dialog"
            aria-modal="true"
            className="sheet"
          >
            <div className="sheet-handle" />
            <div className="sheet-header">
              <button
                className="sheet-cancel"
                type="button"
                onClick={() => setOpenFAQ(false)}
              >
                취소
              </button>
              <h2 className="sheet-title">자주 묻는 질문</h2>
            </div>

            <div className="sheet-body">
              <div className="web-actions">
                <a className="open-new" href={FAQ_URL} target="_blank" rel="noopener noreferrer">
                  새 탭에서 열기
                </a>
              </div>

              <iframe
                title="FAQ (Notion)"
                src={FAQ_URL}
                className="web-iframe"
                onLoad={() => {
                  setEmbedBlocked(false);
                  if (loadTimer.current) clearTimeout(loadTimer.current);
                }}
              />

              {embedBlocked && (
                <div className="embed-fallback">
                  <p>이 페이지는 보안 정책으로 앱 내에서 표시할 수 없습니다.</p>
                  <a className="open-new big" href={FAQ_URL} target="_blank" rel="noopener noreferrer">
                    새 탭에서 열기
                  </a>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* bottom sheet: 문의하기 (email compose UI) */}
      {openEmail && (
        <>
          <div
            className="sheet-backdrop"
            onClick={() => setOpenEmail(false)}
            aria-hidden
          />
          <div
            id="contact-sheet"
            role="dialog"
            aria-modal="true"
            className="sheet"
          >
            <div className="sheet-handle" />
            <div className="sheet-header">
              <button
                className="sheet-cancel"
                type="button"
                onClick={() => setOpenEmail(false)}
              >
                취소
              </button>
              <h2 className="sheet-title">
                <span className="bold-800">[보린이]</span>{" "}
                <span className="bold-700">문의하기</span>
              </h2>
            </div>

            <div className="sheet-body">
              <div className="line">
                <span className="label strong">받는 사람:&nbsp;</span>
                <a href="mailto:borini@gmail.com" className="blue">
                  borini@gmail.com
                </a>
              </div>
              <div className="divider" />
              <div className="line sub">
                참조/숨은참조, 보낸 사람: borini@gmail.com
              </div>
              <div className="divider" />
              <div className="line">
                <span className="label dim">제목:&nbsp;</span>
                <span className="value">[Borini] 문의하기</span>
              </div>
              <div className="divider" />
              <textarea
                className="textarea"
                placeholder="문의 내용을 작성해주세요."
                rows={6}
              />
              <button
                className="primary-btn"
                type="button"
                onClick={() => {
                  const subject = encodeURIComponent("[Borini] 문의하기");
                  const body = encodeURIComponent("");
                  window.location.href = `mailto:borini@gmail.com?subject=${subject}&body=${body}`;
                }}
              >
                이메일 앱으로 보내기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
