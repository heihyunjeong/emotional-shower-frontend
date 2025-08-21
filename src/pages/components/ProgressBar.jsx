import React from "react";

export default function ProgressBar({ width }) {
  // width: "60px" | "120px" | "66%" 등
  return (
    <div className="ux-progress" aria-hidden="true">
      <div className="bg" />
      <div className="fill" style={{ width }} />
    </div>
  );
}
