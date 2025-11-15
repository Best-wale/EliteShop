import React from "react";

function SectionTitle({ title, className = "" }) {
  return (
    <h3 className={`text-lg font-semibold mb-4 ${className}`}>
      {title}
    </h3>
  );
}

export default SectionTitle;
