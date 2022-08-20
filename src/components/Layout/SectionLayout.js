import React from "react";

export default function SectionLayout({ title, children }) {
  return (
    <section className="home-section p-4">
      <div className="home-content d-flex align-items-center">
        <div className="d-flex align-items-center me-auto">
          <i className="bx bx-menu"></i>
          <span className="text">{title}</span>
        </div>
        <box-icon name="bell"></box-icon>
        <div className="vr mx-2" />
        <box-icon name="check-shield" type="solid"></box-icon>
      </div>

      {children}
    </section>
  );
}
