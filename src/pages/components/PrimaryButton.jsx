import React from "react";

export default function PrimaryButton({ 
  children, 
  onClick, 
  disabled = false, 
  active = false,
  className = "",
  type = "button",
  ...props 
}) {
  const buttonClass = `primary-button ${active ? "active" : ""} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}