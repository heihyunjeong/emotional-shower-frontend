import React, { useState } from 'react';
// Placeholder CSS import (you can replace with actual CSS file later)
import '../assets/css/experimental.css';

export default function App() {
  return (
    <div className="container">
      <div className="logo-group">
        <div className="logo-part part1" />
        <div className="logo-part part2" />
        <div className="logo-part part3" />
        <div className="logo-part part4" />
        <div className="logo-part part5" />
        <div className="logo-part part6" />
        <div className="logo-cut cut1" />
        <div className="logo-circle circle1" />
        <div className="logo-dot dot1" />
        <div className="logo-circle circle2" />
        <div className="logo-dot dot2" />
      </div>

      <div className="text-banner">
        보관에 관리를 더하다
      </div>
    </div>
  );
}
