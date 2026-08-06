import React from "react";
import logoImg from "../../assets/logo.png";

const LogoIcon = ({ size = 32, className = "", style = {} }) => {
  const dimension = typeof size === "number" ? `${size}px` : size;

  return (
    <img
      src={logoImg}
      alt="iG logo"                /* Fix: was generic "Logo" — be descriptive */
      className={`logo-icon ${className}`.trim()}
      draggable="false"            /* Fix: prevents accidental drag of the logo */
      aria-hidden={className.includes("watermark") ? "true" : undefined}
      style={{
        width: dimension,
        height: dimension,
        objectFit: "contain",
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        userSelect: "none",       /* Fix: prevent selection highlight on double-click */
        ...style,
      }}
    />
  );
};

// Fix: React.memo so parent re-renders don't cause logo re-renders
export default React.memo(LogoIcon);
